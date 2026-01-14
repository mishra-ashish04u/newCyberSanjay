"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

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
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/favicon_io/apple-touch-icon.png"
              alt="Cyber Sanjay"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-yellow-950 tracking-tight">
            Cyber Sanjay
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-yellow-900 hover:text-yellow-700 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/launchpad">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold">
              Get Started
            </Button>
          </Link>
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-yellow-900 hover:text-yellow-700"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/launchpad" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
