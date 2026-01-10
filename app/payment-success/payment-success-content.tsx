"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessContent() {
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const processPayment = async () => {
      try {
        const orderId = searchParams.get("order_id")

        if (!orderId) {
          setError("Order ID not found")
          setIsProcessing(false)
          return
        }

        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        })

        const data = await response.json()

        if (!data.success) {
          setError(data.message || "Payment verification failed")
        }

        setIsProcessing(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setIsProcessing(false)
      }
    }

    processPayment()
  }, [searchParams])

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="border-border w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Payment Failed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => router.push("/dashboard")} className="w-full bg-primary hover:bg-primary/90">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="border-border w-full max-w-sm">
        <CardHeader className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center">
            <p className="text-sm text-green-700 dark:text-green-200">
              Your purchase is confirmed. Your PDFs are now unlocked in your dashboard.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">What's next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Instant PDF access</li>
              <li>✓ Download anytime</li>
              <li>✓ Lifetime access (no expiry)</li>
            </ul>
          </div>

          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
          >
            Go To My Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
