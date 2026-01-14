"use client"

import { Button } from "@/components/ui/button"

export function FinalCTASection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] text-balance mb-4">
            Ready To Take Your First Step Into Cybersecurity?
          </h2>

          <p className="text-lg text-gray-700">
            Start today. Learn clearly. Build confidently.
          </p>
        </div>

        <Button
          size="lg"
          className="
            px-10 h-14 
            bg-yellow-500 hover:bg-yellow-600 
            text-black font-semibold
            rounded-xl shadow-md
            transition-all
          "
        >
          Get The Starter Kit Now
        </Button>

        <div className="pt-6 space-y-2 text-sm text-gray-600">
          <p>✨ Instant PDF download • Beginner-friendly • Secure payment</p>
        </div>
      </div>
    </section>
  )
}
