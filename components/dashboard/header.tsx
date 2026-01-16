"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function DashboardHeader() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">⚡</span>
          </div>
          <Link href="/dashboard" className="font-bold text-lg text-foreground hover:opacity-80">
            Cyber Sanjay
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
            Dashboard
          </Link>
          <Link href="/downloads" className="text-sm text-muted-foreground hover:text-foreground transition">
            My Products
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-border bg-transparent"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Logout"}
          </Button>
        </nav>
      </div>
    </header>
  )
}
