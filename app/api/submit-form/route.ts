import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

/* 🔥 REQUIRED FOR NODEMAILER */
export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { name, email, status } = await request.json()

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Add to Google Sheets
    const sheetResponse = await addToGoogleSheets({ name, email, status })

    if (!sheetResponse.success) {
      throw new Error("Failed to add to Google Sheets")
    }

    // 🔥 MUST AWAIT EMAIL ON VERCEL
    await sendWelcomeEmail({ name, email })

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Error in form submission:", error)
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    )
  }
}


async function addToGoogleSheets(data: {
  name: string
  email: string
  status: string
}) {
  const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

  if (!GOOGLE_SHEETS_URL) {
    console.error("[v0] Google Sheets webhook URL not configured")
    throw new Error("Google Sheets not configured")
  }

  const timestamp = new Date().toISOString()

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        status: data.status || "Not specified",
        timestamp: timestamp,
      }),
    })

    if (!response.ok) {
      throw new Error("Google Sheets API returned an error")
    }

    console.log("[v0] Successfully added to Google Sheets")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error adding to Google Sheets:", error)
    throw error
  }
}

async function sendWelcomeEmail(data: { name: string; email: string }) {
  // Hostinger SMTP configuration

  console.log("SMTP_USER:", process.env.SMTP_USER)
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "LOADED" : "MISSING")

    const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,              // SSL
    secure: true,           // MUST be true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // IMPORTANT for Vercel
    },
  })



  /* ✅ VERIFY SMTP */
  await transporter.verify()

  const mailOptions = {
    from: `"Cyber Sanjay" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Welcome to Your Cybersecurity Journey! 🔐",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Welcome to Your Cybersecurity Journey</title>
        </head>

        <body style="margin:0; padding:0; background-color:#f8fafc; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color:#334155;">

          <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0; background-color:#f8fafc;">
            <tr>
              <td align="center">

                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 12px 32px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#ffda6a,#ffd04a); padding:36px 24px; text-align:center;">
                      <h1 style="margin:0; font-size:28px; color:#1e293b;">
                        🔐 Welcome to Your Cybersecurity Journey!
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:32px 30px; font-size:15.5px; line-height:1.7;">

                      <p style="margin-top:0;">
                        Hey <strong>${data.name}</strong>! 👋
                      </p>

                      <p>
                        You are officially added to the early access list.
                      </p>

                      <p>
                        We’ll notify you as soon as we launch with exclusive resources, updates, and offers.
                      </p>

                      <!-- Signature -->
                      <div style="margin-top:28px;">
                        <p style="margin:0;">
                          <strong>– Cyber Sanjay</strong><br/>
                          <span style="color:#64748b;">Cybersecurity Mentor</span>
                        </p>
                      </div>

                    </td>
                  </tr>

                  <!-- Social Section -->
                  <tr>
                    <td align="center" style="padding:24px 20px; background:#f8fafc;">

                      <p style="margin:0 0 14px 0; font-size:15px; font-weight:600; color:#1e293b;">
                        Contact us on Social for updates 🚀
                      </p>

                      <table cellpadding="0" cellspacing="0">
                        <tr>

                          <!-- WhatsApp -->
                          <td style="padding: 0 12px;">
                            <a href="https://whatsapp.com/channel/0029Vb7dfiDD38CXfUkLz00b" target="_blank">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/256px-WhatsApp.svg.png"
                                width="36"
                                alt="WhatsApp"
                                style="display:block;"
                              />
                            </a>
                          </td>

                          <!-- Telegram -->
                          <td style="padding: 0 12px;">
                            <a href="https://t.me/icybersanjay" target="_blank">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/256px-Telegram_logo.svg.png"
                                width="36"
                                alt="Telegram"
                                style="display:block;"
                              />
                            </a>
                          </td>

                          <!-- LinkedIn -->
                          <td style="padding: 0 12px;">
                            <a href="https://www.linkedin.com/in/sanjay70023" target="_blank">
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                width="36"
                                alt="LinkedIn"
                                style="display:block;"
                              />
                            </a>
                          </td>

                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f1f5f9; padding:18px; text-align:center; font-size:13px; color:#64748b;">
                      Built with ❤️ for students
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
      </html>
      `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("[v0] Email sent successfully:", info.messageId)
    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    throw error
  }
}
