  // app/api/purchases/route.ts
  import { NextRequest, NextResponse } from 'next/server'
  import { initializeApp, getApps, cert } from 'firebase-admin/app'
  import { getAuth } from 'firebase-admin/auth'
  import { getFirestore } from 'firebase-admin/firestore'

  // Initialize Firebase Admin (for server-side auth verification)
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

  /**
   * Fetch user purchases from Firestore using Admin SDK
   */
  async function getUserPurchases(userId: string) {
    try {
      console.log('🔍 Fetching purchases for userId:', userId)
      
      const purchasesRef = db.collection('purchases')
      const querySnapshot = await purchasesRef.where('userId', '==', userId).get()
      
      console.log('📊 Documents found:', querySnapshot.size)
      
      if (querySnapshot.empty) {
        console.log('⚠️ No purchases found for this user')
        return []
      }
      
      const purchases = querySnapshot.docs.map(doc => {
        const data = doc.data()
        console.log('📄 Document data:', {
          id: doc.id,
          userId: data.userId,
          itemName: data.itemName,
          status: data.status
        })
        return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamp to ISO string if needed
          purchaseDate: data.purchaseDate?.toDate?.() || data.purchaseDate
        }
      })
      
      console.log('✅ Total purchases fetched:', purchases.length)
      return purchases
      
    } catch (error: any) {
      console.error('❌ Error in getUserPurchases:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      throw error
    }
  }

  /**
   * GET /api/purchases
   * Fetch all purchases for the logged-in user
   */
  export async function GET(request: NextRequest) {
    try {
      console.log('🚀 /api/purchases - GET request received')
      
      // Get authorization token from header
      const authHeader = request.headers.get('authorization')
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('❌ No authorization header found')
        return NextResponse.json(
          { success: false, error: 'Unauthorized - No token provided' },
          { status: 401 }
        )
      }

      const token = authHeader.split('Bearer ')[1]
      console.log('🔑 Token extracted, verifying...')

      // Verify token with Firebase Admin
      let decodedToken
      try {
        decodedToken = await getAuth().verifyIdToken(token)
        console.log('✅ Token verified for user:', decodedToken.uid)
      } catch (error: any) {
        console.error('❌ Token verification failed:', error.message)
        return NextResponse.json(
          { success: false, error: 'Invalid or expired token' },
          { status: 401 }
        )
      }

      const userId = decodedToken.uid
      console.log('👤 Fetching purchases for userId:', userId)
      
      // Fetch user's purchases from Firestore
      const purchases = await getUserPurchases(userId)
      
      console.log('📦 Raw purchases count:', purchases.length)

      // Expand combo purchases to show individual items
      const expandedPurchases: any[] = purchases.flatMap((purchase: any) => {
        if (purchase.itemType === 'combo') {
          console.log('🎁 Expanding combo purchase:', purchase.itemName)
          // Combo includes both PDFs
          return [
            {
              ...purchase,
              itemId: 'starter_kit_pdf_2024',
              itemName: 'Starter Kit - Ethical Hacking Roadmap',
              displayName: 'Starter Kit (from Bundle)',
              itemType: 'pdf',
              isFromCombo: true,
              originalPurchaseId: purchase.purchaseId,
              metadata: {
                downloadUrl: 'https://raw.githubusercontent.com/mishra-ashish04u/cybersanjay-courses/main/starter-kit/starter-kit.pdf',
                thumbnail: '/images/starter-kit-thumb.avif'
              }
            },
            {
              ...purchase,
              itemId: 'resume_pack_pdf_2024',
              itemName: 'Resume Pack - Professional Templates',
              displayName: 'Resume Pack (from Bundle)',
              itemType: 'pdf',
              isFromCombo: true,
              originalPurchaseId: purchase.purchaseId,
              metadata: {
                downloadUrl: 'https://raw.githubusercontent.com/mishra-ashish04u/cybersanjay-courses/main/resume-pack/resume-pack.pdf',
                thumbnail: '/images/resume-pack-thumb.avif'
              }
            }
          ]
        }
        // Return individual purchase with metadata
        return [{
          ...purchase,
          displayName: purchase.itemName,
          metadata: purchase.metadata || {}
        }]
      })

      console.log('✅ Returning expanded purchases:', expandedPurchases.length)

      return NextResponse.json({
        success: true,
        purchases: expandedPurchases,
        count: expandedPurchases.length
      })

    } catch (error: any) {
      console.error('❌ Error in GET /api/purchases:', error)
      console.error('Stack trace:', error.stack)
      return NextResponse.json(
        { success: false, error: error.message || 'Failed to fetch purchases' },
        { status: 500 }
      )
    }
  }