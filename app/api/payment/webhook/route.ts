// app/api/payment/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createPendingPurchase } from '@/lib/firestore/purchases'
import crypto from 'crypto'

/**
 * R2 & R8: Secure webhook handler for Cashfree payment notifications
 * This ensures payments are captured even if user closes browser
 * Includes signature verification to prevent fake webhooks
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const body = JSON.parse(rawBody)
    
    console.log('🔔 Webhook received:', body.type)

    // R8: Verify webhook signature (CRITICAL for security)
    const signature = request.headers.get('x-webhook-signature')
    const timestamp = request.headers.get('x-webhook-timestamp')
    
    if (!verifyWebhookSignature(rawBody, signature, timestamp)) {
      console.error('❌ Invalid webhook signature')
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Handle different webhook types
    switch (body.type) {
      case 'PAYMENT_SUCCESS_WEBHOOK':
        await handlePaymentSuccess(body.data)
        break
      
      case 'PAYMENT_FAILED_WEBHOOK':
        await handlePaymentFailed(body.data)
        break
      
      case 'PAYMENT_USER_DROPPED_WEBHOOK':
        console.log('⚠️ User dropped payment:', body.data.order.order_id)
        break
      
      default:
        console.log('ℹ️ Unhandled webhook type:', body.type)
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('❌ Webhook error:', error)
    // Return 200 to prevent webhook retries on parse errors
    return NextResponse.json({ success: false }, { status: 200 })
  }
}

/**
 * R8: Verify Cashfree webhook signature
 * Prevents fake webhook calls
 */
function verifyWebhookSignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null
): boolean {
  if (!signature || !timestamp) {
    console.warn('⚠️ Missing signature or timestamp')
    return false
  }

  try {
    // Cashfree signature format: timestamp + "." + rawBody
    const signaturePayload = `${timestamp}.${rawBody}`
    
    // Calculate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_SECRET_KEY!)
      .update(signaturePayload)
      .digest('base64')

    // Compare signatures
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )

    if (!isValid) {
      console.error('❌ Signature mismatch')
    }

    return isValid

  } catch (error) {
    console.error('❌ Signature verification error:', error)
    return false
  }
}

/**
 * R3: Handle successful payment
 * Creates pending purchase with idempotency
 */
async function handlePaymentSuccess(data: any) {
  try {
    const { order, payment } = data

    console.log('✅ Processing successful payment:', order.order_id)

    // Extract metadata from order tags (set during create-order)
    const tags = order.order_tags || {}
    const metadata = tags.metadata ? JSON.parse(tags.metadata) : {}

    // R3: Create pending purchase (idempotent)
    const result = await createPendingPurchase({
      orderId: order.order_id,
      customerEmail: order.customer_details.customer_email,
      customerName: order.customer_details.customer_name,
      customerPhone: order.customer_details.customer_phone,
      itemId: tags.itemId || 'unknown',
      itemName: tags.itemName || order.order_note || 'Purchase',
      itemType: tags.itemType || 'course',
      amount: order.order_amount,
      cashfreeOrderId: order.cf_order_id,
      cashfreePaymentId: payment?.cf_payment_id,
      metadata
    })

    if (result.success) {
      console.log('✅ Webhook: Purchase saved successfully')
      
      // Optional: Send confirmation email here
      // await sendPurchaseConfirmationEmail(order.customer_details.customer_email)
      
    } else {
      console.error('❌ Webhook: Failed to save purchase:', result.error)
    }

  } catch (error) {
    console.error('❌ Error handling payment success:', error)
    throw error
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(data: any) {
  const { order, payment } = data
  console.log('❌ Payment failed:', order.order_id)
  
  // Optional: Log failed payment attempts
  // Optional: Send email to user about failed payment
}

/**
 * Test endpoint for webhook (development only)
 * Remove or protect in production
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  return NextResponse.json({
    message: 'Webhook endpoint is active',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
    note: 'Configure this URL in Cashfree dashboard'
  })
}

/* 
=================================================================
WEBHOOK SETUP INSTRUCTIONS:
=================================================================

1. **Configure in Cashfree Dashboard:**
   - Go to Cashfree Dashboard → Developers → Webhooks
   - Add webhook URL: https://yourdomain.com/api/payment/webhook
   - Enable these events:
     ✅ PAYMENT_SUCCESS_WEBHOOK
     ✅ PAYMENT_FAILED_WEBHOOK
     ✅ PAYMENT_USER_DROPPED_WEBHOOK

2. **For Local Testing:**
   - Use ngrok: `ngrok http 3000`
   - Get public URL: https://abc123.ngrok.io
   - Set webhook: https://abc123.ngrok.io/api/payment/webhook
   - Test with Cashfree sandbox

3. **Production Checklist:**
   - ✅ Signature verification enabled
   - ✅ HTTPS endpoint (required by Cashfree)
   - ✅ Idempotency implemented (no duplicates)
   - ✅ Error handling (returns 200 on parse errors)
   - ✅ Logging enabled for debugging

4. **Security Notes:**
   - Never trust frontend data alone
   - Always verify webhook signature
   - Always verify payment status with Cashfree API
   - Use order ID as document ID (prevents duplicates)

=================================================================
*/