import { NextRequest, NextResponse } from 'next/server'

// ONLY FOR TESTING - REMOVE IN PRODUCTION
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const orderId = `test_order_${Date.now()}`

    console.log('🧪 Creating test purchase:', orderId)

    // Return data for client to create in Firestore
    return NextResponse.json({
      success: true,
      orderId: orderId,
      purchaseData: {
        orderId,
        customerEmail: body.email.toLowerCase().trim(),
        customerName: body.name,
        customerPhone: body.phone || '9999999999',
        itemId: body.itemId || 'test_course_123',
        itemName: body.itemName || 'Test Course',
        itemType: body.itemType || 'course',
        amount: body.amount || 2999,
        paymentStatus: 'success',
        accountLinked: false,
        metadata: body.metadata || {
          courseUrl: '/courses/test',
          thumbnail: '/images/test.jpg'
        }
      },
      redirectUrl: `/payment/success?order_id=${orderId}`
    })

  } catch (error: any) {
    console.error('❌ Mock purchase error:', error)
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 })
  }
}