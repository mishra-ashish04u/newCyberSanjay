// app/api/contact/route.ts
// API route to handle contact form submission and send emails

import { NextRequest, NextResponse } from 'next/server'
import { submitContactForm } from '@/lib/firestore/contact'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to Firestore
    const firestoreResult = await submitContactForm({ name, email, subject, message })

    if (!firestoreResult.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    // Send automated email response
    const emailResult = await sendAutomatedEmail(email, name)

    if (!emailResult.success) {
      console.error('Email sending failed, but form was saved to Firestore')
      // Still return success since the form was saved
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: firestoreResult.id
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Send automated email response to user
 * This uses Resend API - you'll need to set up an account at resend.com
 * Alternative: Use SendGrid, Mailgun, or Nodemailer with Gmail
 */
async function sendAutomatedEmail(userEmail: string, userName: string) {
  try {
    // Option 1: Using Resend (Recommended)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Cyber Sanjay <support@cybersanjay.com>',
        to: userEmail,
        subject: 'We received your message - Cyber Sanjay',
        html: getEmailTemplate(userName)
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

/**
 * Email template for automated response
 */
function getEmailTemplate(userName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fef3c7;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #78350f; font-size: 28px; font-weight: bold;">Cyber Sanjay</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 24px;">Hi ${userName},</h2>
              
              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to us! This is an automated confirmation that we've received your message.
              </p>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; color: #78350f; font-size: 14px; font-weight: 600;">
                  ✅ Your message has been successfully received
                </p>
              </div>

              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                Our team will review your message and get back to you within <strong>24-48 hours</strong>.
              </p>

              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to:
              </p>

              <ul style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 24px; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Browse our <a href="https://www.cybersanjay.com/blogs" style="color: #f59e0b; text-decoration: none;">free blog articles</a></li>
                <li style="margin-bottom: 8px;">Join our <a href="https://www.cybersanjay.com/community" style="color: #f59e0b; text-decoration: none;">community</a></li>
                <li>Check out our <a href="https://www.cybersanjay.com/courses" style="color: #f59e0b; text-decoration: none;">courses</a></li>
              </ul>

              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>The Cyber Sanjay Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #fef3c7; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px; color: #78350f; font-size: 14px;">
                <strong>Cyber Sanjay</strong> - Your Cybersecurity Learning Platform
              </p>
              <p style="margin: 0; color: #92400e; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
              </p>
              <p style="margin: 10px 0 0; color: #92400e; font-size: 12px;">
                <a href="https://www.cybersanjay.com" style="color: #f59e0b; text-decoration: none;">Visit Website</a> | 
                <a href="mailto:support@cybersanjay.com" style="color: #f59e0b; text-decoration: none;">Contact Support</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}