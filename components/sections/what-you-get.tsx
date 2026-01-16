"use client"

export function WhatYouGetSection() {
  return (
    <section
      id="what-you-get"
      className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-4">
            What You'll Get Inside
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Starter Kit */}
          <div className="bg-white border border-yellow-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-2">
              The 7-Day Ethical Hacking Starter Kit — ₹99
            </h3>

            <p className="text-gray-700 mb-6">
              A simple roadmap that helps you understand ethical hacking
              step-by-step in just one week.
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-[#1F2937] text-sm">
                You'll learn:
              </p>

              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "What ethical hacking really is",
                  "How hackers think",
                  "Basic tools & concepts",
                  "Safe practice methods",
                  "Beginner labs & exercises",
                  "Common mistakes to avoid",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resume Pack */}
          <div className="bg-white border border-yellow-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-2">
              Cybersecurity Resume Booster Pack — ₹99
            </h3>

            <p className="text-gray-700 mb-6">
              A beginner-friendly resume toolkit designed specially for
              students & freshers.
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-[#1F2937] text-sm">
                Includes:
              </p>

              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  "Resume template",
                  "Example bullet points",
                  "How to present your skills",
                  "Guidance on beginner projects",
                  "Recruiter-friendly formatting",
                  "Internship-ready structure",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-yellow-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Combo Highlight */}
        <div className="mt-14 p-10 bg-yellow-50 border-2 border-yellow-400 rounded-xl text-center space-y-3">
          <p className="text-sm font-semibold text-gray-600">
            Combo Price
          </p>
          <p className="text-3xl font-bold text-[#1F2937]">
            Get BOTH for just ₹149
          </p>
          <p className="text-sm font-semibold text-gray-700">
            Best value for beginners
          </p>
          <p className="text-xs text-gray-600">
            You save ₹49
          </p>
        </div>
      </div>
    </section>
  )
}
