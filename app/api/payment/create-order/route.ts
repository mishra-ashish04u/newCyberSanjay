// app/api/payment/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server'

/**
 * R1: Create payment order without requiring login
 * Accepts guest user details
 */
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
      metadata // Optional: thumbnail, description, urls, etc.
    } = body

    // Validate required fields
    if (!itemId || !itemName || !itemType || !amount || !customerEmail || !customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Generate unique order ID (with timestamp for ordering)
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    const orderId = `order_${timestamp}_${random}`

    // Determine API URL
    const apiUrl = process.env.CASHFREE_ENV === 'PROD'
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders'

    // Prepare order request for Cashfree
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
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?order_id=${orderId}`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`
      },
      order_note: `${itemType}: ${itemName}`,
      order_tags: {
        itemId,
        itemName,
        itemType,
        metadata: JSON.stringify(metadata || {})
      }
    }

    console.log('🔵 Creating Cashfree order:', {
      orderId,
      amount,
      customer: customerEmail
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
      body: JSON.stringify(orderRequest)
    })

    const responseData = await response.json()

    console.log('🔵 Cashfree response status:', response.status)

    if (!response.ok) {
      console.error('❌ Cashfree API error:', responseData)
      throw new Error(responseData.message || 'Failed to create order')
    }

    console.log('✅ Order created successfully:', orderId)

    return NextResponse.json({
      success: true,
      orderId,
      paymentSessionId: responseData.payment_session_id,
      orderToken: responseData.order_token,
      // Return these for verification later
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