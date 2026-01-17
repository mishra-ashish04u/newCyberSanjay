"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, Database, Users, Cookie, FileCheck, Mail, ArrowRight, Sparkles } from "lucide-react"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "collection",
      icon: Database,
      title: "What We Collect",
      description: "The information we gather to provide you the best experience",
      items: [
        "Email address and name for account creation",
        "Profile information (education, skills, career goals)",
        "Community posts and comments you create",
        "Payment details (securely processed by Cashfree)",
        "Usage analytics and interaction data"
      ]
    },
    {
      id: "usage",
      icon: Eye,
      title: "How We Use Your Data",
      description: "Making your learning journey smooth and personalized",
      items: [
        "Deliver course content and community features",
        "Process payments and manage purchases",
        "Send important updates about your account",
        "Improve platform experience and features",
        "Comply with legal obligations"
      ]
    },
    {
      id: "security",
      icon: Lock,
      title: "Data Security",
      description: "Your data is protected with industry-leading security",
      items: [
        "End-to-end encryption for sensitive data",
        "Secure cloud storage with Firebase/Firestore",
        "Regular security audits and updates",
        "No credit card data stored on our servers",
        "Two-factor authentication available"
      ]
    },
    {
      id: "sharing",
      icon: Users,
      title: "Data Sharing",
      description: "We only work with trusted partners",
      items: [
        "Payment processors (Cashfree) for transactions",
        "Email service providers for notifications",
        "Analytics tools to improve user experience",
        "We never sell your personal information",
        "Third parties are bound by confidentiality"
      ]
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "Cookies & Tracking",
      description: "Small files that enhance your browsing experience",
      items: [
        "Essential cookies for site functionality",
        "Analytics cookies (Google Analytics)",
        "Authentication cookies to keep you logged in",
        "Preference cookies for your settings",
        "You can manage cookies in browser settings"
      ]
    },
    {
      id: "rights",
      icon: FileCheck,
      title: "Your Rights",
      description: "You're in control of your personal information",
      items: [
        "Access your personal data anytime",
        "Request data correction or deletion",
        "Export your data in portable format",
        "Opt-out of marketing communications",
        "Lodge a complaint with authorities"
      ]
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
                <Sparkles className="w-4 h-4 text-yellow-950" />
                <span className="text-sm font-medium text-yellow-950">Transparency First</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-950 mb-6">
                Privacy Policy
              </h1>
              
              <p className="text-xl md:text-2xl text-yellow-900 max-w-3xl mx-auto mb-8 leading-relaxed">
                Your trust matters. Here's how we protect and respect your personal information.
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
                <Shield className="w-7 h-7 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-4">
                  Our Commitment to You
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  At <span className="font-semibold text-yellow-950">Cyber Sanjay</span>, we believe privacy is a fundamental right. 
                  This policy outlines how we collect, use, and protect your data when you use our courses, 
                  community, and content.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                  <p className="text-slate-700 font-medium">
                    💡 By using our platform, you agree to this policy. We encourage you to read it carefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Sections */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid gap-8">
            {sections.map((section, idx) => {
              const Icon = section.icon
              
              return (
                <div
                  key={section.id}
                  className="group bg-white rounded-3xl shadow-lg border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all p-8 md:p-10"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-yellow-950" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                          {idx + 1}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-yellow-950">
                          {section.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-600 mb-6 text-lg">
                        {section.description}
                      </p>
                      
                      <div className="space-y-3">
                        {section.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-3 group/item">
                            <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-yellow-200 transition-colors">
                              <ArrowRight className="w-4 h-4 text-yellow-700" />
                            </div>
                            <p className="text-slate-700 leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Additional Info Cards */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Data Retention */}
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 md:p-10 text-yellow-950 shadow-xl">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Data Retention</h3>
              <p className="text-yellow-900 leading-relaxed">
                We keep your data only as long as needed to provide services and meet legal requirements. 
                Request deletion anytime through your account settings.
              </p>
            </div>

            {/* Age Requirement */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-yellow-200 shadow-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-yellow-700" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-950 mb-3">Age Requirement</h3>
              <p className="text-slate-700 leading-relaxed">
                Our platform is for users 13+. We don't knowingly collect data from children under 13. 
                Parents can contact us to request removal.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Updates */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-8 md:p-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-4">
                  Policy Updates
                </h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  We may update this policy to reflect changes in practices, technology, or legal requirements. 
                  When we make significant changes, you'll be notified via:
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <p className="font-semibold text-yellow-950 mb-1">📧 Email</p>
                    <p className="text-sm text-slate-600">Direct notification</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <p className="font-semibold text-yellow-950 mb-1">🔔 Platform</p>
                    <p className="text-sm text-slate-600">Prominent notice</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <p className="font-semibold text-yellow-950 mb-1">📅 Date</p>
                    <p className="text-sm text-slate-600">Updated timestamp</p>
                  </div>
                </div>
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
                Have Questions?
              </h2>
              <p className="text-yellow-200 text-lg mb-8 max-w-2xl mx-auto">
                Our team is here to help. Reach out if you have concerns about your privacy or data.
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