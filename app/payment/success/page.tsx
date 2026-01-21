"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc, collection, query, where, getDocs, serverTimestamp, deleteDoc } from "firebase/firestore"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id')
  
  const [loading, setLoading] = useState(true)
  const [pendingPurchase, setPendingPurchase] = useState<any>(null)
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  
  // Form states
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (orderId) {
      loadPendingPurchase()
    }
  }, [orderId])

  const loadPendingPurchase = async () => {
    try {
      const purchaseDoc = await getDoc(doc(db, 'pending_purchases', orderId!))
      
      if (purchaseDoc.exists()) {
        const data = purchaseDoc.data()
        setPendingPurchase(data)
        
        if (!data.accountLinked) {
          setShowAccountForm(true)
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Error loading purchase:', error)
    } finally {
      setLoading(false)
    }
  }

  const linkPurchaseToUser = async (userId: string) => {
    try {
      // Move from pending to user's purchases
      await setDoc(doc(db, 'users', userId, 'purchases', orderId!), {
        courseId: pendingPurchase.courseId,
        amount: pendingPurchase.amount,
        purchaseDate: pendingPurchase.createdAt,
        orderId: orderId,
        status: 'active'
      })
      
      // Mark as linked
      await setDoc(doc(db, 'pending_purchases', orderId!), {
        ...pendingPurchase,
        accountLinked: true,
        linkedUserId: userId,
        linkedAt: serverTimestamp()
      }, { merge: true })
      
      console.log('✅ Purchase linked to user')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error linking purchase:', error)
    }
  }

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setProcessing(true)

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        pendingPurchase.customerEmail,
        password
      )
      
      await updateProfile(userCred.user, {
        displayName: pendingPurchase.customerName
      })
      
      await setDoc(doc(db, 'users', userCred.user.uid), {
        name: pendingPurchase.customerName,
        email: pendingPurchase.customerEmail,
        phone: pendingPurchase.customerPhone,
        createdAt: serverTimestamp()
      })
      
      await linkPurchaseToUser(userCred.user.uid)
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already exists. Please login instead.')
        setIsLogin(true)
      } else {
        setError(err.message)
      }
    } finally {
      setProcessing(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setProcessing(true)

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        pendingPurchase.customerEmail,
        password
      )
      
      await linkPurchaseToUser(userCred.user.uid)
    } catch (err: any) {
      setError('Invalid password')
    } finally {
      setProcessing(false)
    }
  }

  const handleGoogleAuth = async () => {
    setError("")
    setProcessing(true)

    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ login_hint: pendingPurchase.customerEmail })
      
      const result = await signInWithPopup(auth, provider)
      
      await setDoc(doc(db, 'users', result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        createdAt: serverTimestamp()
      }, { merge: true })
      
      await linkPurchaseToUser(result.user.uid)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-yellow-600 animate-spin" />
      </div>
    )
  }

  if (!pendingPurchase) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  if (!showAccountForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-yellow-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        
        {/* Success Message */}
        <div className="bg-white border-2 border-green-300 rounded-2xl p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">Order ID: {orderId}</p>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-700">Amount Paid: ₹{pendingPurchase.amount}</p>
          </div>
        </div>

        {/* Account Creation Form */}
        <div className="bg-white border-2 border-yellow-300 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Login to Access' : 'Create Your Account'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isLogin ? 'Login with your password' : 'Set a password to access your course'}
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleCreateAccount} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={pendingPurchase.customerEmail}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isLogin ? 'Password' : 'Create Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isLogin ? 'Logging in...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Login & Access Course' : 'Create Account & Access Course'
              )}
            </Button>
          </form>

          <div className="my-4 text-center text-xs text-gray-500">OR</div>

          <Button
            onClick={handleGoogleAuth}
            disabled={processing}
            variant="outline"
            className="w-full border-2 border-gray-300 py-3"
          >
            Continue with Google
          </Button>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setPassword("")
              }}
              className="text-sm text-yellow-600 hover:underline"
            >
              {isLogin ? "Don't have an account? Create one" : 'Already have an account? Login'}
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