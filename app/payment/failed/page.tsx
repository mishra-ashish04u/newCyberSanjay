"use client"

import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border-2 border-red-300 rounded-2xl p-8 text-center">
        
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          Your payment could not be processed. Please try again.
        </p>

        <div className="space-y-3">
          <Button 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6"
            asChild
          >
            <Link href="/courses">
              Try Again
            </Link>
          </Button>

          <Button 
            variant="outline"
            className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6"
            asChild
          >
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}