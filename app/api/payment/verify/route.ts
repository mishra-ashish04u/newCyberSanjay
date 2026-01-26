import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

// Initialize Firebase Admin
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
 * R2 & R3: Verify payment on server and save to Firestore
 * This endpoint is called after user returns from Cashfree
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      )
    }

    console.log('🔵 Verifying payment for order:', orderId)

    // ✅ Get userId from authorization header if user is logged in
    const authHeader = request.headers.get('authorization')
    let userId: string | null = null

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1]
      try {
        const decodedToken = await getAuth().verifyIdToken(token)
        userId = decodedToken.uid
        console.log('✅ User authenticated during payment:', userId)
      } catch (error) {
        console.warn('⚠️ Could not verify token (user may not be logged in)')
      }
    } else {
      console.log('ℹ️ No authorization header - user not logged in')
    }

    // R2: First, get order details from Cashfree
    const orderApiUrl = process.env.CASHFREE_ENV === 'PROD'
      ? `https://api.cashfree.com/pg/orders/${orderId}`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`

    const orderResponse = await fetch(orderApiUrl, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01'
      }
    })

    if (!orderResponse.ok) {
      console.error('❌ Failed to fetch order details:', orderResponse.status)
      throw new Error('Failed to fetch order details from Cashfree')
    }

    const orderData = await orderResponse.json()
    console.log('🔵 Order details:', orderData)

    // Check if order is paid
    if (orderData.order_status !== 'PAID') {
      return NextResponse.json({
        success: false,
        status: orderData.order_status,
        message: `Payment status: ${orderData.order_status}`
      })
    }

    // Get payment details
    const paymentsApiUrl = process.env.CASHFREE_ENV === 'PROD'
      ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`

    const paymentsResponse = await fetch(paymentsApiUrl, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01'
      }
    })

    if (!paymentsResponse.ok) {
      console.error('❌ Failed to fetch payment details:', paymentsResponse.status)
      throw new Error('Failed to fetch payment details from Cashfree')
    }

    const payments = await paymentsResponse.json()
    console.log('🔵 Payment details:', payments)

    // Find successful payment
    const successfulPayment = Array.isArray(payments) 
      ? payments.find((payment: any) => payment.payment_status === 'SUCCESS')
      : null

    if (!successfulPayment) {
      return NextResponse.json({
        success: false,
        status: 'PENDING',
        message: 'Payment not completed yet'
      })
    }

    // ✅ Parse order_tags
    let orderTags: any = {}
    try {
      orderTags = orderData.order_tags || {}
      
      console.log('📦 Order tags received:', orderTags)
      console.log('📦 Order tags type:', typeof orderTags)
      
      if (!orderTags.itemId) {
        console.error('❌ CRITICAL: Missing itemId in order_tags!')
        console.error('Full order_tags:', JSON.stringify(orderTags, null, 2))
        
        return NextResponse.json({
          success: false,
          error: 'Invalid order - missing product information'
        }, { status: 400 })
      }
      
      console.log('✅ itemId validated:', orderTags.itemId)
      
    } catch (e: any) {
      console.error('❌ Error processing order_tags:', e)
      return NextResponse.json({
        success: false,
        error: 'Failed to process order information'
      }, { status: 400 })
    }

    // ✅ R3: Save to pending_purchases using Admin SDK (idempotent)
    
    // ✅ Handle bundle purchases - create TWO separate pending purchases
    if (orderTags.itemType === 'combo') {
      console.log('🎁 Bundle purchase detected - creating two separate pending purchases')
      
      // Check if already created
      const starterRef = db.collection('pending_purchases').doc(`${orderData.order_id}_starter`)
      const resumeRef = db.collection('pending_purchases').doc(`${orderData.order_id}_resume`)
      
      const starterExists = await starterRef.get()
      const resumeExists = await resumeRef.get()
      
      if (!starterExists.exists) {
        // Create pending purchase for Starter Kit
        await starterRef.set({
          orderId: `${orderData.order_id}_starter`,
          parentOrderId: orderData.order_id,
          customerEmail: orderData.customer_details.customer_email.toLowerCase().trim(),
          customerName: orderData.customer_details.customer_name,
          customerPhone: orderData.customer_details.customer_phone,
          itemId: 'starter_kit_pdf_2024',
          itemName: 'Starter Kit - Ethical Hacking Roadmap',
          itemType: 'pdf',
          amount: orderData.order_amount,
          paymentStatus: 'success',
          cashfreeOrderId: orderData.cf_order_id,
          cashfreePaymentId: successfulPayment.cf_payment_id,
          createdAt: FieldValue.serverTimestamp(),
          accountLinked: false,
          isFromBundle: true,
          metadata: {
            downloadUrl: 'https://raw.githubusercontent.com/mishra-ashish04u/cybersanjay-courses/main/starter-kit/starter-kit.pdf',
            githubPath: 'starter-kit/starter-kit.pdf',
            thumbnail: '/images/starter-kit-thumb.jpg'
          }
        })
        console.log('✅ Created starter kit pending purchase')
      }

      if (!resumeExists.exists) {
        // Create pending purchase for Resume Pack
        await resumeRef.set({
          orderId: `${orderData.order_id}_resume`,
          parentOrderId: orderData.order_id,
          customerEmail: orderData.customer_details.customer_email.toLowerCase().trim(),
          customerName: orderData.customer_details.customer_name,
          customerPhone: orderData.customer_details.customer_phone,
          itemId: 'resume_pack_pdf_2024',
          itemName: 'Resume Pack - Professional Templates',
          itemType: 'pdf',
          amount: orderData.order_amount,
          paymentStatus: 'success',
          cashfreeOrderId: orderData.cf_order_id,
          cashfreePaymentId: successfulPayment.cf_payment_id,
          createdAt: FieldValue.serverTimestamp(),
          accountLinked: false,
          isFromBundle: true,
          metadata: {
            downloadUrl: 'https://raw.githubusercontent.com/mishra-ashish04u/cybersanjay-courses/main/resume-pack/resume-pack.pdf',
            githubPath: 'resume-pack/resume-pack.pdf',
            thumbnail: '/images/resume-pack-thumb.jpg'
          }
        })
        console.log('✅ Created resume pack pending purchase')
      }

      console.log('✅ Two pending purchases created/verified for bundle')
      
    } else {
      // Regular single item purchase
      const pendingRef = db.collection('pending_purchases').doc(orderData.order_id)
      const existingDoc = await pendingRef.get()
      
      if (!existingDoc.exists) {
        await pendingRef.set({
          orderId: orderData.order_id,
          customerEmail: orderData.customer_details.customer_email.toLowerCase().trim(),
          customerName: orderData.customer_details.customer_name,
          customerPhone: orderData.customer_details.customer_phone,
          itemId: orderTags.itemId,
          itemName: orderTags.itemName || orderData.order_note || 'Purchase',
          itemType: orderTags.itemType || 'course',
          amount: orderData.order_amount,
          paymentStatus: 'success',
          cashfreeOrderId: orderData.cf_order_id,
          cashfreePaymentId: successfulPayment.cf_payment_id,
          createdAt: FieldValue.serverTimestamp(),
          accountLinked: false,
          metadata: {
            downloadUrl: orderTags.downloadUrl,
            githubPath: orderTags.githubPath,
            thumbnail: orderTags.thumbnail
          }
        })
        console.log('✅ Pending purchase created:', orderData.order_id)
      } else {
        console.log('⚠️ Pending purchase already exists:', orderData.order_id)
      }
    }

    // ✅ If user is logged in, immediately link the purchase(s)
    if (userId) {
      console.log('🔗 Linking purchase to logged-in user:', userId)
      
      try {
        if (orderTags.itemType === 'combo') {
          // Link both bundle items
          const starterRef = db.collection('pending_purchases').doc(`${orderData.order_id}_starter`)
          const resumeRef = db.collection('pending_purchases').doc(`${orderData.order_id}_resume`)
          
          const starterData = (await starterRef.get()).data()
          const resumeData = (await resumeRef.get()).data()
          
          // Link starter kit
          if (starterData && !starterData.accountLinked) {
            const purchaseId1 = `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            const purchaseData1 = {
              purchaseId: purchaseId1,
              userId,
              orderId: starterData.orderId,
              parentOrderId: orderData.order_id,
              email: starterData.customerEmail,
              itemId: starterData.itemId,
              itemName: starterData.itemName,
              itemType: starterData.itemType,
              amount: starterData.amount,
              status: 'active',
              purchaseDate: FieldValue.serverTimestamp(),
              isFromBundle: true,
              metadata: starterData.metadata
            }
            await db.collection('purchases').doc(purchaseId1).set(purchaseData1)
            await db.collection('users').doc(userId).collection('purchases').doc(purchaseId1).set(purchaseData1)
            await starterRef.update({ accountLinked: true, linkedUserId: userId, linkedAt: FieldValue.serverTimestamp() })
          }
          
          // Link resume pack
          if (resumeData && !resumeData.accountLinked) {
            const purchaseId2 = `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            const purchaseData2 = {
              purchaseId: purchaseId2,
              userId,
              orderId: resumeData.orderId,
              parentOrderId: orderData.order_id,
              email: resumeData.customerEmail,
              itemId: resumeData.itemId,
              itemName: resumeData.itemName,
              itemType: resumeData.itemType,
              amount: resumeData.amount,
              status: 'active',
              purchaseDate: FieldValue.serverTimestamp(),
              isFromBundle: true,
              metadata: resumeData.metadata
            }
            await db.collection('purchases').doc(purchaseId2).set(purchaseData2)
            await db.collection('users').doc(userId).collection('purchases').doc(purchaseId2).set(purchaseData2)
            await resumeRef.update({ accountLinked: true, linkedUserId: userId, linkedAt: FieldValue.serverTimestamp() })
          }
          
          console.log('✅ Both bundle purchases linked successfully!')
        } else {
          // Link single purchase
          const pendingRef = db.collection('pending_purchases').doc(orderData.order_id)
          const pendingData = (await pendingRef.get()).data()
          
          if (pendingData?.accountLinked) {
            console.log('⚠️ Purchase already linked')
          } else {
            const purchaseId = `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            const purchaseData = {
              purchaseId,
              userId,
              orderId: orderData.order_id,
              email: orderData.customer_details.customer_email,
              itemId: orderTags.itemId,
              itemName: orderTags.itemName || orderData.order_note || 'Purchase',
              itemType: orderTags.itemType || 'course',
              amount: orderData.order_amount,
              status: 'active',
              purchaseDate: FieldValue.serverTimestamp(),
              metadata: {
                downloadUrl: orderTags.downloadUrl,
                githubPath: orderTags.githubPath,
                thumbnail: orderTags.thumbnail
              }
            }

            await db.collection('purchases').doc(purchaseId).set(purchaseData)
            await db.collection('users').doc(userId).collection('purchases').doc(purchaseId).set(purchaseData)
            await pendingRef.update({
              accountLinked: true,
              linkedUserId: userId,
              linkedAt: FieldValue.serverTimestamp()
            })

            console.log('✅ Purchase linked successfully:', purchaseId)
          }
        }
      } catch (linkError: any) {
        console.error('❌ Error linking purchase:', linkError)
        // Don't fail the verification if linking fails
      }
    } else {
      console.log('ℹ️ User not logged in - purchase will be linked when they log in')
    }

    console.log('✅ Payment verified and saved:', orderId)

    return NextResponse.json({
      success: true,
      status: 'SUCCESS',
      payment: successfulPayment,
      order: orderData,
      orderId
    })

  } catch (error: any) {
    console.error('❌ Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}