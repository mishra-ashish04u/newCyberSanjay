"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {

  const handleBuyNow = async () => {
    try {
      const res = await fetch("/api/instamojo/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: "149",
          purpose: "Cybersecurity Starter Bundle",
          email: "customer@email.com", // later you can ask user email
        }),
      })

      const data = await res.json()

      if (data.success && data.payment_url) {
        window.location.href = data.payment_url
      } else {
        alert("Unable to start payment. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover
                  brightness-110 contrast-110 saturate-125 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 pointer-events-none" />

      {/* 🔤 Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Your First Step Into Cybersecurity
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6">
              Learn the core cybersecurity basics in just 7 days and understand how ethical hacking really works — step by step.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-100 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>No prior experience needed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Learn step-by-step</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Beginner-friendly guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Build a cybersecurity-ready resume</span>
              </div>
            </div>
          </div>

          {/* ✅ PAYMENT BUTTON */}
          <Button
            size="lg"
            onClick={handleBuyNow}
            className="px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Get The Complete Starter Bundle — ₹149
          </Button>

          <div className="flex flex-col gap-2 items-center">
            <p className="text-sm text-gray-300">
              Instant PDF download after payment • Secure Instamojo Checkout
            </p>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Created by Cyber Sanjay</span> — cybersecurity educator
              trusted by thousands of learners
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
