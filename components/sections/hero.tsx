"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Users, GraduationCap, ArrowRight, TrendingUp } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-110 saturate-125 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 pointer-events-none" />

      {/* 🔤 Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            
            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Complete Cybersecurity
                <span className="block text-yellow-400 mt-1">Learning Platform</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
                Learn from premium courses, connect with a growing community, and read expert insights — all in one place
              </p>
            </div>

            {/* Three Pillars - Compact Version */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              
              {/* Pillar 1: Learn */}
              <div 
                onClick={() => scrollToSection('courses-section')}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:bg-white/15 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-white">Learn</h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm leading-snug">
                    Premium courses for beginners
                  </p>
                  
                  <div className="flex items-center gap-1 text-yellow-400 font-semibold text-xs sm:text-sm group-hover:gap-2 transition-all pt-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              {/* Pillar 2: Connect */}
              <div 
                onClick={() => scrollToSection('community-section')}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:bg-white/15 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-white">Connect</h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm leading-snug">
                    Join 500+ learners
                  </p>
                  
                  <div className="flex items-center gap-1 text-yellow-400 font-semibold text-xs sm:text-sm group-hover:gap-2 transition-all pt-1">
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

              {/* Pillar 3: Read */}
              <div 
                onClick={() => scrollToSection('blogs-section')}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:bg-white/15 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105 sm:col-span-1"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-white">Read</h3>
                  
                  <p className="text-gray-300 text-xs sm:text-sm leading-snug">
                    Expert tutorials — free
                  </p>
                  
                  <div className="flex items-center gap-1 text-yellow-400 font-semibold text-xs sm:text-sm group-hover:gap-2 transition-all pt-1">
                    <span>Browse</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>

            </div>

            {/* Stats Bar - More Compact */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-5 border-t border-white/20 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">1,000+</div>
                <div className="text-xs text-gray-300 mt-0.5">Students</div>
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-white/20"></div>
              
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">500+</div>
                <div className="text-xs text-gray-300 mt-0.5">Members</div>
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-white/20"></div>
              
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">50+</div>
                <div className="text-xs text-gray-300 mt-0.5">Articles</div>
              </div>
            </div>

            {/* Trust Line - Smaller */}
            <div className="pt-2">
              <p className="text-xs text-gray-300">
                <span className="font-semibold text-white">Created by Cyber Sanjay</span> — trusted by thousands
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}