"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Map, Heart, Sparkles, BookOpen, Users, TrendingUp, Quote } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: BookOpen,
      title: "Practical, Beginner-Friendly Learning",
      description: "Everything is built with beginners in mind — step-by-step tasks, clear explanations, and hands-on examples so you build real skills, not just watch videos."
    },
    {
      icon: Map,
      title: "Roadmaps You Can Follow",
      description: "Instead of random content, you get focused roadmaps that tell you exactly what to study, why it matters, and how to apply it."
    },
    {
      icon: TrendingUp,
      title: "Confidence & Clarity",
      description: "Many beginners don't struggle with motivation — they struggle with clarity. Our content helps you understand the why and how behind each concept."
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
          
          <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-950/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-950/20">
                <Heart className="w-4 h-4 text-yellow-950" />
                <span className="text-sm font-medium text-yellow-950">Our Story</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-yellow-950 mb-6">
                About Cyber Sanjay
              </h1>
              
              <p className="text-xl md:text-2xl text-yellow-900 max-w-3xl mx-auto leading-relaxed">
                Helping beginners take their first confident step into cybersecurity — with clarity, guidance, and real-world focus.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Exists */}
        <section className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl border border-yellow-200 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target className="w-7 h-7 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-yellow-950 mb-4">
                  Why This Exists
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Cybersecurity can feel overwhelming at the beginning — there's a huge volume of information, 
                  scattered tutorials, and no clear roadmap. Most beginners don't need more theory, they need 
                  <span className="font-semibold text-yellow-950"> direction</span>. That's why Cyber Sanjay exists — 
                  to provide simple, clear, practical guidance that empowers learners to make steady progress without confusion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 md:p-12 text-center text-yellow-950 shadow-xl">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl md:text-2xl text-yellow-900 max-w-3xl mx-auto leading-relaxed">
              To make cybersecurity education accessible, practical, and beginner-friendly — 
              one clear step at a time.
            </p>
          </div>
        </section>

        {/* What You Get */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-950 mb-3">
              What You Get
            </h2>
            <p className="text-lg text-slate-600">
              Real value that helps you grow as a cybersecurity professional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-lg border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all p-8"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-yellow-950" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-yellow-950 mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-slate-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-950 text-center mb-8">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">1,000+</div>
                <p className="text-slate-600">Students Enrolled</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">500+</div>
                <p className="text-slate-600">Community Members</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">50+</div>
                <p className="text-slate-600">Blog Articles</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">4.8★</div>
                <p className="text-slate-600">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Note from Sanjay */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="relative overflow-hidden bg-gradient-to-r from-yellow-950 to-yellow-900 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-yellow-950" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
                A Note From Sanjay
              </h2>
              
              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-yellow-100 leading-relaxed text-center mb-6">
                  I've mentored hundreds of cybersecurity beginners and realized that the biggest challenge isn't 
                  motivation — it's <span className="font-bold text-white">clarity</span>. Most people don't know 
                  where to start or what steps actually matter.
                </p>
                
                <p className="text-lg md:text-xl text-yellow-100 leading-relaxed text-center">
                  My goal with Cyber Sanjay is to simplify that first step and help you build a strong foundation 
                  with confidence. This isn't about quick tricks — it's about <span className="font-bold text-white">real understanding</span>.
                </p>
                
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="w-px h-12 bg-yellow-400/30"></div>
                  <div className="text-center">
                    <p className="text-yellow-400 font-bold text-lg">Sanjay</p>
                    <p className="text-yellow-300 text-sm">Founder & Cybersecurity Educator</p>
                  </div>
                  <div className="w-px h-12 bg-yellow-400/30"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-yellow-200 p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-950 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are building their cybersecurity careers with clarity and confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community">
                <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Join Community
                </button>
              </Link>
              <Link href="/courses">
                <button className="px-8 py-4 bg-white hover:bg-yellow-50 text-yellow-950 font-bold rounded-xl border-2 border-yellow-400 hover:border-yellow-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Browse Courses
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}