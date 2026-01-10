"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
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
    setUser(null)
    router.push("/")
  }

  const navLinks = [
    { label: "Launchpad", href: "/launchpad" },
    { label: "1-on-1 Mentorship", href: "/mentorship" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-yellow-50/90 backdrop-blur border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 font-bold text-lg md:text-xl"
            >
              {/* Logo image */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="/favicon_io/apple-touch-icon.png"
                  alt="Cyber Sanjay"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Brand text */}
              <span className="text-yellow-950 tracking-tight">
                Cyber Sanjay
              </span>
            </Link>


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {!user &&
            navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-yellow-900 hover:text-yellow-700 transition"
              >
                {link.label}
              </a>
            ))}

          {user && (
            <>
              <Link href="/dashboard" className="text-sm text-yellow-900 hover:text-yellow-700">
                Dashboard
              </Link>
              <Link href="/downloads" className="text-sm text-yellow-900 hover:text-yellow-700">
                My Products
              </Link>
            </>
          )}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <Link href="/auth/sign-up">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold">
                Get Started
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-yellow-300 text-yellow-900 hover:bg-yellow-100"
              disabled={isLoading}
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-yellow-200 bg-yellow-50">
          <div className="px-4 py-4 flex flex-col gap-4">
            {!user &&
              navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-yellow-900 hover:text-yellow-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}

            {!user ? (
              <Link href="/auth/sign-up" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold">
                  Get Started
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-yellow-300 text-yellow-900"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
