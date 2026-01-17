"use client"

import { useState } from "react"
import { HelpCircle, ChevronDown, Star, Quote } from "lucide-react"

export function FAQTestimonialsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Who are these courses for?",
      answer: "Complete beginners with zero experience. If you can use a computer, you're ready to start!"
    },
    {
      question: "What's included in the courses?",
      answer: "PDF guides, step-by-step instructions, hands-on labs, and lifetime access with free updates."
    },
    {
      question: "How long does it take to complete?",
      answer: "About 1-2 hours daily for a week, but you have lifetime access to learn at your own pace."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes! 7-day money-back guarantee, no questions asked if you're not satisfied."
    },
    {
      question: "Is the community really free?",
      answer: "100% free forever. No hidden fees, no credit card needed. Join 500+ learners today."
    },
    {
      question: "What software do I need?",
      answer: "Just free, open-source tools. No expensive software required—only a computer and internet."
    }
  ]

  const testimonials = [
    {
      name: "Rahul Kumar",
      role: "Security Analyst Intern",
      image: "RK",
      rating: 5,
      text: "Went from zero to landing my first cybersecurity internship in 6 months. Best decision ever!",
      color: "from-blue-400 to-blue-500"
    },
    {
      name: "Priya Singh",
      role: "College Student",
      image: "PS",
      rating: 5,
      text: "Complex topics explained simply. The community support is incredible. Highly recommend!",
      color: "from-purple-400 to-purple-500"
    },
    {
      name: "Amit Sharma",
      role: "Bug Bounty Hunter",
      image: "AS",
      rating: 5,
      text: "Now earning through bug bounties thanks to the hands-on approach. Worth every rupee!",
      color: "from-green-400 to-green-500"
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq-testimonials-section"
      className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-gradient-to-b from-yellow-50 to-yellow-100"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Testimonials Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Student Success</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              What Students Say
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Join 1,000+ satisfied learners
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border-2 border-yellow-200 hover:border-yellow-400"
              >
                <Quote className="w-6 h-6 text-yellow-400 mb-3" />
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-xs">{testimonial.image}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Card */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-black text-black" />
                ))}
              </div>
              <span className="text-3xl font-bold text-black">4.8/5</span>
            </div>
            <p className="text-sm text-black/80 font-semibold">
              Based on 200+ verified reviews
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Everything you need to know before starting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl transition-all border-2 ${
                  openIndex === index 
                    ? "border-yellow-400 shadow-lg" 
                    : "border-yellow-200 hover:border-yellow-300 shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between p-5 text-left"
                >
                  <span className="font-bold text-gray-900 text-sm sm:text-base pr-3 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openIndex === index 
                      ? "bg-yellow-400 rotate-180" 
                      : "bg-gray-100"
                  }`}>
                    <ChevronDown className="w-5 h-5 text-gray-900" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5">
                    <div className="border-t border-yellow-100 pt-3">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}