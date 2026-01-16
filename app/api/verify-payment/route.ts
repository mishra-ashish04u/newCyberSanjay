import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get order details
    const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", orderId).single()

    if (orderError || !order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    // Verify with Cashfree if status is not already completed
    if (order.status !== "completed") {
      const cashfreeResponse = await fetch(`https://api.cashfree.com/pg/orders/${order.cashfree_order_id}/payments`, {
        method: "GET",
        headers: {
          "X-Api-Version": "2023-08-01",
          "X-Client-Id": process.env.CASHFREE_APP_ID || "",
          "X-Client-Secret": process.env.CASHFREE_SECRET_KEY || "",
        },
      })

      const payments = await cashfreeResponse.json()

      const successfulPayment = payments.data?.find((p: any) => p.payment_status === "SUCCESS")

      if (successfulPayment) {
        // Update order status
        await supabase.from("orders").update({ status: "completed" }).eq("id", orderId)
      }
    }

    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Verification failed" },
      { status: 500 },
    )
  }
}
