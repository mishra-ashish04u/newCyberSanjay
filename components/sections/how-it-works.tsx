"use client"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-16">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-6 md:left-1/2 top-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold transform md:-translate-x-1/2">
              1
            </div>
            <div className="pt-20 pb-8 px-6 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-3">Click & Pay</h3>
              <p className="text-muted-foreground text-sm">
                Click the buy button and complete the payment via secure Cashfree checkout
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-6 md:left-1/2 top-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold transform md:-translate-x-1/2">
              2
            </div>
            <div className="pt-20 pb-8 px-6 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-3">Instant Access</h3>
              <p className="text-muted-foreground text-sm">You'll receive instant access to download the PDF</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-6 md:left-1/2 top-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold transform md:-translate-x-1/2">
              3
            </div>
            <div className="pt-20 pb-8 px-6 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-bold text-foreground mb-3">Start Learning</h3>
              <p className="text-muted-foreground text-sm">
                Start learning at your own pace. No expiry. No login required.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
          <p className="font-semibold text-foreground">✨ You keep the PDF forever.</p>
        </div>
      </div>
    </section>
  )
}
