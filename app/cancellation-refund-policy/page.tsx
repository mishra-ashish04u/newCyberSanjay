"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RefreshCw, XCircle, Clock, CheckCircle, AlertTriangle, Mail, Sparkles, DollarSign } from "lucide-react"

export default function CancellationRefundPolicyPage() {
  const policies = [
    {
      icon: Clock,
      title: "Immediate Cancellation",
      type: "timing",
      content: "Cancellation requests are considered only if made immediately after placing the order. Once we've communicated with vendors and shipping has begun, cancellations cannot be entertained."
    },
    {
      icon: XCircle,
      title: "Digital Products",
      type: "digital",
      content: "We do not accept cancellations for digital products like PDFs and online courses once they have been delivered or downloaded. However, refunds may be issued if you can establish quality issues."
    },
    {
      icon: AlertTriangle,
      title: "Damaged or Defective Items",
      type: "defect",
      content: "If you receive damaged or defective items, report it to our Customer Service team immediately. The complaint must be filed on the same day of receipt. We'll review and verify before processing replacements or refunds."
    },
    {
      icon: CheckCircle,
      title: "Product Not as Described",
      type: "mismatch",
      content: "If the product doesn't match the description or meet your expectations, notify our Customer Service team within the same day of receipt. We'll review your complaint and make an appropriate decision."
    },
    {
      icon: RefreshCw,
      title: "Manufacturer Warranty",
      type: "warranty",
      content: "For products that come with a manufacturer's warranty, please refer warranty-related issues directly to the respective manufacturer."
    },
    {
      icon: DollarSign,
      title: "Refund Processing",
      type: "refund",
      content: "Once a refund is approved, it will take approximately 1-2 business days to be processed and credited to your original payment method."
    }
  ]

  const typeColors: Record<string, string> = {
    timing: "from-blue-400 to-blue-500",
    digital: "from-purple-400 to-purple-500",
    defect: "from-orange-400 to-orange-500",
    mismatch: "from-green-400 to-green-500",
    warranty: "from-pink-400 to-pink-500",
    refund: "from-yellow-400 to-yellow-500"
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-yellow-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-950/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-950/20">
                <RefreshCw className="w-4 h-4 text-yellow-950" />
                <span className="text-sm font-medium text-yellow-950">Customer First</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-950 mb-6">
                Cancellation & Refund Policy
              </h1>
              
              <p className="text-xl md:text-2xl text-yellow-900 max-w-3xl mx-auto mb-8 leading-relaxed">
                We're committed to your satisfaction. Here's our fair and transparent refund policy.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-yellow-900">
                <div className="w-2 h-2 bg-yellow-950 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Last updated: January 10, 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl border border-yellow-200 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-4">
                  Our Commitment
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  At <span className="font-semibold text-yellow-950">Cyber Sanjay</span>, we believe in helping our customers 
                  as much as possible. That's why we maintain a liberal and fair cancellation and refund policy.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                  <p className="text-slate-700 font-medium">
                    💡 Please read this policy carefully to understand your rights and our procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-yellow-300 rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-yellow-950 mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Quick Summary
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border border-yellow-200 shadow-sm">
                <p className="text-3xl font-bold text-yellow-600 mb-2">⚡</p>
                <p className="font-semibold text-yellow-950 mb-1">Act Fast</p>
                <p className="text-sm text-slate-600">Cancel immediately after ordering</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-yellow-200 shadow-sm">
                <p className="text-3xl font-bold text-yellow-600 mb-2">📧</p>
                <p className="font-semibold text-yellow-950 mb-1">Same Day</p>
                <p className="text-sm text-slate-600">Report issues on day of receipt</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-yellow-200 shadow-sm">
                <p className="text-3xl font-bold text-yellow-600 mb-2">💳</p>
                <p className="font-semibold text-yellow-950 mb-1">1-2 Days</p>
                <p className="text-sm text-slate-600">Refund processing time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Details */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-950 mb-3">
              Policy Details
            </h2>
            <p className="text-slate-600 text-lg">
              Everything you need to know about cancellations and refunds
            </p>
          </div>

          <div className="grid gap-6">
            {policies.map((policy, idx) => {
              const Icon = policy.icon
              
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-lg border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${typeColors[policy.type]} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-full">
                          {idx + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-950">
                          {policy.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-700 leading-relaxed">
                        {policy.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Important Notes */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-8 md:p-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-6">
                  Important Notes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-600 text-sm font-bold">!</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900">Digital Products:</span> Once PDFs or online courses 
                      are delivered/downloaded, cancellations are not accepted unless there's a quality issue.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-600 text-sm font-bold">!</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900">Reporting Timeline:</span> All complaints must be 
                      reported on the same day of product receipt for them to be considered.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-600 text-sm font-bold">!</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900">Refund Method:</span> All approved refunds will be 
                      credited to your original payment method within 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Process */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 md:p-10 text-yellow-950 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <RefreshCw className="w-8 h-8" />
              Refund Process
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mb-3">1</div>
                <p className="font-semibold mb-2">Contact Us</p>
                <p className="text-sm text-yellow-900">Report issue via email</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mb-3">2</div>
                <p className="font-semibold mb-2">Review</p>
                <p className="text-sm text-yellow-900">We verify your claim</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mb-3">3</div>
                <p className="font-semibold mb-2">Approval</p>
                <p className="text-sm text-yellow-900">Refund decision made</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mb-3">4</div>
                <p className="font-semibold mb-2">Processing</p>
                <p className="text-sm text-yellow-900">1-2 days to account</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <div className="relative overflow-hidden bg-gradient-to-r from-yellow-950 to-yellow-900 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-6">
                <Mail className="w-8 h-8 text-yellow-950" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Help with a Refund?
              </h2>
              <p className="text-yellow-200 text-lg mb-8 max-w-2xl mx-auto">
                Our customer service team is ready to assist you with cancellations, refunds, or any concerns.
              </p>
              
              <a
                href="mailto:support@cybersanjay.com"
                className="inline-flex items-center gap-3 bg-yellow-400 text-yellow-950 px-8 py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all"
              >
                <Mail className="w-6 h-6" />
                support@cybersanjay.com
              </a>
              
              <p className="text-yellow-300 text-sm mt-6">
                ⚡ We typically respond within 24-48 hours
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}