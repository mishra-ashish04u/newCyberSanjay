"use client"

import { Button } from "@/components/ui/button"

const INSTAMOJO_LINKS = {
  starter: "https://imjo.in/qHMH9F",
  resume: "https://imjo.in/rgVWWV",
  bundle: "https://imjo.in/q6AHM8",
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-16 text-center">
          Choose Your Bundle
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter Kit */}
          <div className="bg-white border border-yellow-200 rounded-xl p-8 flex flex-col shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-2">
              7-Day Ethical Hacking Starter Kit
            </h3>

            <p className="text-3xl font-bold text-yellow-600 mb-6">
              ₹99
            </p>

            <ul className="space-y-3 text-sm text-gray-700 mb-8 flex-grow">
              <li>• Beginner roadmap</li>
              <li>• Training guidance</li>
              <li>• Labs & exercises</li>
            </ul>

            <Button
              variant="outline"
              className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50"
              onClick={() => (window.location.href = INSTAMOJO_LINKS.starter)}
            >
              Get The Starter Kit — ₹99
            </Button>
          </div>

          {/* Resume Pack */}
          <div className="bg-white border border-yellow-200 rounded-xl p-8 flex flex-col shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-2">
              Cybersecurity Resume Booster Pack
            </h3>

            <p className="text-3xl font-bold text-yellow-600 mb-6">
              ₹99
            </p>

            <ul className="space-y-3 text-sm text-gray-700 mb-8 flex-grow">
              <li>• Resume template</li>
              <li>• Sample points</li>
              <li>• Beginner-friendly guidance</li>
            </ul>

            <Button
              variant="outline"
              className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50"
              onClick={() => (window.location.href = INSTAMOJO_LINKS.resume)}
            >
              Get The Resume Pack — ₹99
            </Button>
          </div>

          {/* Best Value Bundle */}
          <div className="bg-white border-2 border-yellow-500 rounded-xl p-8 flex flex-col relative shadow-md">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
              Best Value
            </div>

            <h3 className="text-xl font-bold text-[#1F2937] mb-2">
              Complete Starter Bundle
            </h3>

            <p className="text-3xl font-bold text-yellow-600 mb-1">
              ₹149
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Includes BOTH
            </p>

            <ul className="space-y-3 text-sm text-gray-700 mb-8 flex-grow">
              <li>• 7-Day Ethical Hacking Starter Kit</li>
              <li>• Resume Booster Pack</li>
              <li>• Lifetime PDF access</li>
              <li className="font-semibold">• Save ₹49</li>
            </ul>

            <Button
              size="lg"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl"
              onClick={() => (window.location.href = INSTAMOJO_LINKS.bundle)}
            >
              Get The Complete Bundle — ₹149
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-10">
          Instant PDF download • Secure Instamojo Payment • Keep forever
        </p>
      </div>
    </section>
  )
}
