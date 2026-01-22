"use client"

import { useEffect, useState } from "react"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, ArrowRight, Tag, Loader2 } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category?: string
  imageUrl?: string
  published: boolean
  createdAt: any
  updatedAt: any
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Filter blogs by category
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory)

  const fetchBlogs = async () => {
    try {
      // Simplified query - fetch all blogs and filter in code
      const blogsQuery = collection(db, "blogs")
      
      const querySnapshot = await getDocs(blogsQuery)
      const blogsData: Blog[] = []
      
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // Only include published blogs
        if (data.published === true) {
          // Handle both 'slug' and 'Slug' (case insensitive)
          const blogData: Blog = {
            id: doc.id as string,
            title: data.title || '',
            slug: data.slug || data.Slug || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            author: data.author || '',
            category: data.category,
            imageUrl: data.imageUrl,
            published: data.published,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          }
          blogsData.push(blogData)
        }
      })
      
      // Sort by date in code (newest first)
      blogsData.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0)
        const dateB = b.createdAt?.toDate?.() || new Date(0)
        return dateB.getTime() - dateA.getTime()
      })
      
      setBlogs(blogsData)
    } catch (error) {
      console.error("Error fetching blogs:", error)
      alert("Error loading blogs. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Recently"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min`
  }

  if (loading) {
    const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory)

  // Debug: Check for missing slugs
  filteredBlogs.forEach(blog => {
    if (!blog.slug) {
      console.error("Blog missing slug:", blog)
    }
  })

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
  <>
    <Header />
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Blog</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cybersecurity Insights
          </h1>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Learn ethical hacking, web security, and bug bounty hunting from expert tutorials
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {["All", "Tutorial", "Web Security", "Tools", "Bug Bounty", "News"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  category === selectedCategory
                    ? "bg-yellow-400 text-black shadow-md"
                    : "bg-white text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 border border-yellow-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {selectedCategory === "All" ? "No blogs yet" : `No blogs in ${selectedCategory} category`}
            </h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={blog.slug ? `/blogs/${blog.slug}` : '#'}
                className="group bg-white border-2 border-yellow-300 rounded-xl overflow-hidden hover:border-yellow-500 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                {blog.imageUrl ? (
                  <div className="aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-yellow-600" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  {blog.category && (
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold mb-2">
                      {blog.category}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{formatDate(blog.createdAt)}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{calculateReadTime(blog.content)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-yellow-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
     </>
  )
}