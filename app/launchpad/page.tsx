"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Rocket,
  CheckCircle2,
  FileText,
  Users,
  AlertTriangle,
  Pizza,
  Heart,
  Send,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CyberSecurityLaunchPage() {
  const START_COUNT = 1

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
  })

  const [learnerCount, setLearnerCount] = useState<number>(START_COUNT)
  const [targetCount] = useState<number>(127) // choose any number

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 🔹 Fetch real visitor count (once on page load)
  // useEffect(() => {
  //   const fetchVisitors = async () => {
  //     try {
  //       const res = await fetch("/api/visit")
  //       const data = await res.json()
  //       setTargetCount(data.visitors)
  //     } catch (error) {
  //       console.error("Failed to fetch visitor count")
  //     }
  //   }

  //   fetchVisitors()
  // }, [])

  // 🔹 Animate from 1 → real visitor count
  useEffect(() => {
    if (targetCount === null) return

    let current = START_COUNT
    const increment = Math.max(1, Math.floor((targetCount - START_COUNT) / 30))

    const interval = setInterval(() => {
      current += increment

      if (current >= targetCount) {
        current = targetCount
        clearInterval(interval)
      }

      setLearnerCount(current)
    }, 30)

    return () => clearInterval(interval)
  }, [targetCount])

  // 🔹 Form submit (NO visitor count logic here)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit form")

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
  <>
    <Header />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50/50 to-amber-50">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge className="bg-[#ffda6a] text-slate-900 hover:bg-[#ffda6a]/90 px-4 py-1.5 text-sm font-medium">
                <Users className="w-4 h-4 mr-1.5 inline" />
                {learnerCount} learners already joined
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight text-balance">
                Start Your Cybersecurity Journey — In Just 7 Days
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 text-balance max-w-2xl mx-auto">
                A beginner-friendly 7-day ethical hacking starter kit + cybersecurity
                resume booster pack — launching soon.
              </p>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-[#ffda6a] hover:bg-[#ffd04a] text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() =>
                    document
                      .getElementById("early-access")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Early Access
                  <Rocket className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-sm text-slate-600 mt-4 flex items-center justify-center gap-1.5 font-medium">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  First 200 students get a special launch price
                </p>
              </div>
            </div>
          </section>

          {/* Why This Exists Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-[#ffda6a] shadow-xl bg-white/90 backdrop-blur">
                <CardContent className="p-8 md:p-12 space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-20 bg-[#ffda6a] rounded-full flex-shrink-0" />
                    <div className="space-y-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Why This Exists</h2>

                      <p className="text-lg text-slate-700 leading-relaxed">
                        A lot of beginners want to learn cybersecurity… but they end up confused, overwhelmed, and stuck.
                      </p>

                      <p className="text-lg text-slate-700 leading-relaxed">
                        So I'm creating something small, simple, and affordable — that helps you take your first confident
                        step into ethical hacking.
                      </p>

                      <div className="pt-4 space-y-3">
                        <p className="text-base font-medium text-slate-900">Designed especially for:</p>
                        <div className="flex flex-wrap gap-3">
                          <Badge
                            variant="secondary"
                            className="bg-[#ffda6a]/20 text-slate-900 px-4 py-2 text-sm border border-[#ffda6a]"
                          >
                            Students
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-[#ffda6a]/20 text-slate-900 px-4 py-2 text-sm border border-[#ffda6a]"
                          >
                            Beginners
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-[#ffda6a]/20 text-slate-900 px-4 py-2 text-sm border border-[#ffda6a]"
                          >
                            Self-learners
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What You Get Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What You Get</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* 7-Day Kit */}
                <Card className="border-2 border-[#ffda6a] shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#ffda6a] flex items-center justify-center">
                      <Shield className="w-7 h-7 text-slate-900" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-900">7-Day Ethical Hacking Starter Kit</h3>

                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Daily step-by-step tasks</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Beginner-friendly labs</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Clear guidance</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>No fluff</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Resume Booster */}
                <Card className="border-2 border-[#ffda6a] shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#ffda6a] flex items-center justify-center">
                      <FileText className="w-7 h-7 text-slate-900" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-900">Cybersecurity Resume Booster Pack</h3>

                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Templates</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Profile keywords</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Project ideas</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Internship-ready structure</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Trust Anchor - From Sanjay */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-[#ffda6a] shadow-xl bg-gradient-to-br from-white to-amber-50">
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#ffda6a] flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src="/favicon_io/favicon-32x32.png"
                            alt="Sanjay"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>


                      <h3 className="text-xl font-bold text-slate-900">
                        A small note from Sanjay Singh
                      </h3>
                    </div>

                    <p className="text-lg text-slate-700 leading-relaxed">
                      I've mentored hundreds of cybersecurity learners — and I realised most people
                      don't struggle with motivation… they struggle with{" "}
                      <span className="font-semibold text-slate-900">clarity</span>.
                    </p>

                    <p className="text-lg text-slate-700 leading-relaxed">
                      So this project is my way of helping beginners get started — the right way
                    </p>
                  </div>

                </CardContent>
              </Card>
            </div>
          </section>

          {/* Early Access Form */}
          <section id="early-access" className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-[#ffda6a] shadow-2xl bg-white">
                <CardContent className="p-8 md:p-12 space-y-8">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-[#ffda6a] flex items-center justify-center mx-auto">
                      <Lock className="w-8 h-8 text-slate-900" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Join Early Access</h2>
                    <p className="text-slate-600">Be among the first to start your cybersecurity journey</p>
                  </div>

                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-900">
                          Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="h-12 border-slate-300 focus:border-[#ffda6a] focus:ring-[#ffda6a]"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-900">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="h-12 border-slate-300 focus:border-[#ffda6a] focus:ring-[#ffda6a]"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium text-slate-900">
                          College / Professional (optional)
                        </label>
                        <Input
                          id="status"
                          type="text"
                          placeholder="e.g., MIT Student or Software Engineer"
                          className="h-12 border-slate-300 focus:border-[#ffda6a] focus:ring-[#ffda6a]"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-[#ffda6a] hover:bg-[#ffd04a] text-slate-900 font-semibold h-14 text-lg rounded-xl disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Join Early Access"}
                        <Send className="ml-2 w-5 h-5" />
                      </Button>

                      <p className="text-center text-sm text-slate-500">No spam. Just meaningful updates.</p>
                    </form>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">You're in!</h3>
                      <p className="text-slate-600">We'll keep you updated on the launch. Check your email soon!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Scarcity Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white shadow-xl">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <h3 className="text-2xl font-bold text-slate-900">Limited Launch Seats</h3>
                  </div>
                  <p className="text-lg text-slate-700">First 200 learners get the lowest price.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Pricing Hint Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-3 bg-white border-2 border-[#ffda6a] rounded-2xl px-8 py-6 shadow-lg">
                <Pizza className="w-10 h-10 text-[#ffda6a]" />
                <p className="text-xl font-medium text-slate-900">
                  Priced lower than a pizza — because learning shouldn't be expensive
                </p>
              </div>
            </div>
          </section>

          {/* Community Engagement Section */}
          <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-[#ffda6a]/10 to-amber-50">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Join Our Community</h2>
                <p className="text-lg text-slate-600">
                  Connect with fellow cybersecurity learners, get instant updates, and never miss out!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* WhatsApp */}
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() =>
                    window.open(
                      "https://whatsapp.com/channel/0029Vb7dfiDD38CXfUkLz00b",
                      "_blank"
                    )
                  }
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Join WhatsApp Group
                </Button>

                {/* Telegram */}
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open("https://t.me/icybersanjay", "_blank")}
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                  Join Telegram Channel
                </Button>

                {/* LinkedIn */}
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#0A66C2] hover:bg-[#004182] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/sanjay70023", "_blank")
                  }
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                  Connect on LinkedIn
                </Button>
              </div>


              <p className="text-sm text-slate-500">
                Get instant notifications, exclusive tips, and connect with 1000+ cybersecurity enthusiasts!
              </p>
            </div>
          </section>

        </div>
      <Footer />
    </>
  )
}
