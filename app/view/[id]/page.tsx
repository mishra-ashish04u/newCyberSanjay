"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  pdf_url: string
}

export default function ViewProductPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  useEffect(() => {
    const loadProduct = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)

      // Check if user has purchased this product
      const { data: purchase } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .eq("status", "completed")
        .single()

      if (!purchase) {
        router.push("/dashboard")
        return
      }

      const { data: productData } = await supabase.from("products").select("*").eq("id", productId).single()

      if (productData) {
        setProduct(productData)
      }

      setIsLoading(false)
    }

    loadProduct()
  }, [router, productId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Product not found</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          Back
        </Button>

        <div className="bg-card rounded-lg border border-border p-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

          <div className="mb-6">
            <p className="text-muted-foreground mb-4">View your PDF below or download it to read offline.</p>
            <a href={product.pdf_url} download target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Download PDF</Button>
            </a>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 text-center border border-border">
            <p className="text-muted-foreground mb-4">PDF Viewer</p>
            <p className="text-sm text-muted-foreground">Best experience: download & read offline</p>
          </div>
        </div>
      </div>
    </div>
  )
}
