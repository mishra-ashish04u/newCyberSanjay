"use client"

import { Button } from "@/components/ui/button"
const INSTAMOJO_LINKS = {
  starter: "https://imjo.in/qHMH9F",
  resume: "https://imjo.in/rgVWWV",
  bundle: "https://imjo.in/q6AHM8",
}

export function FinalCTASection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-[#FFF9E6]">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1F2937] text-balance mb-4">
            Ready To Take Your First Step Into Cybersecurity?
          </h2>

          <p className="text-lg text-gray-700">
            Start today. Learn clearly. Build confidently.
          </p>
        </div>

        <Button
          size="lg"
          className="
            px-10 h-14 
            bg-yellow-500 hover:bg-yellow-600 
            text-black font-semibold
            rounded-xl shadow-md
            transition-all
          "
            onClick={() => (window.location.href = INSTAMOJO_LINKS.bundle)}
        >
          Get The Starter Kit Now
        </Button>

        <div className="pt-6 space-y-2 text-sm text-gray-600">
          <p>✨ Instant PDF download • Beginner-friendly • Secure payment</p>
        </div>
      </div>

      {/* Community Engagement Section */}
                <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-[#ffda6a]/10 to-amber-50">
                  <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="space-y-3">
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Join Our Community</h2>
                      <p className="text-lg text-slate-600">
                        Connect with fellow cybersecurity learners, get instant updates, and never miss out!
                      </p>
                    </div>
      
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      {/* WhatsApp */}
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                        onClick={() =>
                          window.open(
                            "https://whatsapp.com/channel/0029Vb7dfiDD38CXfUkLz00b",
                            "_blank"
                          )
                        }
                      >
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Join WhatsApp Group
                      </Button>
      
                      {/* Telegram */}
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                        onClick={() => window.open("https://t.me/icybersanjay", "_blank")}
                      >
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                        </svg>
                        Join Telegram Channel
                      </Button>
      
                      {/* LinkedIn */}
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-[#0A66C2] hover:bg-[#004182] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                        onClick={() =>
                          window.open("https://www.linkedin.com/in/sanjay70023", "_blank")
                        }
                      >
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.266 2.37 4.266 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                        </svg>
                        Connect on LinkedIn
                      </Button>
                    </div>
      
      
                    <p className="text-sm text-slate-500">
                      Get instant notifications, exclusive tips, and connect with 1000+ cybersecurity enthusiasts!
                    </p>
                  </div>
                </section>
                
    </section>

    
  )
}
