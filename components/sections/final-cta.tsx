"use client"

import { GraduationCap, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTASection() {
  const paths = [
    {
      icon: GraduationCap,
      title: "Learn",
      subtitle: "Premium Courses",
      description: "Get structured, hands-on training designed for beginners",
      price: "From ₹99",
      features: ["7-Day Ethical Hacking Kit", "Resume Booster Pack", "Lifetime Access"],
      buttonText: "Browse Courses",
      buttonLink: "courses-section",
      color: "from-yellow-400 to-yellow-500",
      badge: "Most Popular"
    },
    {
      icon: Users,
      title: "Connect",
      subtitle: "Join Community",
      description: "Connect with 500+ learners and grow together",
      price: "100% Free",
      features: ["Ask Questions", "Share Projects", "Daily Tips"],
      buttonText: "Join Community",
      buttonLink: "community-section",
      color: "from-green-400 to-green-500",
      badge: "Free Forever"
    },
    {
      icon: BookOpen,
      title: "Read",
      subtitle: "Free Blogs",
      description: "Learn from 50+ expert tutorials and guides",
      price: "100% Free",
      features: ["Web Security", "Ethical Hacking", "Tools & Tips"],
      buttonText: "Browse Blogs",
      buttonLink: "blogs-section",
      color: "from-blue-400 to-blue-500",
      badge: "No Sign-up"
    }
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="final-cta-section"
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-b from-white to-yellow-50"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Choose Your Path</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the path that fits your goals. You can always switch between them anytime!
          </p>
        </div>

        {/* Three Path Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {paths.map((path, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                index === 0 
                  ? "border-yellow-400 shadow-2xl md:scale-105" 
                  : "border-gray-200 hover:border-yellow-300 shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Badge */}
              {path.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold shadow-md ${
                    index === 0 
                      ? "bg-yellow-400 text-black" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {path.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg`}>
                <path.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                {path.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 text-center font-semibold">
                {path.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">
                {path.description}
              </p>

              {/* Price */}
              <div className="text-center mb-5">
                <span className={`text-2xl font-bold bg-gradient-to-r ${path.color} bg-clip-text text-transparent`}>
                  {path.price}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className={`w-5 h-5 bg-gradient-to-br ${path.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                onClick={() => scrollToSection(path.buttonLink)}
                className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90 text-white font-bold py-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base`}
              >
                <span>{path.buttonText}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center">
          <p className="text-base text-gray-600 mb-2">
            Not sure where to start?
          </p>
          <p className="text-sm text-gray-500">
            Start with <button onClick={() => scrollToSection('blogs-section')} className="text-yellow-600 font-bold hover:underline">free blogs</button> to explore, then join the <button onClick={() => scrollToSection('community-section')} className="text-yellow-600 font-bold hover:underline">community</button> when ready!
          </p>
        </div>

      </div>
    </section>
  )
}