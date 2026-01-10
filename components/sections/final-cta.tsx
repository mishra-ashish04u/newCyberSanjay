"use client"

import { Button } from "@/components/ui/button"

export function FinalCTASection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-4">
            Ready To Take Your First Step Into Cybersecurity?
          </h2>
          <p className="text-lg text-muted-foreground">Start today. Learn clearly. Build confidently.</p>
        </div>

        <Button size="lg" className="px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          Get The Starter Kit Now
        </Button>

        <div className="pt-8 space-y-2 text-sm text-muted-foreground">
          <p>✨ Instant PDF download • Beginner-friendly • Secure payment</p>
        </div>
      </div>
    </section>
  )
}
