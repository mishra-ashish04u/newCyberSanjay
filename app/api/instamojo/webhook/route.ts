import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/* ================= PROCESS PAYMENT ================= */

async function processPayment(data: URLSearchParams) {
  const status = data.get("status")
  const email = data.get("buyer")

  if (status !== "Credit" || !email) {
    console.log("❌ Not a successful payment")
    return
  }

  const name = data.get("buyer_name") || "Customer"
  const amount = data.get("amount")
  const paymentId = data.get("payment_id")

  console.log("✅ PAYMENT CONFIRMED:", paymentId)

  /* ================= EMAIL ================= */

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const info = await transporter.sendMail({
    from: `"Cyber Sanjay" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Payment Successful – Cyber Sanjay",
    text: `Hi ${name},

Payment successful.

Amount: ₹${amount}
Payment ID: ${paymentId}

– Cyber Sanjay`,
  })

  console.log("📩 EMAIL SENT:", info.messageId)
}

/* ================= WEBHOOK ================= */

export async function POST(req: Request) {
  console.log("🔥 INSTAMOJO WEBHOOK HIT")

  const rawBody = await req.text()
  const data = new URLSearchParams(rawBody)

  // Fire and forget (no timeout)
  processPayment(data)

  return NextResponse.json({ ok: true })
}
