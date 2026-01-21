import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    console.log('✅ Webhook received:', body)
    
    if (body.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const orderId = body.data?.order?.order_id
      const orderAmount = body.data?.order?.order_amount
      const customerEmail = body.data?.order?.customer_details?.customer_email
      const customerName = body.data?.order?.customer_details?.customer_name
      const customerPhone = body.data?.order?.customer_details?.customer_phone
      
      // Extract courseId from order_note
      const orderNote = body.data?.order?.order_note || ''
      let courseId = 'starter-kit' // default
      
      if (orderNote.includes('Resume Pack')) {
        courseId = 'resume-pack'
      } else if (orderNote.includes('Complete Bundle')) {
        courseId = 'complete-bundle'
      }
      
      // Save to pending_purchases
      await setDoc(doc(db, 'pending_purchases', orderId), {
        orderId,
        customerEmail,
        customerName,
        customerPhone,
        courseId,
        amount: orderAmount,
        status: 'paid',
        accountLinked: false,
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
      
      console.log(`✅ Saved pending purchase: ${orderId}`)
    }
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ success: false }, { status: 200 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint active' })
}