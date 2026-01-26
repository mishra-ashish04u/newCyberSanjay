// lib/firestore/purchases-admin.ts
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

// Initialize Firebase Admin (singleton)
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const db = getFirestore()

// Types (same as client version)
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
 * Get all purchases for a user (Admin SDK - Server Side)
 */
export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  try {
    console.log('🔍 [Admin] Fetching purchases for userId:', userId)
    
    const purchasesRef = db.collection('purchases')
    const snapshot = await purchasesRef.where('userId', '==', userId).get()
    
    console.log('📊 [Admin] Documents found:', snapshot.size)
    
    if (snapshot.empty) {
      console.log('⚠️ [Admin] No purchases found')
      return []
    }

    const purchases = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        purchaseId: doc.id,
        ...data,
        // Convert Firestore Timestamp to Date if needed
        purchaseDate: data.purchaseDate?.toDate?.() || data.purchaseDate
      }
    }) as Purchase[]
    
    console.log('✅ [Admin] Purchases fetched:', purchases.length)
    return purchases

  } catch (error: any) {
    console.error('❌ [Admin] Error fetching purchases:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    throw error
  }
}

/**
 * Check if user has access to a specific item (Admin SDK - Server Side)
 */
export async function hasUserPurchased(
  userId: string,
  itemId: string
): Promise<boolean> {
  try {
    console.log('================================')
    console.log('🔍 [Admin] Checking purchase')
    console.log('  👤 userId:', userId)
    console.log('  📦 itemId:', itemId)
    console.log('================================')
    
    const purchasesRef = db.collection('purchases')
    
    // First, let's see ALL purchases for this user
    console.log('📊 Fetching ALL user purchases...')
    const allUserPurchases = await purchasesRef
      .where('userId', '==', userId)
      .get()
    
    console.log('📊 Total purchases found:', allUserPurchases.size)
    
    // Print each purchase
    allUserPurchases.forEach(doc => {
      const data = doc.data()
      console.log('  📄 Document:', {
        id: doc.id,
        userId: data.userId,
        itemId: data.itemId,
        status: data.status
      })
    })
    
    // Now check for matching purchase
    console.log('🔍 Checking for direct purchase match...')
    const directQuery = await purchasesRef
      .where('userId', '==', userId)
      .where('itemId', '==', itemId)
      .where('status', '==', 'active')
      .limit(1)
      .get()
    
    console.log('📊 Direct query results:', directQuery.size)
    
    if (!directQuery.empty) {
      console.log('✅ MATCH FOUND! User has purchased this item')
      return true
    }
    
    console.log('❌ NO MATCH - User has not purchased this item')
    return false

  } catch (error: any) {
    console.error('❌ [Admin] Error checking purchase:', error)
    return false
  }
}

/**
 * Get purchase by ID (Admin SDK - Server Side)
 */
export async function getPurchaseById(purchaseId: string): Promise<Purchase | null> {
  try {
    const docRef = db.collection('purchases').doc(purchaseId)
    const docSnap = await docRef.get()
    
    if (!docSnap.exists) {
      return null
    }
    
    const data = docSnap.data()
    return {
      purchaseId: docSnap.id,
      ...data,
      purchaseDate: data?.purchaseDate?.toDate?.() || data?.purchaseDate
    } as Purchase
    
  } catch (error) {
    console.error('❌ [Admin] Error fetching purchase:', error)
    return null
  }
}