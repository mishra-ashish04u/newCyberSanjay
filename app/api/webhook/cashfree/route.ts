import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify webhook signature (implement Cashfree signature verification)
    // For now, we'll trust the webhook if it comes from Cashfree

    if (body.event_type === "PAYMENT_SUCCESS_WEBHOOK") {
      const supabase = await createClient()

      const { error } = await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("cashfree_order_id", body.data.order.order_id)

      if (error) {
        console.error("Failed to update order:", error)
        return NextResponse.json({ success: false }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    if (body.event_type === "PAYMENT_FAILED_WEBHOOK") {
      const supabase = await createClient()

      await supabase.from("orders").update({ status: "failed" }).eq("cashfree_order_id", body.data.order.order_id)

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
