"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Shield, CreditCard, AlertCircle, Globe, Scale, Mail, Sparkles, CheckCircle } from "lucide-react"

export default function TermsAndConditionsPage() {
  const termsSections = [
    {
      icon: CheckCircle,
      title: "Account Registration",
      content: "To access and use our Services, you agree to provide true, accurate and complete information during registration. You're responsible for all activities conducted through your account."
    },
    {
      icon: AlertCircle,
      title: "No Warranties",
      content: "We don't guarantee the accuracy, timeliness, or completeness of information on our platform. You acknowledge that materials may contain errors, and we exclude liability to the fullest extent permitted by law."
    },
    {
      icon: Shield,
      title: "Use at Your Own Risk",
      content: "Your use of our Services is at your own risk. You must independently assess whether the Services meet your requirements before use."
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content: "All content on this website is proprietary to Cyber Sanjay. You have no authority to claim any intellectual property rights, title, or interest in our content."
    },
    {
      icon: AlertCircle,
      title: "Unauthorized Use",
      content: "Unauthorized use of our website or Services may lead to action against you as per these Terms or applicable laws."
    },
    {
      icon: CreditCard,
      title: "Payment Obligation",
      content: "You agree to pay all charges associated with the Services you purchase. All transactions are binding and enforceable contracts."
    },
    {
      icon: Scale,
      title: "Lawful Use Only",
      content: "You agree not to use our platform for any unlawful, illegal, or forbidden purpose under these Terms or Indian laws applicable to you."
    },
    {
      icon: Globe,
      title: "Third-Party Links",
      content: "Our website may contain links to third-party websites. When you access these links, you'll be governed by their respective terms, privacy policies, and other policies."
    },
    {
      icon: CreditCard,
      title: "Refund Eligibility",
      content: "You're entitled to a refund if we cannot provide the Service. Refund timelines follow our refund policy. Claims must be raised within the stipulated time period to remain eligible."
    },
    {
      icon: AlertCircle,
      title: "Force Majeure",
      content: "Neither party shall be liable for failure to perform obligations if prevented or delayed by events beyond reasonable control (force majeure)."
    },
    {
      icon: Scale,
      title: "Governing Law",
      content: "These Terms are governed by and construed in accordance with the laws of India. All disputes are subject to the exclusive jurisdiction of courts in Noida, Uttar Pradesh."
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: "All concerns or communications relating to these Terms must be sent to us using the contact information provided on this website."
    }
  ]

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
                <Scale className="w-4 h-4 text-yellow-950" />
                <span className="text-sm font-medium text-yellow-950">Legal Agreement</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-950 mb-6">
                Terms & Conditions
              </h1>
              
              <p className="text-xl md:text-2xl text-yellow-900 max-w-3xl mx-auto mb-8 leading-relaxed">
                Please read these terms carefully before using our platform and services.
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
                <FileText className="w-7 h-7 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-4">
                  Legal Agreement
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  These Terms and Conditions, along with our Privacy Policy, constitute a binding agreement between{" "}
                  <span className="font-semibold text-yellow-950">Cyber Sanjay</span> ("we", "us", "our") and you ("you", "your") 
                  regarding your use of our website, courses, community, and services.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                  <p className="text-slate-700 font-medium">
                    ⚖️ By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-yellow-300 rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-950 mb-2">Important Notice</h3>
                <p className="text-slate-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time without prior notice. It's your responsibility 
                  to periodically review these Terms to stay informed of updates. Continued use of our platform after 
                  changes constitutes acceptance of the modified Terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Grid */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-950 text-center mb-3">
              Terms of Use
            </h2>
            <p className="text-center text-slate-600 text-lg">
              The following terms apply to your use of our website and services
            </p>
          </div>

          <div className="grid gap-6">
            {termsSections.map((term, idx) => {
              const Icon = term.icon
              
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-lg border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-yellow-950" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-full">
                          {idx + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-950">
                          {term.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-700 leading-relaxed">
                        {term.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Key Highlights */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-8 md:p-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-6">
                  Key Highlights
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                    <p className="font-semibold text-yellow-950 mb-2">✅ Binding Contract</p>
                    <p className="text-sm text-slate-600">Initiating a transaction creates a legally binding agreement</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                    <p className="font-semibold text-yellow-950 mb-2">🇮🇳 Indian Law</p>
                    <p className="text-sm text-slate-600">Governed by laws of India, jurisdiction in Noida, UP</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                    <p className="font-semibold text-yellow-950 mb-2">💳 Payment Required</p>
                    <p className="text-sm text-slate-600">You agree to pay all charges for Services availed</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                    <p className="font-semibold text-yellow-950 mb-2">⚠️ Your Responsibility</p>
                    <p className="text-sm text-slate-600">Account security and lawful use is your responsibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jurisdiction */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 md:p-10 text-yellow-950 shadow-xl">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Jurisdiction</h3>
              <p className="text-yellow-900 leading-relaxed">
                All disputes shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh, India.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-yellow-200 shadow-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-yellow-700" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-950 mb-3">Governing Law</h3>
              <p className="text-slate-700 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of India.
              </p>
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
                Questions About These Terms?
              </h2>
              <p className="text-yellow-200 text-lg mb-8 max-w-2xl mx-auto">
                If you have any concerns or need clarification about these Terms & Conditions, we're here to help.
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