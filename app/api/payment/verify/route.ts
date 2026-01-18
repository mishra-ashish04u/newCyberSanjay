import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      )
    }

    console.log('🔵 Verifying payment for order:', orderId)

    // Determine API URL based on environment
    const apiUrl = process.env.CASHFREE_ENV === 'PRODUCTION'
      ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`

    // Call Cashfree API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01'
      }
    })

    const payments = await response.json()

    console.log('🔵 Verification response:', response.status, payments)

    if (!response.ok) {
      throw new Error('Failed to fetch payment details')
    }

    // Find successful payment
    const successfulPayment = Array.isArray(payments) 
      ? payments.find((payment: any) => payment.payment_status === 'SUCCESS')
      : null

    if (successfulPayment) {
      // TODO: Save to Firestore, send email, etc.
      console.log('✅ Payment successful:', successfulPayment)
      
      return NextResponse.json({
        success: true,
        status: 'SUCCESS',
        payment: successfulPayment
      })
    }

    return NextResponse.json({
      success: false,
      status: 'PENDING',
      message: 'Payment not completed yet'
    })

  } catch (error: any) {
    console.error('❌ Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}