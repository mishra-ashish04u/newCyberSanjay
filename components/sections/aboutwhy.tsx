"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Award, Target, Heart, Zap, Shield, Linkedin, MessageCircle, Send, Globe } from "lucide-react"

export function AboutWhySection() {
  const benefits = [
    {
      icon: Award,
      title: "Real-World Experience",
      description: "Learn from someone who's been in the trenches, not just in classrooms"
    },
    {
      icon: Heart,
      title: "Beginner-Friendly Approach",
      description: "Complex concepts explained simply — no jargon, just clear learning"
    },
    {
      icon: Target,
      title: "Job-Ready Skills",
      description: "Practical, hands-on training focused on getting you employed"
    },
    {
      icon: Zap,
      title: "Active Community",
      description: "Join 500+ learners helping each other grow every day"
    },
    {
      icon: Shield,
      title: "Affordable Quality",
      description: "Premium education at prices students can actually afford"
    },
    {
      icon: CheckCircle,
      title: "Lifetime Access",
      description: "Learn at your pace with free updates forever"
    },
  ]

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/sanjay70023", color: "hover:text-blue-600" },
    { icon: MessageCircle, label: "WhatsApp", url: "https://whatsapp.com/channel/0029Vb7dfiDD38CXfUkLz00b", color: "hover:text-green-600" },
    { icon: Send, label: "Telegram", url: "https://t.me/icybersanjay", color: "hover:text-sky-500" },
    { icon: Globe, label: "Website", url: "https://www.cybersanjay.com", color: "hover:text-yellow-600" },
  ]

  return (
    <section
      id="about-why-section"
      className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-gradient-to-b from-yellow-50 to-yellow-100"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Meet Your Instructor</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Learn from Cyber Sanjay
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Making cybersecurity education accessible to everyone
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Left Side: About Sanjay */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-xl p-6 sticky top-6">
              
              {/* Profile Photo */}
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-400 bg-white shadow">
                <Image
                  src="/favicon_io/apple-touch-icon.png"
                  alt="Cyber Sanjay Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Name & Title */}
              <div className="text-center mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Cyber Sanjay
                </h3>
                <p className="text-sm text-yellow-700 font-semibold mb-2">
                  Cybersecurity Educator & LinkedIn Influencer
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-yellow-600" />
                    <span>50K+ LinkedIn Followers</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4 pb-4 border-b border-yellow-200">
                <p className="text-sm text-gray-700 leading-relaxed text-center">
                  Passionate about making cybersecurity accessible to everyone. I started from zero knowledge and built my way up — now I help others do the same.
                </p>
              </div>

              {/* Mission Statement */}
              <div className="bg-yellow-100 rounded-lg p-4 mb-4">
                <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-yellow-600" />
                  My Mission
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "To empower 10,000+ students with practical cybersecurity skills and help them land their dream jobs in tech."
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-3 text-center">Connect with Me</h4>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center justify-center gap-2 bg-white border-2 border-yellow-200 rounded-lg py-2 px-3 text-gray-700 ${social.color} hover:border-yellow-400 transition-all text-xs font-semibold`}
                    >
                      <social.icon className="w-4 h-4" />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-yellow-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">50K+</div>
                  <div className="text-xs text-gray-600">LinkedIn</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">1K+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">4.8★</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Why Choose */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Why Learn with Me?
              </h3>
              <p className="text-sm text-gray-600">
                Here's what makes this platform different from the rest
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-xl p-4 hover:border-yellow-400 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <div className="text-4xl text-black/30 leading-none">"</div>
                <div>
                  <p className="text-black font-semibold text-sm sm:text-base mb-3 leading-relaxed">
                    Sanjay's teaching style is incredible. He breaks down complex topics into simple steps. I went from zero knowledge to landing my first cybersecurity internship in 6 months!
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-black">RK</span>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">Rahul Kumar</div>
                      <div className="text-xs text-black/70">Security Analyst Intern</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 text-center">
              <h4 className="font-bold text-gray-900 text-lg mb-2">
                Ready to Start Your Journey?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Join 1,000+ students learning cybersecurity the right way
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-5 px-6 rounded-lg shadow-lg"
                  onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Browse Courses
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-semibold py-5 px-6 rounded-lg"
                  onClick={() => document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join Community
                </Button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}