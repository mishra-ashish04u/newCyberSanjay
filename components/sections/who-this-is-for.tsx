"use client"

export function WhoThisIsForSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-16">Who Should Get This?</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">👨‍🎓</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Students Curious About Cybersecurity</h3>
              <p className="text-muted-foreground text-sm">Get started with a clear learning path</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">🚀</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Beginners Who Don't Know Where To Start</h3>
              <p className="text-muted-foreground text-sm">We guide you from zero to confident</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">🔄</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">People Switching Careers</h3>
              <p className="text-muted-foreground text-sm">Start a new path in cybersecurity</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">💡</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Anyone Who Wants Clarity</h3>
              <p className="text-muted-foreground text-sm">Instead of random YouTube videos</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-primary/5 border border-primary/20 rounded-xl text-center">
          <p className="text-lg font-semibold text-foreground mb-2">✓ No Coding Needed</p>
          <p className="text-muted-foreground">No technical background required. We start from the absolute basics.</p>
        </div>
      </div>
    </section>
  )
}
