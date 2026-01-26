// app/api/payment/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      itemId,
      itemName, 
      itemType,
      amount, 
      customerEmail, 
      customerName, 
      customerPhone,
      metadata
    } = body

    // Validate required fields
    if (!itemId || !itemName || !itemType || !amount || !customerEmail || !customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    const orderId = `order_${timestamp}_${random}`

    // Determine API URL
    const apiUrl = process.env.CASHFREE_ENV?.toUpperCase() === 'PROD'
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders'

    // CORRECT Cashfree format with ALL required fields
    // CORRECT Cashfree format with ALL required fields
const cashfreeRequest = {
  order_id: orderId,
  order_amount: parseFloat(amount.toString()),
  order_currency: 'INR',
  customer_details: {
    customer_id: `cust_${timestamp}`,
    customer_email: customerEmail.toLowerCase().trim(),
    customer_phone: customerPhone || '9999999999',
    customer_name: customerName.trim()
  },
  order_meta: {
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?order_id=${orderId}`,
    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`
  },
  order_note: itemName,
  // ✅ Flat key-value pairs, all strings
  order_tags: {
    itemId: itemId,
    itemType: itemType,
    itemName: itemName,
    downloadUrl: metadata?.downloadUrl || '',
    githubPath: metadata?.githubPath || '',
    thumbnail: metadata?.thumbnail || ''
  }
}

    console.log('🔵 Cashfree Request URL:', apiUrl)
    console.log('🔵 Cashfree Request Body:', JSON.stringify(cashfreeRequest, null, 2))
    console.log('🔵 Using credentials:', {
      app_id: process.env.CASHFREE_APP_ID,
      env: process.env.CASHFREE_ENV
    })

    // Call Cashfree API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(cashfreeRequest)
    })

    const responseData = await response.json()

    console.log('🔵 Cashfree response status:', response.status)
    console.log('🔵 Cashfree response body:', JSON.stringify(responseData, null, 2))

    if (!response.ok) {
      console.error('❌ Cashfree API error:', responseData)
      return NextResponse.json(
        { 
          success: false, 
          error: responseData.message || 'Failed to create order' 
        },
        { status: response.status }
      )
    }

    console.log('✅ Order created successfully:', orderId)

    return NextResponse.json({
      success: true,
      orderId,
      paymentSessionId: responseData.payment_session_id,
      orderToken: responseData.order_token,
      itemId,
      itemName,
      itemType,
      amount,
      customerEmail,
      customerName,
      customerPhone,
      metadata
    })

  } catch (error: any) {
    console.error('❌ Error creating payment order:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create payment order' },
      { status: 500 }
    )
  }
}