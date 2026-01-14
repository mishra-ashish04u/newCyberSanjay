import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import { google } from "googleapis"

export async function POST(req: Request) {
  const data = await req.json()

  if (data.status !== "Credit") {
    return NextResponse.json({ ok: true })
  }

  const email = data.buyer
  const phone = data.buyer_phone
  const amount = data.amount
  const paymentId = data.payment_id
  const purpose = data.purpose

  // ---- PRODUCT DETECTION ----
  let attachments = []

  if (amount === "99" && purpose.includes("Starter")) {
    attachments.push({
      filename: "7-Day-Starter-Kit.pdf",
      content: fs.readFileSync(
        path.join(process.cwd(), "app/private-pdfs/starter-kit.pdf")
      )
    })
  }

  if (amount === "99" && purpose.includes("Resume")) {
    attachments.push({
      filename: "Resume-Booster-Pack.pdf",
      content: fs.readFileSync(
        path.join(process.cwd(), "app/private-pdfs/resume-pack.pdf")
      )
    })
  }

  if (amount === "149") {
    attachments.push(
      {
        filename: "7-Day-Starter-Kit.pdf",
        content: fs.readFileSync(
          path.join(process.cwd(), "app/private-pdfs/starter-kit.pdf")
        )
      },
      {
        filename: "Resume-Booster-Pack.pdf",
        content: fs.readFileSync(
          path.join(process.cwd(), "app/private-pdfs/resume-pack.pdf")
        )
      }
    )
  }

  // ---- SEND EMAIL ----
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  await transporter.sendMail({
    from: `"Cyber Sanjay" <support@cybersanjay.com>`,
    to: email,
    subject: "Your Cybersecurity Purchase",
    html: amount === "149"
      ? "<p>Both PDFs are attached.</p>"
      : "<p>Your PDF is attached.</p>",
    attachments
  })

  // ---- SAVE TO GOOGLE SHEETS ----
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  const sheets = google.sheets({ version: "v4", auth })
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID!,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        email,
        phone,
        purpose,
        amount,
        paymentId
      ]]
    }
  })

  return NextResponse.json({ success: true })
}
