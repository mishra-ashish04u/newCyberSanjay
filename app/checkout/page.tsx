"use client"

import { Suspense } from "react"
import CheckoutContent from "./checkout-content"

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  )
}

function CheckoutLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    </div>
  )
}
