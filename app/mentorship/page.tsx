"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shield,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MentorshipPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FFF9E6]">

        {/* HERO */}
        <section className="container mx-auto px-4 py-20 text-center max-w-4xl">
          <Badge className="bg-yellow-400 text-black px-4 py-1.5 text-sm font-semibold mb-4">
            Limited 1-on-1 Mentorship
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-[#1F2937] mb-6">
            1-on-1 Cybersecurity Mentorship
          </h1>

          <p className="text-xl text-gray-700 mb-8">
            Get direct guidance, clarity, and a realistic roadmap to start your
            cybersecurity career — without confusion or fake promises.
          </p>

          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-10 py-6 rounded-xl shadow-lg"
            onClick={() =>
              window.open(
                "https://wa.me/918765236964?text=Hi%20Sanjay,%20I%20want%201-on-1%20cybersecurity%20mentorship",
                "_blank"
              )
            }
          >
            Apply via WhatsApp
          </Button>

          <p className="text-sm text-gray-600 mt-4">
            Only serious learners • Limited slots each month
          </p>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-10">
            Who This Mentorship Is For
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "College students confused about cybersecurity",
              "Beginners who don’t know where to start",
              "Self-learners stuck after basics",
            ].map((item, idx) => (
              <Card key={idx} className="bg-white border border-yellow-200 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Users className="w-10 h-10 mx-auto mb-4 text-yellow-600" />
                  <p className="text-[#1F2937] font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-12">
            What You Get
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Personalized cybersecurity roadmap",
              "Tool & lab guidance (legal & practical)",
              "Resume & LinkedIn improvement",
              "Career clarity (jobs, internships, skills)",
              "Realistic expectations (no fake hype)",
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                <p className="text-gray-700 text-lg">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <Card className="bg-white border-2 border-yellow-400 shadow-md">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-3xl font-bold text-center text-[#1F2937]">
                How Mentorship Works
              </h2>

              <div className="space-y-3 text-gray-700 text-lg">
                <p>1️⃣ Apply via WhatsApp</p>
                <p>2️⃣ Short discussion to understand your goals</p>
                <p>3️⃣ Mentorship plan + schedule shared</p>
                <p>4️⃣ Regular guidance & accountability</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* WHY ME */}
        <section className="container mx-auto px-4 py-16 max-w-3xl text-center">
          <Shield className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
          <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
            Why Learn With Cyber Sanjay?
          </h2>

          <p className="text-lg text-gray-700">
            I don’t sell dreams. I focus on fundamentals, clarity, ethics, and
            real-world preparation. My goal is to make you confident — not
            confused.
          </p>
        </section>

        {/* DISCLAIMER */}
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <Card className="border-2 border-red-300 bg-red-50">
            <CardContent className="p-6 flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
              <p className="text-slate-800 text-sm leading-relaxed">
                This mentorship does NOT guarantee a job. Results depend on your
                consistency, effort, and honesty. No illegal hacking,
                shortcuts, or fake certificates are supported.
              </p>
            </CardContent>
          </Card>
        </section>

      </main>

      <Footer />
    </>
  )
}