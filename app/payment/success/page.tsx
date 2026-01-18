"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Separate component that uses useSearchParams
function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (orderId) {
      verifyPayment(orderId)
    }
  }, [orderId])

  const verifyPayment = async (orderId: string) => {
    try {
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      })

      const data = await response.json()
      
      if (data.success && data.status === 'SUCCESS') {
        setVerified(true)
      }
    } catch (error) {
      console.error('Verification error:', error)
    } finally {
      setVerifying(false)
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-yellow-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your purchase</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border-2 border-yellow-300 rounded-2xl p-8 text-center">
        
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase</p>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 mb-1">Order ID</p>
          <p className="font-mono text-xs text-gray-900 break-all">{orderId}</p>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-6"
            asChild
          >
            <Link href="/dashboard">
              <Download className="mr-2 w-5 h-5" />
              Download Your Courses
            </Link>
          </Button>

          <Button 
            variant="outline"
            className="w-full border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 py-6"
            asChild
          >
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          A confirmation email has been sent to your email address
        </p>
      </div>
    </div>
  )
}

// Main page component with Suspense wrapper
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-yellow-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}