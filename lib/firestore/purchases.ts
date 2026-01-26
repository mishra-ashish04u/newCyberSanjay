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
  runTransaction,
  deleteDoc  // ✅ ADDED
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
 * Moves data from pending_purchases to purchases and DELETES pending record
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

      // Add to main purchases collection
      transaction.set(purchaseRef, purchaseData)

      // Add to user's subcollection
      const userPurchaseRef = doc(db, 'users', userId, 'purchases', purchaseId)
      transaction.set(userPurchaseRef, purchaseData)

      // ✅ DELETE the pending purchase (instead of marking as linked)
      transaction.delete(pendingRef)

      console.log('✅ Purchase moved to purchases and deleted from pending:', orderId)
      return { success: true }
    })

  } catch (error: any) {
    console.error('❌ Error linking purchase:', error)
    return { success: false, error: error.message }
  }
}

/**
 * R5: Auto-link all pending purchases for an email (including bundle items)
 * Moves all pending purchases to purchases collection and DELETES them
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

    for (const docSnap of snapshot.docs) {
      const pendingData = docSnap.data() as PendingPurchase
      
      // Create purchase record
      const purchaseId = `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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

      // Add to purchases collection
      await setDoc(doc(db, 'purchases', purchaseId), purchaseData)

      // Add to user's subcollection
      await setDoc(doc(db, 'users', userId, 'purchases', purchaseId), purchaseData)

      // ✅ DELETE the pending purchase
      await deleteDoc(doc(db, 'pending_purchases', docSnap.id))

      linkedCount++
      console.log(`✅ Moved purchase ${docSnap.id} and deleted from pending`)
    }

    console.log(`✅ Linked and deleted ${linkedCount} pending purchases for ${email}`)
    return { success: true, linkedCount }

  } catch (error: any) {
    console.error('❌ Error linking pending purchases:', error)
    return { success: false, linkedCount: 0, error: error.message }
  }
}

/**
 * Get pending purchase by order ID (handles bundle suffixes)
 */
export async function getPendingPurchase(
  orderId: string
): Promise<PendingPurchase | null> {
  try {
    console.log('🔍 Fetching pending purchase for orderId:', orderId)
    
    // First try direct orderId
    let docRef = doc(db, 'pending_purchases', orderId)
    let docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      console.log('✅ Found pending purchase (direct):', orderId)
      return docSnap.data() as PendingPurchase
    }

    // If not found, try with _starter suffix (for bundle)
    console.log('⚠️ Direct orderId not found, trying with _starter suffix')
    docRef = doc(db, 'pending_purchases', `${orderId}_starter`)
    docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      console.log('✅ Found bundle pending purchase with _starter suffix')
      return docSnap.data() as PendingPurchase
    }

    console.log('❌ No pending purchase found for:', orderId)
    return null
  } catch (error) {
    console.error('❌ Error fetching pending purchase:', error)
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