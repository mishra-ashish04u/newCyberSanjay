"use client"

import { BookOpen, Users, GraduationCap, Rocket, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LearningJourneySection() {
  const steps = [
    {
      number: "01",
      icon: BookOpen,
      title: "Start with Free Blogs",
      description: "Read 50+ tutorials and guides to understand cybersecurity basics",
      action: "Browse Blogs",
      link: "blogs-section",
      badge: "100% Free",
      color: "from-blue-400 to-blue-500"
    },
    {
      number: "02",
      icon: Users,
      title: "Join the Community",
      description: "Connect with 500+ learners, ask questions, and share your progress",
      action: "Join Community",
      link: "community-section",
      badge: "100% Free",
      color: "from-green-400 to-green-500"
    },
    {
      number: "03",
      icon: GraduationCap,
      title: "Enroll in Courses",
      description: "Get structured learning with premium courses designed for beginners",
      action: "View Courses",
      link: "courses-section",
      badge: "From ₹99",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      number: "04",
      icon: Rocket,
      title: "Land Your Dream Job",
      description: "Apply your skills, build projects, and start your cybersecurity career",
      action: "Get Started",
      link: "courses-section",
      badge: "Success",
      color: "from-purple-400 to-purple-500"
    }
  ]

  const stats = [
    { value: "1,000+", label: "Students Enrolled" },
    { value: "500+", label: "Community Members" },
    { value: "50+", label: "Free Articles" },
    { value: "4.8★", label: "Average Rating" }
  ]

  return (
    <section
      id="learning-journey-section"
      className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-gradient-to-b from-yellow-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Your Learning Path</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How It All Works Together
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Your complete journey from beginner to job-ready cybersecurity professional
          </p>
        </div>

        {/* Journey Steps - Desktop: Horizontal Flow, Mobile: Vertical */}
        <div className="relative mb-10">
          {/* Connection Line - Hidden on Mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-green-200 via-yellow-200 to-purple-200 -z-10"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white border-2 border-gray-200 hover:border-yellow-400 rounded-xl p-5 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                  
                  {/* Number Badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-black font-bold text-lg">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-md`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Badge */}
                  <div className="text-center mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      step.badge === "100% Free" 
                        ? "bg-green-100 text-green-700" 
                        : step.badge === "From ₹99"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 flex-grow leading-relaxed">
                    {step.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => document.getElementById(step.link)?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full bg-gradient-to-r ${step.color} hover:opacity-90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-md`}
                  >
                    <span>{step.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Arrow Between Steps - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-yellow-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-black mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-black/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple Closing Message */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Click any step above to jump to that section and start your journey! 🚀
          </p>
        </div>

      </div>
    </section>
  )
}