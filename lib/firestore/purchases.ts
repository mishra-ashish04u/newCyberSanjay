// lib/firestore/purchases.ts
import { db } from '@/lib/firebase'
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  runTransaction
} from 'firebase/firestore'

/**
 * Firestore Collections Structure:
 * 
 * 1. pending_purchases/{orderId}
 *    - Created immediately after payment success
 *    - Stores guest purchase data before account creation
 *    - Fields: orderId, customerEmail, customerName, customerPhone, 
 *              itemId, itemName, itemType, amount, paymentStatus,
 *              createdAt, accountLinked, linkedUserId, linkedAt
 * 
 * 2. purchases/{purchaseId}
 *    - Final purchase record linked to user account
 *    - Created after user logs in or signs up
 *    - Fields: purchaseId, userId, orderId, email, itemId, itemName, 
 *              itemType, amount, status, purchaseDate, metadata
 * 
 * 3. users/{userId}/purchases/{purchaseId}
 *    - Subcollection for easy querying of user purchases
 *    - Mirrors main purchases collection
 */

// Types
export interface PendingPurchase {
  orderId: string
  customerEmail: string
  customerName: string
  customerPhone: string
  itemId: string
  itemName: string
  itemType: 'course' | 'pdf' | 'combo'
  amount: number
  paymentStatus: 'pending' | 'success' | 'failed'
  cashfreeOrderId?: string
  cashfreePaymentId?: string
  createdAt: any
  accountLinked: boolean
  linkedUserId?: string
  linkedAt?: any
  metadata?: {
    thumbnail?: string
    description?: string
    downloadUrl?: string
    courseUrl?: string
  }
}

export interface Purchase {
  purchaseId: string
  userId: string
  orderId: string
  email: string
  itemId: string
  itemName: string
  itemType: 'course' | 'pdf' | 'combo'
  amount: number
  status: 'active' | 'cancelled' | 'refunded'
  purchaseDate: any
  metadata?: {
    thumbnail?: string
    description?: string
    downloadUrl?: string
    courseUrl?: string
  }
}

/**
 * R3: Create pending purchase (idempotent)
 * Called after Cashfree payment verification
 */
export async function createPendingPurchase(data: {
  orderId: string
  customerEmail: string
  customerName: string
  customerPhone: string
  itemId: string
  itemName: string
  itemType: 'course' | 'pdf' | 'combo'
  amount: number
  cashfreeOrderId?: string
  cashfreePaymentId?: string
  metadata?: any
}): Promise<{ success: boolean; error?: string }> {
  try {
    const pendingRef = doc(db, 'pending_purchases', data.orderId)
    
    // Check if already exists (idempotency)
    const existing = await getDoc(pendingRef)
    if (existing.exists()) {
      console.log('⚠️ Pending purchase already exists:', data.orderId)
      return { success: true }
    }

    // Create pending purchase
    await setDoc(pendingRef, {
      orderId: data.orderId,
      customerEmail: data.customerEmail.toLowerCase().trim(),
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      itemId: data.itemId,
      itemName: data.itemName,
      itemType: data.itemType,
      amount: data.amount,
      paymentStatus: 'success',
      cashfreeOrderId: data.cashfreeOrderId,
      cashfreePaymentId: data.cashfreePaymentId,
      createdAt: serverTimestamp(),
      accountLinked: false,
      metadata: data.metadata || {}
    } as PendingPurchase)

    console.log('✅ Pending purchase created:', data.orderId)
    return { success: true }

  } catch (error: any) {
    console.error('❌ Error creating pending purchase:', error)
    return { success: false, error: error.message }
  }
}

/**
 * R5: Link pending purchase to user account (auto-link)
 * Called after user logs in or signs up
 */
export async function linkPurchaseToUser(
  orderId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    return await runTransaction(db, async (transaction) => {
      const pendingRef = doc(db, 'pending_purchases', orderId)
      const pendingDoc = await transaction.get(pendingRef)

      if (!pendingDoc.exists()) {
        throw new Error('Pending purchase not found')
      }

      const pendingData = pendingDoc.data() as PendingPurchase

      // Check if already linked
      if (pendingData.accountLinked) {
        console.log('⚠️ Purchase already linked:', orderId)
        return { success: true }
      }

      // Create final purchase record
      const purchaseId = `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const purchaseRef = doc(db, 'purchases', purchaseId)

      const purchaseData: Purchase = {
        purchaseId,
        userId,
        orderId: pendingData.orderId,
        email: pendingData.customerEmail,
        itemId: pendingData.itemId,
        itemName: pendingData.itemName,
        itemType: pendingData.itemType,
        amount: pendingData.amount,
        status: 'active',
        purchaseDate: serverTimestamp(),
        metadata: pendingData.metadata
      }

      transaction.set(purchaseRef, purchaseData)

      // Also create in user's subcollection for easy queries
      const userPurchaseRef = doc(db, 'users', userId, 'purchases', purchaseId)
      transaction.set(userPurchaseRef, purchaseData)

      // Mark pending purchase as linked
      transaction.update(pendingRef, {
        accountLinked: true,
        linkedUserId: userId,
        linkedAt: serverTimestamp()
      })

      console.log('✅ Purchase linked to user:', userId, orderId)
      return { success: true }
    })

  } catch (error: any) {
    console.error('❌ Error linking purchase:', error)
    return { success: false, error: error.message }
  }
}

/**
 * R5: Auto-link all pending purchases for an email
 * Called when user logs in with existing email
 */
export async function linkAllPendingPurchases(
  email: string,
  userId: string
): Promise<{ success: boolean; linkedCount: number; error?: string }> {
  try {
    const pendingQuery = query(
      collection(db, 'pending_purchases'),
      where('customerEmail', '==', email.toLowerCase().trim()),
      where('accountLinked', '==', false)
    )

    const snapshot = await getDocs(pendingQuery)
    let linkedCount = 0

    for (const doc of snapshot.docs) {
      const result = await linkPurchaseToUser(doc.id, userId)
      if (result.success) linkedCount++
    }

    console.log(`✅ Linked ${linkedCount} pending purchases for ${email}`)
    return { success: true, linkedCount }

  } catch (error: any) {
    console.error('❌ Error linking pending purchases:', error)
    return { success: false, linkedCount: 0, error: error.message }
  }
}

/**
 * Get pending purchase by order ID
 */
export async function getPendingPurchase(
  orderId: string
): Promise<PendingPurchase | null> {
  try {
    const docRef = doc(db, 'pending_purchases', orderId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data() as PendingPurchase
    }
    return null
  } catch (error) {
    console.error('Error fetching pending purchase:', error)
    return null
  }
}

/**
 * R6: Get all purchases for a user
 */
export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  try {
    const q = query(
      collection(db, 'purchases'),
      where('userId', '==', userId)
    )

    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      purchaseId: doc.id
    })) as Purchase[]

  } catch (error) {
    console.error('Error fetching user purchases:', error)
    return []
  }
}

/**
 * Check if user has access to a specific item
 */
export async function hasUserPurchased(
  userId: string,
  itemId: string
): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'purchases'),
      where('userId', '==', userId),
      where('itemId', '==', itemId),
      where('status', '==', 'active')
    )

    const snapshot = await getDocs(q)
    return !snapshot.empty

  } catch (error) {
    console.error('Error checking purchase:', error)
    return false
  }
}