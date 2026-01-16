import { NextResponse } from "next/server"

export async function GET() {
  await fetch(process.env.GOOGLE_SHEET_WEBHOOK!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "NextJS Test",
      email: "test@domain.com",
      phone: "8888888888",
      amount: "149",
      paymentId: "NEXTJS_TEST",
      status: "Credit",
    }),
  })

  return NextResponse.json({ ok: true })
}
