// app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createPendingPurchase } from '@/lib/firestore/purchases'

/**
 * R2 & R3: Verify payment on server and save to Firestore
 * This endpoint is called after user returns from Cashfree
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, itemId, itemName, itemType, amount, customerEmail, customerName, customerPhone, metadata } = body

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      )
    }

    console.log('🔵 Verifying payment for order:', orderId)

    // R2: Verify with Cashfree (server-side)
    const apiUrl = process.env.CASHFREE_ENV === 'PROD'
      ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch payment details from Cashfree')
    }

    const payments = await response.json()
    console.log('🔵 Cashfree verification response:', payments)

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

    // R3: Save to Firestore (idempotent)
    const result = await createPendingPurchase({
      orderId,
      customerEmail,
      customerName,
      customerPhone,
      itemId,
      itemName,
      itemType,
      amount,
      cashfreeOrderId: successfulPayment.cf_order_id,
      cashfreePaymentId: successfulPayment.cf_payment_id,
      metadata
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to save purchase')
    }

    console.log('✅ Payment verified and saved:', orderId)

    return NextResponse.json({
      success: true,
      status: 'SUCCESS',
      payment: successfulPayment,
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

/**
 * R8: Webhook handler for Cashfree payment notifications
 * This provides additional security and handles async payment updates
 */
export async function WEBHOOK_POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('🔔 Webhook received:', body)

    // Verify webhook signature (Cashfree provides this)
    const signature = request.headers.get('x-webhook-signature')
    const timestamp = request.headers.get('x-webhook-timestamp')
    
    // TODO: Implement signature verification
    // This prevents fake webhook calls (R8)
    
    if (body.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const { order } = body.data
      
      // R3: Save to Firestore with idempotency
      const result = await createPendingPurchase({
        orderId: order.order_id,
        customerEmail: order.customer_details.customer_email,
        customerName: order.customer_details.customer_name,
        customerPhone: order.customer_details.customer_phone,
        itemId: order.order_tags?.itemId || 'unknown',
        itemName: order.order_note || 'Purchase',
        itemType: order.order_tags?.itemType || 'course',
        amount: order.order_amount,
        cashfreeOrderId: order.cf_order_id,
        metadata: order.order_tags?.metadata || {}
      })

      if (result.success) {
        console.log('✅ Webhook: Purchase saved')
      }
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}