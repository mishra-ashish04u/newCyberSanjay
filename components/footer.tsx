"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-yellow-200 bg-yellow-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div>
            <h3 className="font-semibold text-yellow-950 mb-4">
              Cyber Sanjay
            </h3>
            <p className="text-sm text-yellow-900">
              Helping beginners take their first confident step into
              cybersecurity with clarity and practical guidance.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-yellow-950 mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li>
                <a href="#product" className="hover:text-yellow-700 transition">
                  Cybersecurity Starter Kit
                </a>
              </li>
              <li>
                <a href="#mentorship" className="hover:text-yellow-700 transition">
                  1-on-1 Mentorship
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-yellow-950 mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li>
                <a href="/contact" className="hover:text-yellow-700 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-yellow-700 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-yellow-950 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li>
                <a href="/privacy-policy" className="hover:text-yellow-700 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="hover:text-yellow-700 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/cancellation-refund-policy"
                  className="hover:text-yellow-700 transition"
                >
                  Cancellation & Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-yellow-200 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-yellow-900">
          <p>
            © {new Date().getFullYear()} Cyber Sanjay. All rights reserved.
          </p>
          <p>
            Built for beginners who want clarity, not confusion.
          </p>
        </div>
      </div>
    </footer>
  )
}
