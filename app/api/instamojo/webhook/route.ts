import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/* =====================================================
   ASYNC BACKGROUND PROCESS (EMAIL + SHEET)
===================================================== */

async function processPayment(data: URLSearchParams) {
  try {
    // ✅ INSTAMOJO CORRECT FIELD
    const paymentStatus = data.get("payment_status")
    const email = data.get("buyer")

    if (paymentStatus !== "Credit" || !email) {
      console.log("❌ Payment ignored", {
        paymentStatus,
        email,
      })
      return
    }

    const name = data.get("buyer_name") || "Customer"
    const phone = data.get("buyer_phone") || ""
    const amount = data.get("amount") || ""
    const paymentId = data.get("payment_id") || ""
    const purpose = data.get("purpose") || ""

    console.log("✅ PAYMENT CONFIRMED:", paymentId)

    /* ---------------- EMAIL ---------------- */

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: {
        name: "Cyber Sanjay",
        address: process.env.SMTP_USER!,
      },
      to: email,
      replyTo: process.env.SMTP_USER!,
      subject: "✅ Payment Successful – Cyber Sanjay",
      text: `Hi ${name},

Your payment was successful.

Product: ${purpose}
Amount Paid: ₹${amount}
Payment ID: ${paymentId}

You’ll get access inside your dashboard shortly.

– Cyber Sanjay`,
      html: `
        <p>Hi ${name},</p>
        <p>Your payment was <b>successful</b>.</p>
        <p><b>Product:</b> ${purpose}</p>
        <p><b>Amount Paid:</b> ₹${amount}</p>
        <p><b>Payment ID:</b> ${paymentId}</p>
        <p>You’ll get access inside your dashboard shortly.</p>
        <p><b>– Cyber Sanjay</b></p>
      `,
    })

    console.log("📩 EMAIL SENT:", info.messageId)

    /* ---------------- GOOGLE SHEETS ---------------- */

    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          amount,
          paymentId,
          status: "Credit",
        }),
      })

      console.log("📊 GOOGLE SHEET UPDATED")
    } else {
      console.log("⚠️ GOOGLE_SHEETS_WEBHOOK_URL not set")
    }
  } catch (err) {
    console.error("🔥 PROCESS PAYMENT ERROR:", err)
  }
}

/* =====================================================
   WEBHOOK HANDLER (FAST RESPONSE)
===================================================== */

export async function POST(req: Request) {
  try {
    console.log("🔥 INSTAMOJO WEBHOOK HIT")

    const rawBody = await req.text()
    const data = new URLSearchParams(rawBody)

    console.log("📩 WEBHOOK DATA:", Object.fromEntries(data))

    // Fire & forget → no await
    processPayment(data)

    // Immediate ACK to Instamojo
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}

