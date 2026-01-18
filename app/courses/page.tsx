
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { CoursesSection } from "@/components/sections/courses"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle, 
  Shield, 
  Users, 
  Award, 
  Download,
  Clock,
  Target,
  BookOpen,
  ChevronDown
} from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  return (
    <>
    <Header />

    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
            <Award className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master Cybersecurity &<br />
            <span className="text-yellow-600">Land Your Dream Job</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Get job-ready with our battle-tested roadmaps and professional resume templates. 
            <span className="font-semibold text-yellow-700"> No fluff, just results.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 text-lg rounded-lg shadow-lg w-full sm:w-auto"
              asChild
            >
              <a href="#courses-section">
                View Courses
                <ChevronDown className="ml-2 w-5 h-5" />
              </a>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-semibold px-8 py-6 text-lg rounded-lg w-full sm:w-auto"
              asChild
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-yellow-300 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Students Enrolled</div>
            </div>
            <div className="bg-white border-2 border-yellow-300 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-600 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white border-2 border-yellow-300 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="bg-white border-2 border-yellow-300 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support Access</div>
            </div>
          </div>

        </div>
      </section>

      {/* Courses Section - Your existing component */}
      <CoursesSection />

      {/* Why Choose Us */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Students Choose Us
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We focus on practical skills that get you hired, not just theory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Job-Focused Content
              </h3>
              <p className="text-gray-700">
                Every lesson is designed to build skills employers are actively looking for
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Instant Access
              </h3>
              <p className="text-gray-700">
                Download PDFs immediately after purchase. Learn at your own pace, anytime
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Lifetime Updates
              </h3>
              <p className="text-gray-700">
                Get free updates as cybersecurity trends evolve. One-time payment forever
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Beginner Friendly
              </h3>
              <p className="text-gray-700">
                No prior experience needed. Start from zero and reach job-ready level
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-700">
                Bank-grade encryption. Your data and payment are 100% secure
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 transition-all">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Community Support
              </h3>
              <p className="text-gray-700">
                Join our Discord community of learners and get help when stuck
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            
            {/* FAQ Item */}
            <details className="bg-white border-2 border-yellow-300 rounded-lg p-6 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Are these courses suitable for complete beginners?</span>
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-700 mt-4">
                Absolutely! Our courses are designed with beginners in mind. We start from the basics and gradually build up your skills. No prior experience required.
              </p>
            </details>

            <details className="bg-white border-2 border-yellow-300 rounded-lg p-6 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>What format are the courses in?</span>
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-700 mt-4">
                All courses are delivered as downloadable PDF files. This means you can access them offline, print them, and refer back to them anytime without needing an internet connection.
              </p>
            </details>

            <details className="bg-white border-2 border-yellow-300 rounded-lg p-6 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Do I get lifetime access?</span>
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-700 mt-4">
                Yes! Once you purchase, you own the PDFs forever. Plus, you'll get free updates as we improve the content and add new information.
              </p>
            </details>

            <details className="bg-white border-2 border-yellow-300 rounded-lg p-6 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>What if I'm not satisfied?</span>
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-700 mt-4">
                We offer a 7-day money-back guarantee. If you're not satisfied with your purchase, contact us within 7 days for a full refund, no questions asked.
              </p>
            </details>

            <details className="bg-white border-2 border-yellow-300 rounded-lg p-6 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Can I buy individual courses or do I need the bundle?</span>
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-700 mt-4">
                You can buy courses individually for ₹99 each, or save ₹49 by getting the Complete Bundle for ₹149. Most students choose the bundle for better value.
              </p>
            </details>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-br from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Join 500+ students who are already building their cybersecurity careers
          </p>

          <Button 
            size="lg"
            className="bg-black hover:bg-gray-900 text-yellow-400 font-bold px-12 py-6 text-xl rounded-lg shadow-xl"
            asChild
          >
            <a href="#courses-section">
              Get Started Now
            </a>
          </Button>

          <p className="text-sm text-black/70 mt-6">
            ✓ Instant access • ✓ Lifetime updates • ✓ Money-back guarantee
          </p>

        </div>
      </section>

    </div>
    <Footer />
    </>
  )
}