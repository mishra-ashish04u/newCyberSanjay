"use client"

export function WhatYouGetSection() {
  return (
    <section id="what-you-get" className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance mb-4">What You'll Get Inside</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">The 7-Day Ethical Hacking Starter Kit — ₹99</h3>
            <p className="text-muted-foreground mb-6">
              A simple roadmap that helps you understand ethical hacking step-by-step in just one week.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-foreground text-sm">You'll learn:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>What ethical hacking really is</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>How hackers think</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Basic tools & concepts</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Safe practice methods</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Beginner labs & exercises</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Common mistakes to avoid</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Cybersecurity Resume Booster Pack — ₹99</h3>
            <p className="text-muted-foreground mb-6">
              A beginner-friendly resume toolkit designed specially for students & freshers.
            </p>
            <div className="space-y-3">
              <p className="font-semibold text-foreground text-sm">Includes:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Resume template</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Example bullet points</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>How to present your skills</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Guidance on beginner projects</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Recruiter-friendly formatting</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> <span>Internship-ready structure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-primary/10 border-2 border-primary rounded-xl text-center space-y-4">
          <p className="text-sm font-semibold text-muted-foreground">Combo Price:</p>
          <p className="text-3xl font-bold text-foreground">Get BOTH for just ₹149</p>
          <p className="text-sm text-muted-foreground font-semibold">Best value for beginners</p>
          <p className="text-xs text-muted-foreground">You save ₹49</p>
        </div>
      </div>
    </section>
  )
}
