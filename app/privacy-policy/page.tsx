"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-yellow-50 min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white border border-yellow-200 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Privacy Policy
              </h1>
              <p className="text-sm text-slate-500">
                Last updated on 10-01-2026 14:58:14
              </p>
            </div>

            {/* Intro */}
            <p className="text-slate-700 leading-relaxed">
              This Privacy Policy describes how <strong>Cyber Sanjay</strong>
              collects, uses, and protects the personal information of users
              who access or use our website, products, and services.
              By using this website, you agree to the terms of this Privacy Policy.
            </p>

            {/* Merchant Info */}
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">
                1. Merchant Information
              </h2>
              <p className="text-slate-700">
                <strong>Merchant Legal Entity Name:</strong> Cyber Sanjay
              </p>
              <p className="text-slate-700">
                <strong>Registered Address:</strong> Shushila Bhavan, Noida,
                Uttar Pradesh, PIN: 201304
              </p>
              <p className="text-slate-700">
                <strong>Operational Address:</strong> Shushila Bhavan, Noida,
                Uttar Pradesh, PIN: 201304
              </p>
              <p className="text-slate-700">
                <strong>Email:</strong> sanjay70023@gmail.com
              </p>
              <p className="text-slate-700">
                <strong>Phone:</strong> 8423356441
              </p>
            </section>

            {/* Info Collected */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                2. Information We Collect
              </h2>
              <p className="text-slate-700">
                We may collect the following information when you use our website
                or services:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Educational or professional details (if provided)</li>
                <li>Payment-related information (processed securely by payment gateways)</li>
                <li>Usage data such as pages visited and interactions</li>
              </ul>
            </section>

            {/* Use of Info */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-slate-700 space-y-1">
                <li>To provide access to our products and services</li>
                <li>To communicate important updates and support messages</li>
                <li>To process payments and deliver purchased content</li>
                <li>To improve our website and learning experience</li>
                <li>To comply with legal and regulatory requirements</li>
              </ul>
            </section>

            {/* Payments */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                4. Payment Security
              </h2>
              <p className="text-slate-700">
                We do not store or process your card or banking details directly.
                All payments are securely handled by trusted third-party payment
                gateways such as Cashfree or Razorpay, in compliance with industry
                security standards.
              </p>
            </section>

            {/* Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                5. Cookies & Tracking
              </h2>
              <p className="text-slate-700">
                We may use cookies and similar technologies to enhance your
                browsing experience, analyze traffic, and understand user
                behavior. You can disable cookies in your browser settings if
                you prefer.
              </p>
            </section>

            {/* Data Protection */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                6. Data Protection
              </h2>
              <p className="text-slate-700">
                We implement reasonable security measures to protect your
                personal information from unauthorized access, misuse, or
                disclosure. However, no method of transmission over the internet
                is 100% secure.
              </p>
            </section>

            {/* Third Party */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                7. Third-Party Services
              </h2>
              <p className="text-slate-700">
                We may share limited information with third-party tools and
                services that help us operate our website (such as analytics,
                email services, and payment providers). These third parties are
                obligated to protect your data.
              </p>
            </section>

            {/* User Rights */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                8. Your Rights
              </h2>
              <p className="text-slate-700">
                You have the right to access, update, or request deletion of your
                personal information. You may contact us using the details below
                for any privacy-related concerns.
              </p>
            </section>

            {/* Changes */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                9. Changes to This Policy
              </h2>
              <p className="text-slate-700">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page along with the updated date.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                10. Contact Us
              </h2>
              <p className="text-slate-700">
                If you have any questions regarding this Privacy Policy, please
                contact us at:
              </p>
              <p className="text-slate-700 font-medium">
                Email: sanjay70023@gmail.com
              </p>
              <p className="text-slate-700 font-medium">
                Phone: 8423356441
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
