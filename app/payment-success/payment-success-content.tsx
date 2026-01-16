"use client"

import { CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">

        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold">
          Payment Successful 🎉
        </h1>

        <p className="text-muted-foreground">
          Thank you for your purchase.  
          Your PDF has been <strong>sent to your email</strong>.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>
            Please check Inbox / Spam / Promotions tab
          </span>
        </div>

        <div className="pt-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            Didn’t receive it within 2 minutes?
          </p>

          <p className="text-sm">
            Contact us at{" "}
            <a
              href="mailto:support@cybersanjay.com"
              className="text-primary underline"
            >
              support@cybersanjay.com
            </a>
          </p>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-block text-sm text-primary underline"
          >
            Back to homepage
          </Link>
        </div>

      </div>
    </div>
  )
}
