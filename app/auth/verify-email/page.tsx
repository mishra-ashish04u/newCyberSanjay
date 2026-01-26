"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { sendEmailVerification } from "firebase/auth"
import { useRouter } from "next/navigation"
import { linkAllPendingPurchases } from "@/lib/firestore/purchases"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [resent, setResent] = useState(false)
  const [checking, setChecking] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const user = auth.currentUser

    if (!user) {
      router.push("/auth/login")
      return
    }

    if (user.emailVerified) {
      router.push("/profile")
      return
    }

    setLoading(false)
  }, [router])

  const resendVerification = async () => {
    if (!auth.currentUser) return

    try {
      await sendEmailVerification(auth.currentUser)
      setResent(true)
      setMessage("Verification email sent!")
      setTimeout(() => setMessage(""), 3000)
    } catch (error: any) {
      setMessage("Failed to send email. Please try again.")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const checkVerificationAndLink = async () => {
    const user = auth.currentUser
    if (!user) return

    setChecking(true)
    setMessage("")

    try {
      // Reload user to get latest email verification status
      await user.reload()

      // Check if email is now verified
      if (user.emailVerified) {
        setMessage("Email verified! Linking your purchases...")

        // ✅ Link any pending purchases to this account
        if (user.email) {
          const linkResult = await linkAllPendingPurchases(user.email, user.uid)
          console.log(`✅ Linked ${linkResult.linkedCount} pending purchases after email verification`)
          
          if (linkResult.linkedCount > 0) {
            setMessage(`✅ Email verified! ${linkResult.linkedCount} purchase(s) linked to your account.`)
          } else {
            setMessage("✅ Email verified successfully!")
          }
        }

        // Wait a moment to show the success message
        setTimeout(() => {
          router.push("/profile")
        }, 2000)
      } else {
        setMessage("Email not verified yet. Please check your inbox and click the verification link.")
        setTimeout(() => setMessage(""), 4000)
      }
    } catch (error: any) {
      console.error("Error checking verification:", error)
      setMessage("Error checking verification. Please try again.")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setChecking(false)
    }
  }

  if (loading) return null

  return (
    <main className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="w-full max-w-md p-6 rounded-xl border border-yellow-200 bg-white shadow-md text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg 
              className="w-8 h-8 text-yellow-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify your email
          </h1>

          <p className="text-sm text-gray-600 mb-1">
            We've sent a verification link to your email address.
          </p>
          <p className="text-xs text-gray-500">
            {auth.currentUser?.email}
          </p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes("✅") || message.includes("verified!") 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : message.includes("not verified yet")
              ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
              : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={checkVerificationAndLink}
            disabled={checking}
            className="w-full bg-yellow-400 text-black py-2.5 rounded font-medium hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checking ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Checking...
              </span>
            ) : (
              "I've verified my email"
            )}
          </button>

          <button
            onClick={resendVerification}
            disabled={checking}
            className="w-full border border-gray-300 py-2.5 rounded font-medium hover:bg-yellow-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend verification email
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            <strong>Steps to verify:</strong>
          </p>
          <ol className="text-xs text-gray-600 text-left space-y-1 max-w-xs mx-auto">
            <li>1. Check your email inbox</li>
            <li>2. Click the verification link</li>
            <li>3. Return here and click "I've verified my email"</li>
          </ol>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Didn't receive the email? Check your spam folder or resend it.
        </p>
      </div>
    </main>
  )
}