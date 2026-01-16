"use client"

export function WhoThisIsForSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] mb-16 text-center">
          Who Should Get This?
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {/* Item 1 */}
          <div className="flex gap-4 bg-white border border-yellow-200 rounded-xl p-6 shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-lg">👨‍🎓</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1F2937] mb-1">
                Students Curious About Cybersecurity
              </h3>
              <p className="text-gray-700 text-sm">
                Get started with a clear learning path
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4 bg-white border border-yellow-200 rounded-xl p-6 shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-lg">🚀</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1F2937] mb-1">
                Beginners Who Don’t Know Where To Start
              </h3>
              <p className="text-gray-700 text-sm">
                We guide you from zero to confident
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4 bg-white border border-yellow-200 rounded-xl p-6 shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-lg">🔄</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1F2937] mb-1">
                People Switching Careers
              </h3>
              <p className="text-gray-700 text-sm">
                Start a new path in cybersecurity
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex gap-4 bg-white border border-yellow-200 rounded-xl p-6 shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-lg">💡</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#1F2937] mb-1">
                Anyone Who Wants Clarity
              </h3>
              <p className="text-gray-700 text-sm">
                Instead of random YouTube videos
              </p>
            </div>
          </div>
        </div>

        <div className="p-10 bg-yellow-50 border-2 border-yellow-400 rounded-xl text-center">
          <p className="text-lg font-semibold text-[#1F2937] mb-2">
            ✓ No Coding Needed
          </p>
          <p className="text-gray-700">
            No technical background required. We start from the absolute basics.
          </p>
        </div>
      </div>
    </section>
  )
}
