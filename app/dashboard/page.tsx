"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  price: number
  description: string
}

interface Purchase {
  product_id: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      const { data: productsData } = await supabase.from("products").select("*")

      if (productsData) {
        setProducts(productsData)
      }

      const { data: purchasesData } = await supabase
        .from("orders")
        .select("product_id")
        .eq("user_id", user.id)
        .eq("status", "completed")

      if (purchasesData) {
        setPurchases(purchasesData)
      }

      setIsLoading(false)
    }

    loadDashboard()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const hasPurchases = purchases.length > 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Welcome to Your Learning Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          {user?.user_metadata?.name ? `Hi ${user.user_metadata.name}!` : "Hi there!"} Your cybersecurity journey starts
          here.
        </p>
      </div>

      {!hasPurchases ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Available Products</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <Card key={product.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-3xl font-bold text-primary">₹{product.price}</p>
                      <p className="text-sm text-muted-foreground">One-time payment</p>
                    </div>
                    <Button
                      onClick={() => setSelectedProduct(product.id)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Buy Now — ₹{product.price}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bundle card */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardHeader>
              <Badge className="w-fit bg-primary text-primary-foreground mb-2">Best Value</Badge>
              <CardTitle className="text-2xl">Complete Starter Bundle</CardTitle>
              <CardDescription>Get both products at a special price</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-4xl font-bold text-primary">₹149</p>
                <p className="text-sm text-muted-foreground mt-1">Save ₹49 compared to buying separately</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-sm">7-Day Ethical Hacking Starter Kit PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-sm">Cybersecurity Resume Booster Pack PDF</span>
                </li>
              </ul>
              <Link href="/checkout?product=bundle">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6">
                  Get The Complete Bundle — ₹149
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground">
                Instant PDF access after payment • Secure Cashfree Checkout
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Purchased Products</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {products
              .filter((p) => purchases.some((purchase) => purchase.product_id === p.id))
              .map((product) => (
                <Card key={product.id} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>You own this product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <Link href={`/download/${product.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Download PDF
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground">
                      Download available anytime • No expiry • Files stored under your account
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
