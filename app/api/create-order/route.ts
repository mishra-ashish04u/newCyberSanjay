import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productIds, amount } = body

    if (!userId || !productIds || !amount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Create Cashfree order
    const orderId = `order_${Date.now()}_${userId.substring(0, 8)}`

    const cashfreeResponse = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "X-Api-Version": "2023-08-01",
        "X-Client-Id": process.env.CASHFREE_APP_ID || "",
        "X-Client-Secret": process.env.CASHFREE_SECRET_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: userId,
          customer_email: "user@example.com",
          customer_phone: "9999999999",
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment-success?order_id=${orderId}`,
          notify_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/webhook/cashfree`,
        },
      }),
    })

    const cashfreeData = await cashfreeResponse.json()

    if (!cashfreeData.payment_session_id) {
      throw new Error("Failed to create Cashfree order")
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        product_id: productIds[0],
        amount,
        cashfree_order_id: orderId,
        status: "pending",
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(orderError.message)
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: cashfreeData.payment_session_id,
        orderId: order.id,
      },
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to create order" },
      { status: 500 },
    )
  }
}
