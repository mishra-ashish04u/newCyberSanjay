"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { Loader2, FileText, Calendar, Eye, LogOut, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

interface Purchase {
  purchaseId: string
  itemId: string
  itemName: string
  displayName?: string
  itemType: string
  amount: number
  purchaseDate: any
  status: string
  isFromCombo?: boolean
  originalPurchaseId?: string
}

export default function MyPurchasesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewingPdf, setViewingPdf] = useState<string | null>(null)

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        fetchPurchases(currentUser)
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  // Fetch user's purchases
  const fetchPurchases = async (currentUser: any) => {
    try {
      setLoading(true)
      const token = await currentUser.getIdToken()

      const response = await fetch('/api/purchases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      console.log('Fetched Purchases:', data)
      if (data.success) {
        console.log('Purchases Data:', data.purchases)
        setPurchases(data.purchases)
      } else {
        setError(data.error || 'Failed to load purchases')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load purchases')
    } finally {
      setLoading(false)
    }
  }

  // View PDF in new tab
  const handleViewPdf = async (productId: string) => {
  try {
    if (!user) return

    const token = await user.getIdToken()
    
    // Fetch PDF with auth header
    const response = await fetch(`/api/view-pdf/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const error = await response.json()
      alert(error.error || 'Failed to load PDF')
      return
    }

    // Create blob and open in new tab
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    
  } catch (error) {
    console.error('Error viewing PDF:', error)
    alert('Failed to open PDF. Please try again.')
  }
}

  // Logout
  const handleLogout = async () => {
    await auth.signOut()
    router.push('/')
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-yellow-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your purchases...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Purchases</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => fetchPurchases(user)}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <>
       <Header />

    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
    
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Empty State */}
        {purchases.length === 0 ? (
          <div className="bg-white border-2 border-yellow-200 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Purchases Yet</h2>
            <p className="text-gray-600 mb-6">
              Start your cybersecurity journey by purchasing a course
            </p>
            <Button 
              onClick={() => router.push('/#courses-section')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Browse Courses
            </Button>
          </div>
        ) : (
          <>
            {/* Purchases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((purchase) => (
                <PurchaseCard
                  key={purchase.purchaseId}
                  purchase={purchase}
                  onView={handleViewPdf}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 bg-white border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Purchases</p>
                  <p className="text-3xl font-bold text-yellow-600">{purchases.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{purchases.reduce((sum, p) => sum + (p.isFromCombo ? 0 : p.amount), 0)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
    <Footer />
    </>
  )
}


// Purchase Card Component
function PurchaseCard({ 
  purchase, 
  onView 
}: { 
  purchase: Purchase
  onView: (productId: string) => void 
}) {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white border-2 border-yellow-200 rounded-xl p-5 hover:border-yellow-400 hover:shadow-lg transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-yellow-600" />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
            {purchase.displayName || purchase.itemName}
          </h3>
          {purchase.isFromCombo && (
            <span className="inline-block text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
              From Bundle
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Purchased: {formatDate(purchase.purchaseDate)}</span>
        </div>
        {!purchase.isFromCombo && (
          <div className="text-xl font-bold text-yellow-600">
            ₹{purchase.amount}
          </div>
        )}
      </div>

      {/* View Button */}
      <Button
        onClick={() => onView(purchase.itemId)}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        <Eye className="w-4 h-4 mr-2" />
        View PDF
      </Button>

      {/* Status Badge */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          purchase.status === 'active' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            purchase.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
          }`}></span>
          {purchase.status === 'active' ? 'Active' : purchase.status}
        </span>
      </div>
    </div>
  )
}