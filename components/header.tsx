"use client"

import { useState, useEffect } from "react"
import { Menu, X, Bell, User, LogOut, Settings, BookOpen, Users, Home, ShoppingBag } from "lucide-react"
import { useAuth } from "@/app/hooks/useAuth"
import { useRouter } from "next/navigation"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    router.push('/')
  }

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Community", href: "/community", icon: Users },
    { label: "Blogs", href: "/blogs", icon: BookOpen },
    { label: "Courses", href: "/courses", icon: ShoppingBag },
    { label: "Mentorship", href: "/mentorship", icon: User },
  ]

  // Show loading state
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-yellow-50/90 backdrop-blur border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-yellow-400/50">
              <img src="/favicon_io/apple-touch-icon.png" alt="Cyber Sanjay" className="w-full h-full object-cover" />
            </div>
            <span className="text-yellow-950 font-bold text-lg md:text-xl tracking-tight">Cyber Sanjay</span>
          </a>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-900"></div>
        </div>
      </header>
    )
  }

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-yellow-50/95 backdrop-blur-lg shadow-md border-b border-yellow-200" 
          : "bg-yellow-50/90 backdrop-blur border-b border-yellow-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-yellow-400/50 group-hover:ring-yellow-500 transition-all">
              <img
                src="/favicon_io/apple-touch-icon.png"
                alt="Cyber Sanjay"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-yellow-950 font-bold text-lg md:text-xl tracking-tight">
              Cyber Sanjay
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-900 hover:text-yellow-950 hover:bg-yellow-100 rounded-lg transition-all"
                >
                  <Icon size={16} />
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right Side - Auth & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user?.isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-yellow-900 hover:bg-yellow-100 rounded-lg transition-all">
                  <Bell size={20} />
                  {/* Will add notification count later */}
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 hover:bg-yellow-100 rounded-full transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full ring-2 ring-yellow-400/50"
                    />
                    <span className="text-sm font-medium text-yellow-950">
                      {user.name?.split(' ')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-yellow-200 py-2 z-20">
                        <div className="px-4 py-3 border-b border-yellow-100">
                          <p className="text-sm font-semibold text-yellow-950">{user.name}</p>
                          <p className="text-xs text-yellow-600">{user.email}</p>
                        </div>
                        
                        <a 
                          href="/profile" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-yellow-900 hover:bg-yellow-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User size={16} />
                          My Profile
                        </a>
                        
                        <a 
                          href="/profile/purchases" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-yellow-900 hover:bg-yellow-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <ShoppingBag size={16} />
                          My Purchases
                        </a>
                        
                        <a 
                          href="/settings" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-yellow-900 hover:bg-yellow-50 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings size={16} />
                          Settings
                        </a>
                        
                        <div className="border-t border-yellow-100 mt-2 pt-2">
                          <button 
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <a href="/auth/login">
                  <button className="px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-100 rounded-lg transition-all">
                    Log In
                  </button>
                </a>
                <a href="/auth/sign-up">
                  <button className="px-4 py-2 text-sm font-semibold bg-yellow-400 hover:bg-yellow-500 text-yellow-950 rounded-lg transition-all shadow-sm hover:shadow-md">
                    Sign Up Free
                  </button>
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-yellow-900 hover:bg-yellow-100 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-yellow-200 bg-yellow-50/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-yellow-900 hover:bg-yellow-100 rounded-lg transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={18} />
                  {link.label}
                </a>
              )
            })}

            {user?.isLoggedIn ? (
              <div className="pt-4 border-t border-yellow-200 space-y-2">
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-yellow-900 hover:bg-yellow-100 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={18} />
                  My Profile
                </a>
                <a
                  href="/profile/purchases"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-yellow-900 hover:bg-yellow-100 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShoppingBag size={18} />
                  My Purchases
                </a>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-yellow-200 space-y-2">
                <a href="/auth" className="block" onClick={() => setMobileOpen(false)}>
                  <button className="w-full px-4 py-3 text-sm font-medium text-yellow-900 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-all">
                    Log In
                  </button>
                </a>
                <a href="/auth" className="block" onClick={() => setMobileOpen(false)}>
                  <button className="w-full px-4 py-3 text-sm font-semibold bg-yellow-400 hover:bg-yellow-500 text-yellow-950 rounded-lg transition-all">
                    Sign Up Free
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}