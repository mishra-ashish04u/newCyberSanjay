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
    <section id="faq" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-muted/50 transition"
              >
                <span className="font-semibold text-foreground text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-muted/30 border-t border-border">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
