"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Script from "next/script"

interface Product {
  id: string
  name: string
  price: number
}

export default function CheckoutContent() {
  const [user, setUser] = useState<any>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const searchParams = useSearchParams()
  const router = useRouter()
  const productParam = searchParams.get("product")

  useEffect(() => {
    const loadCheckout = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      let productsData: Product[] = []

      if (productParam === "bundle") {
        const { data } = await supabase.from("products").select("*")
        productsData = data || []
        setTotalPrice(149)
      } else {
        const { data } = await supabase.from("products").select("*").eq("id", productParam)
        productsData = data || []
        setTotalPrice(productsData[0]?.price || 0)
      }

      setProducts(productsData)
      setIsLoading(false)
    }

    loadCheckout()
  }, [router, productParam])

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const supabase = createClient()

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productIds: productParam === "bundle" ? products.map((p) => p.id) : [productParam],
          amount: totalPrice,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.message)
      }

      const { sessionId } = orderData.data

      if (window.Cashfree) {
        const checkoutOptions = {
          paymentSessionId: sessionId,
          redirectTarget: "_self",
        }

        window.Cashfree.checkout(checkoutOptions)
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Failed to initiate payment. Please try again.")
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script src="https://sdk.cashfree.com/js/cashfree.js" />

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <Card className="border-border">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Order Summary</CardTitle>
              <CardDescription>Review your purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-sm">{product.name}</span>
                    <span className="font-semibold">₹{product.price}</span>
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay ₹${totalPrice}`}
                </Button>
                <p className="text-xs text-center text-muted-foreground">Secure payment via Cashfree</p>
              </div>

              <Button variant="outline" className="w-full border-border bg-transparent" onClick={() => router.back()}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
