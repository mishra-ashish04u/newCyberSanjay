"use client"

import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-16 text-center">
          Choose Your Bundle
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-2">7-Day Ethical Hacking Starter Kit</h3>
            <p className="text-3xl font-bold text-primary mb-6">₹99</p>
            <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-grow">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Beginner roadmap</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Training guidance</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Labs & exercises</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full bg-transparent">
              Get The Starter Kit — ₹99
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-2">Cybersecurity Resume Booster Pack</h3>
            <p className="text-3xl font-bold text-primary mb-6">₹99</p>
            <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-grow">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Resume template</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Sample points</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Beginner-friendly guidance</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full bg-transparent">
              Get The Resume Pack — ₹99
            </Button>
          </div>

          <div className="bg-card border-2 border-primary rounded-xl p-8 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Best Value
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Complete Starter Bundle</h3>
            <p className="text-3xl font-bold text-primary mb-1">₹149</p>
            <p className="text-sm text-muted-foreground mb-6">Includes BOTH</p>
            <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-grow">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>7-Day Ethical Hacking Starter Kit</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Resume Booster Pack</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Lifetime PDF access</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="font-semibold">Save ₹49</span>
              </li>
            </ul>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Get The Complete Bundle — ₹149
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Instant PDF download • Secure Cashfree Payment • Keep forever
        </p>
      </div>
    </section>
  )
}
