// Example: How to use the checkout modal in your course/PDF pages
// app/courses/[courseId]/page.tsx

"use client"

import { useState } from "react"
import { CheckoutModal } from "@/components/dashboard/payment/checkout-modal"
import { useRouter } from "next/navigation"

export default function CoursePage() {
  const router = useRouter()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Your course/product data
  const courseData = {
    itemId: "course_123", // Unique ID for this course
    itemName: "Complete Web Development Bootcamp",
    itemType: "course" as const, // "course" | "pdf" | "combo"
    amount: 2999,
    metadata: {
      thumbnail: "https://example.com/course-thumbnail.jpg",
      description: "Learn web development from scratch",
      courseUrl: "/courses/web-development", // Where to access after purchase
      duration: "40 hours",
      modules: 12
    }
  }

  const handleCheckout = async (customerInfo: {
    name: string
    email: string
    phone: string
  }) => {
    setIsProcessing(true)

    try {
      // Step 1: Create Cashfree order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: courseData.itemId,
          itemName: courseData.itemName,
          itemType: courseData.itemType,
          amount: courseData.amount,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          metadata: courseData.metadata
        })
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      console.log('✅ Order created:', orderData.orderId)

      // Step 2: Initialize Cashfree checkout
      const cashfree = await loadCashfree()
      
      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        returnUrl: `${window.location.origin}/payment/success?order_id=${orderData.orderId}`,
        redirectTarget: "_self" // Opens in same window
      }

      cashfree.checkout(checkoutOptions).then(() => {
        console.log('Cashfree checkout opened')
      })

    } catch (error: any) {
      console.error('❌ Checkout error:', error)
      alert(error.message || 'Failed to initiate payment')
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      {/* Your course UI */}
      <h1>{courseData.itemName}</h1>
      <p>Price: ₹{courseData.amount}</p>
      
      {/* Buy Button */}
      <button
        onClick={() => setIsCheckoutOpen(true)}
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg"
      >
        Buy Now - ₹{courseData.amount}
      </button>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => !isProcessing && setIsCheckoutOpen(false)}
        productName={courseData.itemName}
        amount={courseData.amount}
        onProceed={handleCheckout}
        isProcessing={isProcessing}
      />
    </div>
  )
}

// Load Cashfree SDK
function loadCashfree(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).Cashfree) {
      resolve((window as any).Cashfree)
      return
    }

    const script = document.createElement('script')
    script.src = process.env.CASHFREE_ENV === 'PROD'
      ? 'https://sdk.cashfree.com/js/v3/cashfree.js'
      : 'https://sdk.cashfree.com/js/v3/cashfree.sandbox.js'
    
    script.onload = () => {
      const cashfree = (window as any).Cashfree({
        mode: process.env.CASHFREE_ENV === 'PROD' ? 'production' : 'sandbox'
      })
      resolve(cashfree)
    }
    
    script.onerror = reject
    document.head.appendChild(script)
  })
}

/* ============================================================
   EXAMPLE 2: For PDF purchases
   ============================================================ */

export function PDFPurchaseExample() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const pdfData = {
    itemId: "pdf_456",
    itemName: "Cybersecurity Cheat Sheet 2024",
    itemType: "pdf" as const,
    amount: 499,
    metadata: {
      thumbnail: "https://example.com/pdf-cover.jpg",
      description: "Essential cybersecurity commands and concepts",
      downloadUrl: "https://storage.example.com/pdf/cybersec-cheatsheet.pdf",
      pages: 50,
      fileSize: "2.5 MB"
    }
  }

  // Same handleCheckout logic as above...

  return (
    <div>
      <button onClick={() => setIsCheckoutOpen(true)}>
        Download PDF - ₹{pdfData.amount}
      </button>
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productName={pdfData.itemName}
        amount={pdfData.amount}
        onProceed={(info) => {/* handleCheckout */}}
        isProcessing={false}
      />
    </div>
  )
}

/* ============================================================
   EXAMPLE 3: For Combo purchases
   ============================================================ */

export function ComboPurchaseExample() {
  const comboData = {
    itemId: "combo_789",
    itemName: "Ultimate Hacking Bundle (3 Courses + PDFs)",
    itemType: "combo" as const,
    amount: 4999,
    metadata: {
      thumbnail: "https://example.com/combo-bundle.jpg",
      description: "Complete ethical hacking bundle with courses and resources",
      includes: ["Course 1", "Course 2", "Course 3", "10 PDFs"],
      courseUrl: "/my-courses",
      totalValue: 12000
    }
  }

  // Same logic...
}