"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Send, CheckCircle2, Mail, MessageCircle, Sparkles } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields")
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        alert(data.error || 'Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-yellow-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-950/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-950/20">
                <MessageCircle className="w-4 h-4 text-yellow-950" />
                <span className="text-sm font-medium text-yellow-950">We're Here to Help</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-950 mb-6">
                Get in Touch
              </h1>
              
              <p className="text-xl md:text-2xl text-yellow-900 max-w-3xl mx-auto leading-relaxed">
                Have a question, need support, or want to reach out? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-4xl mx-auto px-4 -mt-12 relative z-10 pb-20">
          <div className="bg-white rounded-3xl shadow-2xl border border-yellow-200 p-8 md:p-12">
            
            {!submitted ? (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-slate-600">
                      Fill out the form below and we'll get back to you within 24-48 hours
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      placeholder="e.g., Course Inquiry, Support Request, Partnership"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-950 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-yellow-950/30 border-t-yellow-950 rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-center text-sm text-slate-500">
                    🔒 We respect your privacy. Your information is safe with us.
                  </p>
                </div>
              </>
            ) : (
              // Success Message
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-950 mb-4">
                  Message Sent Successfully!
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                  Thank you for reaching out. We've received your message and will get back to you within 24-48 hours.
                </p>
                
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: "", email: "", subject: "", message: "" })
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold rounded-xl transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-3">
              Other Ways to Reach Us
            </h2>
            <p className="text-slate-600">Choose the method that works best for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-8 text-center hover:shadow-xl hover:border-yellow-400 transition-all">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-yellow-950 mb-2">Email Support</h3>
              <p className="text-slate-600 mb-4">For detailed inquiries and support</p>
              <a
                href="mailto:support@cybersanjay.com"
                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                support@cybersanjay.com
                <Send className="w-4 h-4" />
              </a>
            </div>

            {/* Response Time Card */}
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl shadow-lg p-8 text-center text-yellow-950">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Response</h3>
              <p className="text-yellow-900 mb-4">We typically respond within</p>
              <div className="text-3xl font-bold">24-48 Hours</div>
            </div>
          </div>
        </section>

        {/* FAQ Suggestion */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-3xl p-8 md:p-10 text-center">
            <h3 className="text-2xl font-bold text-yellow-950 mb-3">
              Looking for Quick Answers?
            </h3>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              Check out our FAQ section or browse our help documentation for instant answers to common questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/blogs">
                <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
                  Browse Blogs
                </button>
              </a>
              <a href="/community">
                <button className="px-6 py-3 bg-white hover:bg-yellow-50 text-yellow-950 font-semibold rounded-xl border-2 border-yellow-400 hover:border-yellow-500 shadow-md hover:shadow-lg transition-all">
                  Join Community
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}