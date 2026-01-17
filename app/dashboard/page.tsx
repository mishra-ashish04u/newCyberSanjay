"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // 1️⃣ Not logged in
      if (!user) {
        router.push("/auth/login")
        return
      }

      // 2️⃣ Email not verified
      if (!user.emailVerified) {
        router.push("/auth/verify-email")
        return
      }

      // 3️⃣ Check profile completion
      const snap = await getDoc(doc(db, "users", user.uid))

      if (!snap.exists() || !snap.data().profile) {
        router.push("/profile")
        return
      }

      // 4️⃣ All good → dashboard
      setUserEmail(user.email)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <p className="text-gray-700">Loading your dashboard…</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 border border-yellow-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Logged in as <span className="font-medium">{userEmail}</span>
        </p>

        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-4 py-2 rounded font-medium hover:bg-yellow-500 transition"
        >
          Logout
        </button>
      </div>
    </main>
  )
}
