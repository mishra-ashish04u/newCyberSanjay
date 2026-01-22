"use client"

import { useState } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function TestPurchasePage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const testPurchase = async () => {
    setLoading(true)
    setResult('Creating test purchase...')

    try {
      // Step 1: Create order
      const response = await fetch('/api/payment/mock-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'Test User',
          phone: '9876543210',
          itemId: 'course_react_2024',
          itemName: 'React Bootcamp 2024',
          itemType: 'course',
          amount: 2999,
          metadata: {
            courseUrl: '/courses/react-bootcamp',
            githubPath: 'courses/react-bootcamp',
            thumbnail: '/images/react-thumb.jpg'
          }
        })
      })

      const data = await response.json()
      console.log('API Response:', data)

      if (!data.success) {
        throw new Error(data.error)
      }

      setResult('✅ Order created! Saving to Firestore...')

      // Step 2: Save to Firestore
      await setDoc(doc(db, 'pending_purchases', data.orderId), {
        ...data.purchaseData,
        createdAt: serverTimestamp()
      })

      setResult('✅ Purchase saved! Redirecting...')
      console.log('✅ Redirecting to:', data.redirectUrl)

      // Step 3: Redirect after 1 second
      setTimeout(() => {
        window.location.href = data.redirectUrl
      }, 1000)

    } catch (error: any) {
      console.error('❌ Error:', error)
      setResult(`❌ Error: ${error.message}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🧪 Test Purchase Flow
        </h1>
        
        <p className="text-gray-600 mb-6">
          This will simulate a complete purchase without payment gateway
        </p>

        {result && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6 text-sm text-left">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        <button
          onClick={testPurchase}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Processing...' : '🚀 Start Test Purchase'}
        </button>

        <p className="text-xs text-gray-500 mt-4">
          This will create a test order and redirect to success page
        </p>
      </div>
    </div>
  )
}