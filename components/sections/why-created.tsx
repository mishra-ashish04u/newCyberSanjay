"use client"

export function WhyCreatedSection() {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-12">
          Why I Built This Starter Kit
        </h2>

        <div className="space-y-6 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            So many students message me saying they want to start cybersecurity,
            but they feel lost.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Too many resources. Too many technical terms. No proper starting point.
          </p>

          <p className="text-lg text-[#1F2937] font-semibold leading-relaxed">
            I wanted to create something simple.
            <br />
            Something that gives you clarity in just one week.
            <br />
            Something I wish I had when I was starting.
          </p>
        </div>

        <div className="pt-8 border-t border-yellow-300">
          <p className="text-lg text-[#1F2937] font-medium">
            That's how this kit was born ❤️
          </p>

          <p className="text-sm text-gray-600 mt-6 font-semibold">
            – Cyber Sanjay
          </p>
        </div>
      </div>
    </section>
  )
}
