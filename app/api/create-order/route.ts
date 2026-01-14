import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { productIds, amount, customerEmail } = body

    // ✅ Validate input
    if (!productIds || !amount || !customerEmail) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    // ✅ Create Supabase client
    const supabase = await createClient()

    // ✅ Guest-safe order id
    const cashfreeOrderId = `order_${Date.now()}`

    // ✅ Correct Cashfree base URL
    const CASHFREE_BASE_URL =
      process.env.CASHFREE_ENV === "TEST"
        ? "https://sandbox.cashfree.com"
        : "https://api.cashfree.com"

    // ✅ Create order in Cashfree
    const cashfreeResponse = await fetch(
      `${CASHFREE_BASE_URL}/pg/orders`,
      {
        method: "POST",
        headers: {
          "x-api-version": "2022-09-01",
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: cashfreeOrderId,
          order_amount: Number(amount),
          order_currency: "INR",
          customer_details: {
            customer_id: customerEmail,
            customer_email: customerEmail,
            customer_phone: "9999999999",
          },
          order_meta: {
            return_url: `${
              process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
            }/payment-success?order_id=${cashfreeOrderId}`,
          },
        }),
      }
    )

    const cashfreeData = await cashfreeResponse.json()

    // 🔴 IMPORTANT: log real Cashfree error
    if (!cashfreeResponse.ok) {
      console.error("Cashfree API Error:", cashfreeData)
      return NextResponse.json(
        {
          success: false,
          message: cashfreeData.message || "Cashfree order creation failed",
        },
        { status: 500 }
      )
    }

    // ✅ Ensure session id exists
    if (!cashfreeData.payment_session_id) {
      console.error("Cashfree response:", cashfreeData)
      return NextResponse.json(
        { success: false, message: "Payment session not generated" },
        { status: 500 }
      )
    }

    // ✅ Store order (guest mode)
    const { error } = await supabase.from("orders").insert({
      user_id: null,
      product_id: productIds[0],
      amount,
      cashfree_order_id: cashfreeOrderId,
      status: "pending",
      email: customerEmail,
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { success: false, message: "Database error" },
        { status: 500 }
      )
    }

    // ✅ Success response
    return NextResponse.json({
      success: true,
      data: {
        sessionId: cashfreeData.payment_session_id,
        orderId: cashfreeOrderId,
      },
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    )
  }
}
