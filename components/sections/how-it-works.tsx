"use client"

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-16 text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {/* Step 1 */}
          <div className="relative">
            <div
              className="
                absolute -left-6 md:left-1/2 top-0 
                w-12 h-12 rounded-full 
                bg-yellow-500 text-black
                flex items-center justify-center 
                font-bold shadow-md
                transform md:-translate-x-1/2
              "
            >
              1
            </div>

            <div className="pt-20 pb-8 px-6 bg-white border border-yellow-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                Click & Pay
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Click the buy button and complete the payment via secure Cashfree checkout.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div
              className="
                absolute -left-6 md:left-1/2 top-0 
                w-12 h-12 rounded-full 
                bg-yellow-500 text-black
                flex items-center justify-center 
                font-bold shadow-md
                transform md:-translate-x-1/2
              "
            >
              2
            </div>

            <div className="pt-20 pb-8 px-6 bg-white border border-yellow-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                Instant Access
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                You'll receive instant access to download the PDF.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div
              className="
                absolute -left-6 md:left-1/2 top-0 
                w-12 h-12 rounded-full 
                bg-yellow-500 text-black
                flex items-center justify-center 
                font-bold shadow-md
                transform md:-translate-x-1/2
              "
            >
              3
            </div>

            <div className="pt-20 pb-8 px-6 bg-white border border-yellow-200 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2937] mb-3">
                Start Learning
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Start learning at your own pace. No expiry. No login required.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
          <p className="font-semibold text-[#1F2937]">
            ✨ You keep the PDF forever.
          </p>
        </div>
      </div>
    </section>
  )
}
