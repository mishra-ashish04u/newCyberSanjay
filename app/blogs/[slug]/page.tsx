"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Calendar, User, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

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

export default function BlogPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const blogsQuery = query(
        collection(db, "blogs"),
        where("slug", "==", slug),
        where("published", "==", true)
      )
      
      const querySnapshot = await getDocs(blogsQuery)
      
      if (querySnapshot.empty) {
        setNotFound(true)
      } else {
        const blogData = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data()
        } as Blog
        setBlog(blogData)
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Recently"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    )
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blogs">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blogs</span>
        </Link>

        {/* Blog Header */}
        <article className="bg-white border-2 border-yellow-300 rounded-xl overflow-hidden shadow-lg">
          
          {/* Featured Image */}
          {blog.imageUrl && (
            <div className="aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8 md:p-12">
            
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b-2 border-yellow-200">
              {blog.category && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                    {blog.category}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold">{blog.author}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-yellow-600" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span>{calculateReadTime(blog.content)}</span>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
              />
            </div>

          </div>
        </article>

        {/* Back to Blogs CTA */}
        <div className="mt-8 text-center">
          <Link href="/blogs">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-6 text-lg rounded-xl shadow-lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Read More Articles
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}