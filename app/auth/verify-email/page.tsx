"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { sendEmailVerification } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    const user = auth.currentUser

    if (!user) {
      router.push("/auth/login")
      return
    }

    if (user.emailVerified) {
      router.push("/dashboard")
      return
    }

    setLoading(false)
  }, [router])

  const resendVerification = async () => {
    if (!auth.currentUser) return

    await sendEmailVerification(auth.currentUser)
    setResent(true)
  }

  if (loading) return null

  return (
    <main className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="w-full max-w-md p-6 rounded-xl border border-yellow-200 bg-white shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Verify your email
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          We’ve sent a verification link to your email address.  
          Please verify your email to continue.
        </p>

        <button
          onClick={resendVerification}
          className="w-full bg-yellow-400 text-black py-2 rounded font-medium hover:bg-yellow-500 transition"
        >
          Resend verification email
        </button>

        {resent && (
          <p className="text-sm text-green-600 mt-3">
            Verification email sent again ✔
          </p>
        )}

        <p className="text-xs text-gray-500 mt-6">
          Didn’t receive the email?  
          Check your spam folder or try again.
        </p>
      </div>
    </main>
  )
}
