"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Clock, ArrowRight, Tag, TrendingUp } from "lucide-react"

export function BlogsSection() {
  // Mock blog data - replace with real Firestore data later
  const featuredBlog = {
    id: 1,
    title: "Complete Guide to Ethical Hacking for Beginners in 2025",
    excerpt: "Everything you need to know to start your ethical hacking journey. Learn the fundamentals, tools, and techniques used by cybersecurity professionals.",
    category: "Tutorial",
    date: "Jan 15, 2025",
    readTime: "8 min",
  }

  const recentBlogs = [
    {
      id: 2,
      title: "Top 10 Web Application Security Vulnerabilities",
      category: "Web Security",
      readTime: "5 min",
    },
    {
      id: 3,
      title: "Getting Started with Burp Suite",
      category: "Tools",
      readTime: "6 min",
    },
    {
      id: 4,
      title: "How to Build Your First Bug Bounty Report",
      category: "Bug Bounty",
      readTime: "7 min",
    },
  ]

  return (
    <section
      id="blogs-section"
      className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-gradient-to-b from-yellow-50 to-yellow-100"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Free Learning Resources</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Learn from Expert Insights
          </h2>
          
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
            50+ free tutorials, guides, and cybersecurity insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Featured Blog - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white border-2 border-yellow-300 rounded-xl p-5 sm:p-6 hover:border-yellow-500 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
            {/* Featured Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black px-4 py-1.5 rounded-bl-xl text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              FEATURED
            </div>

            <div className="grid sm:grid-cols-5 gap-4">
              {/* Icon Side */}
              <div className="sm:col-span-2 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-6 sm:p-8">
                <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-600" />
              </div>

              {/* Content Side */}
              <div className="sm:col-span-3 flex flex-col justify-center">
                <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold mb-3 w-fit">
                  {featuredBlog.category}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors leading-tight">
                  {featuredBlog.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                  {featuredBlog.excerpt}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{featuredBlog.date}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{featuredBlog.readTime} read</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-yellow-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Blogs - Stacked in 1 column */}
          <div className="space-y-4">
            <div className="bg-white border-2 border-yellow-300 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-yellow-600" />
                Recent Articles
              </h4>
              
              <div className="space-y-3">
                {recentBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="group cursor-pointer pb-3 border-b border-gray-200 last:border-0 last:pb-0 hover:pl-2 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-yellow-600">
                        {blog.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-yellow-600 transition-colors leading-snug">
                      {blog.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* View All CTA */}
            <Button
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-5 rounded-xl shadow-lg"
            >
              View All Blogs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-5 pt-4 border-t border-yellow-300">
          <div className="flex flex-wrap justify-center gap-2">
            {["All", "Web Security", "Tools", "Tutorials", "Bug Bounty", "News"].map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  category === "All"
                    ? "bg-yellow-400 text-black shadow-sm"
                    : "bg-white text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 border border-yellow-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}