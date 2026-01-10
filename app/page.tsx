"use client"
import { HeroSection } from "@/components/sections/hero"
import { WhatYouGetSection } from "@/components/sections/what-you-get"
import { WhoThisIsForSection } from "@/components/sections/who-this-is-for"
import { WhyCreatedSection } from "@/components/sections/why-created"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { PricingSection } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { FinalCTASection } from "@/components/sections/final-cta"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <WhatYouGetSection />
      <WhoThisIsForSection />
      <WhyCreatedSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
