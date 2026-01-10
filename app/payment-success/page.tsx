"use client"

import { Suspense } from "react"
import PaymentSuccessContent from "./payment-success-content"

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}

function PaymentSuccessLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="animate-spin inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-muted-foreground">Verifying your payment...</p>
      </div>
    </div>
  )
}
