"use client"

import { Linkedin, MessageCircle, Send, Youtube, ArrowUpRight } from "lucide-react"

export function Footer() {
  const socialLinks = [
    { 
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/sanjay70023",
    },
    { 
      label: "WhatsApp",
      url: "https://whatsapp.com/channel/0029Vb7dfiDD38CXfUkLz00b",
    },
    { 
      label: "Telegram",
      url: "https://t.me/icybersanjay",
    },
    { 
      label: "Instagram",
      url: "#",
    },
  ]

  return (
    <footer className="bg-black text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            
            {/* Left - Contact */}
            <div>
              <h3 className="text-sm text-gray-400 mb-6">Let's Talk</h3>
              <a 
                href="mailto:contact@cybersanjay.com" 
                className="text-3xl sm:text-4xl md:text-5xl font-medium hover:text-yellow-400 transition-colors inline-block mb-8"
              >
                contact@cybersanjay.com
              </a>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Job Application</p>
                  <a href="mailto:careers@cybersanjay.com" className="text-white hover:text-yellow-400 transition-colors">
                    careers@cybersanjay.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Social Links */}
            <div className="md:text-right">
              <h3 className="text-sm text-gray-400 mb-6">Follow Us</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-yellow-400 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Legal Links */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                About Us
              </a>
              <a href="/privacy-policy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms & Conditions
              </a>
              <a href="/cancellation-refund-policy" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Refund & Cancellation Policy
              </a>
              <a href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Bottom - Copyright */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-bold">Cyber Sanjay</div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Cyber Sanjay. All Rights Reserved
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}