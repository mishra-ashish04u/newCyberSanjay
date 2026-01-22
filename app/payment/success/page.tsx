// app/payment/success/page.tsx
"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  updateProfile 
} from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { 
  getPendingPurchase, 
  linkPurchaseToUser,
  linkAllPendingPurchases 
} from "@/lib/firestore/purchases"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id')
  
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(true)
  const [pendingPurchase, setPendingPurchase] = useState<any>(null)
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  
  // Form states
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (orderId) {
      verifyAndLoadPurchase()
    } else {
      setLoading(false)
      setVerifying(false)
    }
  }, [orderId])

  /**
   * R2 & R3: Verify payment on server before showing success
   */
  const verifyAndLoadPurchase = async () => {
    try {
      setVerifying(true)

      // Skip verification for test orders, load directly from Firestore
      if (orderId?.startsWith('test_order_')) {
        console.log('🧪 Test order detected, skipping payment verification')
        
        // Load directly from pending_purchases
        const purchase = await getPendingPurchase(orderId!)
        
        if (!purchase) {
          throw new Error('Purchase not found')
        }

        setPendingPurchase(purchase)

        if (!purchase.accountLinked) {
          setShowAccountForm(true)
        } else {
          router.push('/profile?tab=purchases')
        }
        
        setLoading(false)
        setVerifying(false)
        return
      }

      // For real orders, verify payment with server
      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          itemId: 'pending',
          itemName: 'Pending verification',
          itemType: 'course',
          amount: 0,
          customerEmail: '',
          customerName: '',
          customerPhone: ''
        })
      })

      const verifyData = await verifyResponse.json()

      if (!verifyData.success) {
        throw new Error(verifyData.message || 'Payment verification failed')
      }

      // Now load the pending purchase
      const purchase = await getPendingPurchase(orderId!)
      
      if (!purchase) {
        throw new Error('Purchase not found')
      }

      setPendingPurchase(purchase)

      // R4: Show account form if not linked
      if (!purchase.accountLinked) {
        setShowAccountForm(true)
      } else {
        // Already linked, redirect to dashboard
        router.push('/profile?tab=purchases')
      }

    } catch (error: any) {
      console.error('Error verifying payment:', error)
      setError(error.message)
    } finally {
      setLoading(false)
      setVerifying(false)
    }
  }

  /**
   * R4 & R5: Create account and auto-link purchase
   */
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setProcessing(true)

    try {
      // Create Firebase auth account
      const userCred = await createUserWithEmailAndPassword(
        auth,
        pendingPurchase.customerEmail,
        password
      )
      
      // Update profile name
      await updateProfile(userCred.user, {
        displayName: pendingPurchase.customerName
      })
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: pendingPurchase.customerName,
        email: pendingPurchase.customerEmail,
        phone: pendingPurchase.customerPhone,
        createdAt: serverTimestamp()
      })
      
      // R5: Auto-link this purchase
      await linkPurchaseToUser(orderId!, userCred.user.uid)

      console.log('✅ Account created and purchase linked')
      
      // Redirect to dashboard
      router.push('/profile?tab=purchases')

    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already exists. Please login instead.')
        setIsLogin(true)
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters')
      } else {
        setError(err.message)
      }
    } finally {
      setProcessing(false)
    }
  }

  /**
   * R4 & R5: Login and auto-link ALL pending purchases for this email
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setProcessing(true)

    try {
      // Login
      const userCred = await signInWithEmailAndPassword(
        auth,
        pendingPurchase.customerEmail,
        password
      )
      
      // R5: Auto-link all pending purchases for this email
      const result = await linkAllPendingPurchases(
        pendingPurchase.customerEmail,
        userCred.user.uid
      )

      console.log(`✅ Logged in and linked ${result.linkedCount} purchases`)
      
      // Redirect to dashboard
      router.push('/profile?tab=purchases')

    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid password or user not found')
      } else {
        setError(err.message)
      }
    } finally {
      setProcessing(false)
    }
  }

  /**
   * R4: Google login and auto-link purchases
   */
  const handleGoogleAuth = async () => {
    setError("")
    setProcessing(true)

    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ 
        login_hint: pendingPurchase.customerEmail 
      })
      
      const result = await signInWithPopup(auth, provider)
      
      // Create/update user document
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        createdAt: serverTimestamp()
      }, { merge: true })
      
      // R5: Auto-link all pending purchases
      await linkAllPendingPurchases(
        pendingPurchase.customerEmail,
        result.user.uid
      )

      console.log('✅ Google login and purchases linked')
      
      router.push('/profile?tab=purchases')

    } catch (err: any) {
      setError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  // Loading state
  if (loading || verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-yellow-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            {verifying ? 'Verifying payment...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (!pendingPurchase) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Order Not Found'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'We couldn\'t find this order. Please contact support if you need help.'}
          </p>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  // Already linked state
  if (!showAccountForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-yellow-600 animate-spin" />
      </div>
    )
  }

  // R4: Account creation form
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        
        {/* Success Message */}
        <div className="bg-white border-2 border-green-300 rounded-2xl p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Payment Successful!
          </h1>
          <p className="text-sm text-gray-600 mb-4">Order ID: {orderId}</p>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              {pendingPurchase.itemName}
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              ₹{pendingPurchase.amount}
            </p>
          </div>
        </div>

        {/* Account Form */}
        <div className="bg-white border-2 border-yellow-300 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isLogin ? '🔐 Login to Access' : '✨ Create Your Account'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isLogin 
              ? 'Login to access your purchase' 
              : 'Set a password to access your purchase instantly'}
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleCreateAccount} className="space-y-4">
            
            {/* Email (locked) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={pendingPurchase.customerEmail}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                🔒 Email is locked for security
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isLogin ? 'Password' : 'Create Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder={isLogin ? "Enter your password" : "Minimum 6 characters"}
                required
                minLength={6}
                autoFocus
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={processing}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 text-base"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? 'Logging in...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  {isLogin ? '🔓 Login & Access Purchase' : '🚀 Create Account & Access'}
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <Button
            onClick={handleGoogleAuth}
            disabled={processing}
            variant="outline"
            className="w-full border-2 border-gray-300 py-4 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          {/* Toggle Login/Signup */}
          <div className="mt-5 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setPassword("")
              }}
              className="text-sm text-yellow-600 hover:text-yellow-700 hover:underline font-medium"
            >
              {isLogin 
                ? "Don't have an account? Create one" 
                : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-yellow-600 animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}