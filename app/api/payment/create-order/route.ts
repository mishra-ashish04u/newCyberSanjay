import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productName, amount, customerEmail, customerName, customerPhone } = body

    // Validate
    if (!productName || !amount || !customerEmail || !customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // ✅ FIX: Change PRODUCTION to PROD
    const apiUrl = process.env.CASHFREE_ENV === 'PROD'
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders'

    // Create order request
    const orderRequest = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: customerEmail.replace('@', '_').replace(/\./g, '_'),
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone || '9999999999'
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_URL}?order_id=${orderId}`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`
      },
      order_note: `Purchase: ${productName}`
    }

    console.log('🔵 Creating Cashfree order:', orderRequest)

    // Call Cashfree API directly
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(orderRequest)
    })

    const responseData = await response.json()

    console.log('🔵 Cashfree response status:', response.status)
    console.log('🔵 Cashfree response data:', responseData)

    if (!response.ok) {
      console.error('❌ Cashfree API error:', responseData)
      throw new Error(responseData.message || 'Failed to create order')
    }

    return NextResponse.json({
      success: true,
      orderId: orderId,
      paymentSessionId: responseData.payment_session_id,
      orderToken: responseData.order_token
    })

  } catch (error: any) {
    console.error('❌ Error creating payment order:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create payment order' },
      { status: 500 }
    )
  }
}