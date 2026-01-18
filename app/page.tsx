"use client"
import { HeroSection } from "@/components/sections/hero"
import { BlogsSection } from "@/components/sections/blogs"
import { LearningJourneySection } from "@/components/sections/learningjourney"
import { AboutWhySection } from "@/components/sections/aboutwhy"
import { CommunitySection } from "@/components/sections/community"
import { CoursesSection } from "@/components/sections/courses"
import { FAQTestimonialsSection } from "@/components/sections/faq"
import { FinalCTASection } from "@/components/sections/final-cta"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CoursesSection />
      <BlogsSection />
      <CommunitySection />
      <AboutWhySection />
      <LearningJourneySection />
      <FAQTestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
