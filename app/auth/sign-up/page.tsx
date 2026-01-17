"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export default function SignUpPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  /* ================= EMAIL + PASSWORD SIGNUP ================= */
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      // Save name in Firebase Auth
      await updateProfile(user, {
        displayName: name,
      })

      // Send verification email (OTP-style)
      await sendEmailVerification(user)

      // Save minimal user record in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        meta: {
          signupMethod: "email",
          emailVerified: false,
          createdAt: serverTimestamp(),
        },
      })

      // Redirect to verify email page
      router.push("/auth/verify-email")
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  /* ================= GOOGLE SIGNUP ================= */
  const handleGoogleSignUp = async () => {
    setError("")
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Google users are already verified
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName,
          email: user.email,
          meta: {
            signupMethod: "google",
            emailVerified: true,
            createdAt: serverTimestamp(),
          },
        },
        { merge: true }
      )

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Google signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="w-full max-w-md p-6 border border-yellow-200 rounded-xl shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-1 text-gray-900">
          Create your account
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Start your cybersecurity journey with <span className="font-semibold text-yellow-600">Cyber Sanjay</span>
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleEmailSignUp} className="space-y-3">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-2 rounded font-medium hover:bg-yellow-500 transition"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="my-4 text-center text-xs text-gray-500">
          OR
        </div>

        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full border border-gray-300 py-2 rounded hover:bg-yellow-50 transition"
        >
          Continue with Google
        </button>
      </div>
    </main>
  )
}
