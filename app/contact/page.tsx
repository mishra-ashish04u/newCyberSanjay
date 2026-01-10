"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Send,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Replace with real API later
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <>
      <Header />

      <main className="bg-yellow-50 min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* Page Intro */}
            <div className="text-center mb-12 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#ffda6a] flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-slate-900" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">
                Contact Us
              </h1>
              <p className="text-slate-600 max-w-md mx-auto">
                Have a question, need support, or want to reach out?
                You can contact us using the form below or the official details provided.
              </p>

              {/* Last updated */}
              <p className="text-xs text-slate-500 pt-2">
                Last updated on 10-01-2026 14:58:14
              </p>
            </div>

            {/* Contact Form */}
            <Card className="border-2 border-[#ffda6a] shadow-2xl bg-white mb-12">
              <CardContent className="p-8 md:p-12 space-y-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="Your full name"
                        className="h-12 border-slate-300 focus:border-[#ffda6a] focus:ring-[#ffda6a]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="h-12 border-slate-300 focus:border-[#ffda6a] focus:ring-[#ffda6a]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">
                        Subject *
                      </label>
                      <Input
                        required
                        placeholder="Product, Mentorship, Support, Feedback"
                        className="h-12 border-slate-300 focus:border-[#ffda6a] focus:ring-[#ffda6a]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Write your message here..."
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ffda6a] focus:border-[#ffda6a]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#ffda6a] hover:bg-[#ffd04a] text-slate-900 font-semibold h-14 text-lg rounded-xl disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 w-5 h-5" />
                    </Button>

                    <p className="text-center text-sm text-slate-500">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Message Sent Successfully
                    </h3>
                    <p className="text-slate-600">
                      Thanks for contacting us. We’ll get back to you shortly.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Official Contact Details */}
            <section className="bg-yellow-100 border border-yellow-200 rounded-xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Official Contact Information
              </h2>

              <div className="space-y-4 text-slate-800 text-sm">

                <p>
                  <strong>Merchant Legal Entity Name:</strong> Cyber Sanjay
                </p>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-slate-700" />
                  <div>
                    <p>
                      <strong>Registered Address:</strong><br />
                      Shushila Bhavan, Noida, Uttar Pradesh, PIN: 201304
                    </p>
                    <p className="mt-2">
                      <strong>Operational Address:</strong><br />
                      Shushila Bhavan, Noida, Uttar Pradesh, PIN: 201304
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-700" />
                  <p>
                    <strong>Telephone:</strong> 8423356441
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-700" />
                  <p>
                    <strong>Email:</strong> sanjay70023@gmail.com
                  </p>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
