"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Is this beginner-friendly?",
    answer: "Yes. It's designed for absolute beginners.",
  },
  {
    question: "Is this a video course?",
    answer: "No. You'll receive downloadable PDF guides.",
  },
  {
    question: "Do I need coding?",
    answer: "No. Not for beginners.",
  },
  {
    question: "How do I get the files?",
    answer: "You'll receive instant access after payment.",
  },
  {
    question: "Can I use this resume for internships?",
    answer: "Yes — it's built specially for students & freshers.",
  },
  {
    question: "Do the PDFs expire?",
    answer: "No. You keep them forever.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-yellow-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left
                           hover:bg-yellow-50 transition"
              >
                <span className="font-semibold text-[#1F2937]">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`w-5 h-5 text-yellow-600 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-200">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
