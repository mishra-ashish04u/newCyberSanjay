"use client"

import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Heart, Share2, TrendingUp } from "lucide-react"

export function CommunitySection() {
  // Mock community posts - replace with real Firestore data later
  const communityPosts = [
    {
      id: 1,
      author: { name: "Rahul Sharma", avatar: "RS" },
      content: "Just found an amazing SQL injection tutorial! Finally understanding how it works 🎉",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      author: { name: "Priya Singh", avatar: "PS" },
      content: "Can someone help me understand XSS attacks? Looking for good resources.",
      likes: 23,
      comments: 18,
    },
  ]

  return (
    <section
      id="community-section"
      className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Community</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Join Our Growing Community
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Connect with 500+ cybersecurity learners, share resources, and grow together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Community Preview */}
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl border-2 border-yellow-200 p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
              Recent Activity
            </h3>

            <div className="space-y-3 mb-4">
              {communityPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg p-3 border border-yellow-200 hover:border-yellow-400 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                      {post.author.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm">{post.author.name}</h4>
                      <p className="text-xs text-gray-700 leading-relaxed mt-1">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-600 ml-10">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-yellow-200">
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600">523</div>
                <div className="text-xs text-gray-600">Members</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600">1.2K</div>
                <div className="text-xs text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600">150+</div>
                <div className="text-xs text-gray-600">Daily Active</div>
              </div>
            </div>
          </div>

          {/* Right: Benefits & CTA */}
          <div className="flex flex-col justify-center">
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Ask Questions & Get Help</h4>
                  <p className="text-xs text-gray-600">Expert guidance from the community</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Share Your Projects</h4>
                  <p className="text-xs text-gray-600">Showcase your work and get feedback</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Network with Peers</h4>
                  <p className="text-xs text-gray-600">Connect with like-minded learners</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Daily Tips & Resources</h4>
                  <p className="text-xs text-gray-600">Learn something new every day</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-5 rounded-lg shadow-lg"
              >
                Join Community — Free
                <Users className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-center text-xs text-gray-500">
                100% Free • No Credit Card • Join 500+ Members
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}