"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  price: number
  description: string
  pdf_url: string
}

export default function DownloadsPage() {
  const [user, setUser] = useState<any>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadDownloads = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      const { data: purchasesData } = await supabase
        .from("orders")
        .select("product_id")
        .eq("user_id", user.id)
        .eq("status", "completed")

      if (purchasesData && purchasesData.length > 0) {
        const productIds = purchasesData.map((p: any) => p.product_id)
        const { data: productsData } = await supabase.from("products").select("*").in("id", productIds)

        if (productsData) {
          setProducts(productsData)
        }
      }

      setIsLoading(false)
    }

    loadDownloads()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Loading your products...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-foreground">My Products</h1>
        <Card className="border-border text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">You haven't purchased any products yet.</p>
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground">My Products</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="border-border">
            <CardHeader>
              <CardTitle className="text-xl">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Purchased and ready to download</p>
              <div className="space-y-2">
                <a href={product.pdf_url} download target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Download PDF
                  </Button>
                </a>
                <Link href={`/view/${product.id}`}>
                  <Button variant="outline" className="w-full border-border bg-transparent">
                    View Online
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Download available anytime • No expiry • Files stored under your account
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
