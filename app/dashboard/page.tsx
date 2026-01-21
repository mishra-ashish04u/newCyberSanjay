"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import { Loader2, FileText, Download, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"

const COURSE_INFO: Record<string, any> = {
  'starter-kit': {
    name: 'Starter Kit - Ethical Hacking Roadmap',
    files: ['roadmap.pdf', 'training-guide.pdf']
  },
  'resume-pack': {
    name: 'Resume Pack - Professional Templates',
    files: ['resume-templates.pdf', 'sample-points.pdf']
  },
  'complete-bundle': {
    name: 'Complete Bundle',
    files: ['roadmap.pdf', 'training-guide.pdf', 'resume-templates.pdf', 'sample-points.pdf']
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [purchases, setPurchases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/auth/login')
        return
      }
      
      setUser(currentUser)
      await loadPurchases(currentUser.uid)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loadPurchases = async (userId: string) => {
    try {
      const purchasesSnap = await getDocs(
        collection(db, 'users', userId, 'purchases')
      )
      
      const purchasesList = purchasesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setPurchases(purchasesList)
    } catch (error) {
      console.error('Error loading purchases:', error)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  const handleViewCourse = (courseId: string) => {
    router.push(`/course/${courseId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-yellow-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white border-2 border-yellow-300 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.displayName || 'User'}!</h1>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* My Purchases */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Purchases</h2>

        {purchases.length === 0 ? (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No purchases yet</p>
            <Button onClick={() => router.push('/#courses-section')}>
              Browse Courses
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => {
              const courseInfo = COURSE_INFO[purchase.courseId]
              
              return (
                <div key={purchase.id} className="bg-white border-2 border-yellow-300 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{courseInfo.name}</h3>
                      <p className="text-sm text-gray-600">
                        Purchased on {purchase.purchaseDate?.toDate?.()?.toLocaleDateString() || 'Recently'}
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleViewCourse(purchase.courseId)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Course
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}