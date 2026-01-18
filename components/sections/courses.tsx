"use client"

import { CheckCircle, Sparkles, Shield, FileText, Zap } from "lucide-react"
import { CheckoutButton } from "@/components/payment/checkout-button"
// Define your products
const PRODUCTS = {
  starterKit: {
    id: 'starter-kit',
    name: 'Starter Kit - Ethical Hacking Roadmap',
    amount: 99,
    description: '7-Day ethical hacking roadmap PDF with training guidance'
  },
  resumePack: {
    id: 'resume-pack',
    name: 'Resume Pack - Professional Templates',
    amount: 99,
    description: 'Professional resume templates with sample points'
  },
  bundle: {
    id: 'complete-bundle',
    name: 'Complete Bundle - Both Courses',
    amount: 149,
    description: 'Both PDF courses with lifetime access and priority support'
  }
}

export function CoursesSection() {
  return (
    <section
      id="courses-section"
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-b from-yellow-50 to-yellow-100"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Premium Courses</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Start Your Cybersecurity Journey
          </h2>
          
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
            Beginner-friendly courses designed to get you job-ready
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          
          {/* Card 1: Starter Kit */}
          <div className="bg-white border-2 border-yellow-300 rounded-xl p-5 sm:p-6 flex flex-col hover:border-yellow-500 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Starter Kit
              </h3>
            </div>

            <div className="mb-3">
              <span className="text-3xl font-bold text-yellow-600">₹99</span>
            </div>

            <ul className="space-y-2 mb-4 flex-grow text-sm">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>7-Day ethical hacking roadmap PDF</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Training guidance & labs PDF</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Lifetime access & updates</span>
              </li>
            </ul>

            <CheckoutButton
              product={PRODUCTS.starterKit}
              className="w-full border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-semibold py-5 rounded-lg text-sm"
            >
              Buy Now — ₹99
            </CheckoutButton>
          </div>

          {/* Card 2: Resume Pack */}
          <div className="bg-white border-2 border-yellow-300 rounded-xl p-5 sm:p-6 flex flex-col hover:border-yellow-500 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Resume Pack
              </h3>
            </div>

            <div className="mb-3">
              <span className="text-3xl font-bold text-yellow-600">₹99</span>
            </div>

            <ul className="space-y-2 mb-4 flex-grow text-sm">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Professional resume templates PDF</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Sample resume points PDF</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Career guidance PDF included</span>
              </li>
            </ul>

            <CheckoutButton
              product={PRODUCTS.resumePack}
              className="w-full border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-semibold py-5 rounded-lg text-sm"
            >
              Buy Now — ₹99
            </CheckoutButton>
          </div>

          {/* Card 3: Bundle (BEST VALUE) */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 border-2 border-yellow-600 rounded-xl p-5 sm:p-6 flex flex-col hover:shadow-xl transition-all duration-300 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-yellow-400 px-4 py-1 rounded-full text-xs font-bold">
              ⭐ BEST VALUE
            </div>

            <div className="flex items-center gap-3 mb-3 mt-1">
              <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-black">
                Complete Bundle
              </h3>
            </div>

            <div className="mb-2">
              <span className="text-3xl font-bold text-black">₹149</span>
              <span className="text-lg text-black/60 line-through ml-2">₹198</span>
            </div>
            <p className="text-xs font-semibold text-black/80 mb-3">
              💰 Save ₹49
            </p>

            <ul className="space-y-2 mb-4 flex-grow text-sm">
              <li className="flex items-start gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Both PDF courses included</span>
              </li>
              <li className="flex items-start gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                <span>Lifetime PDF access</span>
              </li>
              <li className="flex items-start gap-2 text-black">
                <CheckCircle className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                <span>Free updates & priority support</span>
              </li>
            </ul>

            <CheckoutButton
              product={PRODUCTS.bundle}
              className="w-full bg-black hover:bg-gray-900 text-yellow-400 font-bold py-5 rounded-lg shadow-lg text-sm"
            >
              Buy Now — ₹149
            </CheckoutButton>
          </div>

        </div>

        {/* Trust Signals */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Money-back Guarantee</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}