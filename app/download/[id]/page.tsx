"use client"

import { createClient } from "@/lib/supabase/client"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DownloadPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  useEffect(() => {
    const downloadProduct = async () => {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Check if user has purchased
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

      // Get product
      const { data: product } = await supabase.from("products").select("*").eq("id", productId).single()

      if (product?.pdf_url) {
        // Log download
        await supabase.from("user_downloads").insert({
          user_id: user.id,
          product_id: productId,
          order_id: purchase.id,
          downloaded_at: new Date().toISOString(),
        })

        // Trigger download
        window.location.href = product.pdf_url
      }
    }

    downloadProduct()
  }, [router, productId])

  return null
}
