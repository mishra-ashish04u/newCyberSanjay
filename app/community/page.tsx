"use client"

import { useEffect, useState } from "react"
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, increment, where } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Button } from "@/components/ui/button"
import { 
  Heart, MessageCircle, Share2, Users, Image as ImageIcon, 
  Send, X, Loader2, Hash, TrendingUp, Plus
} from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  imageUrl?: string
  hashtags: string[]
  type: "post" | "collab"
  likeCount: number
  commentCount: number
  repostCount: number
  createdAt: any
}

interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: any
}

export default function CommunityPage() {
  const [user] = useAuthState(auth)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All")

  // Create post states
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostImage, setNewPostImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isCollab, setIsCollab] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Comments
  const [expandedComments, setExpandedComments] = useState<string | null>(null)
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [newComment, setNewComment] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      )
      
      const querySnapshot = await getDocs(postsQuery)
      const postsData: Post[] = []
      
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() } as Post)
      })
      
      setPosts(postsData)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const extractHashtags = (text: string) => {
    const hashtagRegex = /#[\w]+/g
    return text.match(hashtagRegex) || []
  }

  const uploadImageToImgur = async (file: File) => {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID 546c25a59c58ad7" // Public Imgur client ID
      },
      body: formData
    })

    const data = await response.json()
    if (data.success) {
      return data.data.link
    }
    throw new Error("Image upload failed")
  }

  const handleCreatePost = async () => {
    if (!user || !newPostContent.trim()) return

    setUploading(true)
    try {
      let imageUrl = ""
      
      if (newPostImage) {
        imageUrl = await uploadImageToImgur(newPostImage)
      }

      const hashtags = extractHashtags(newPostContent)

      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userAvatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        content: newPostContent,
        imageUrl,
        hashtags,
        type: isCollab ? "collab" : "post",
        likeCount: 0,
        commentCount: 0,
        repostCount: 0,
        createdAt: new Date()
      })

      setNewPostContent("")
      setNewPostImage(null)
      setImagePreview("")
      setIsCollab(false)
      setShowCreateModal(false)
      fetchPosts()
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post")
    } finally {
      setUploading(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewPostImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLike = async (postId: string) => {
    if (!user) {
      alert("Please login to like posts")
      return
    }

    try {
      const likeId = `${postId}_${user.uid}`
      const likeRef = doc(db, "likes", likeId)
      
      // Check if already liked
      const likesQuery = query(
        collection(db, "likes"),
        where("postId", "==", postId),
        where("userId", "==", user.uid)
      )
      const likesSnapshot = await getDocs(likesQuery)

      if (likesSnapshot.empty) {
        // Like
        await addDoc(collection(db, "likes"), {
          postId,
          userId: user.uid,
          createdAt: new Date()
        })
        await updateDoc(doc(db, "posts", postId), {
          likeCount: increment(1)
        })
      } else {
        // Unlike
        await deleteDoc(doc(db, "likes", likesSnapshot.docs[0].id))
        await updateDoc(doc(db, "posts", postId), {
          likeCount: increment(-1)
        })
      }

      fetchPosts()
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const fetchComments = async (postId: string) => {
    try {
      const commentsQuery = query(
        collection(db, "comments"),
        where("postId", "==", postId),
        orderBy("createdAt", "asc")
      )
      const snapshot = await getDocs(commentsQuery)
      const commentsData: Comment[] = []
      snapshot.forEach(doc => {
        commentsData.push({ id: doc.id, ...doc.data() } as Comment)
      })
      setComments(prev => ({ ...prev, [postId]: commentsData }))
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const toggleComments = (postId: string) => {
    if (expandedComments === postId) {
      setExpandedComments(null)
    } else {
      setExpandedComments(postId)
      if (!comments[postId]) {
        fetchComments(postId)
      }
    }
  }

  const handleAddComment = async (postId: string) => {
    if (!user || !newComment[postId]?.trim()) return

    try {
      await addDoc(collection(db, "comments"), {
        postId,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userAvatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        content: newComment[postId],
        createdAt: new Date()
      })

      await updateDoc(doc(db, "posts", postId), {
        commentCount: increment(1)
      })

      setNewComment(prev => ({ ...prev, [postId]: "" }))
      fetchComments(postId)
      fetchPosts()
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const handleShare = (postId: string) => {
    const url = `${window.location.origin}/community/post/${postId}`
    navigator.clipboard.writeText(url)
    alert("Link copied to clipboard!")
  }

  const formatTimeAgo = (timestamp: any) => {
    if (!timestamp) return "just now"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  const filteredPosts = selectedFilter === "All" 
    ? posts 
    : posts.filter(post => post.type === selectedFilter.toLowerCase())

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100">
        <Loader2 className="w-12 h-12 text-yellow-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-700">Share, learn, and collaborate with fellow hackers</p>
        </div>

        {/* Create Post Button */}
        <div className="mb-6">
          <Button
            onClick={() => user ? setShowCreateModal(true) : alert("Please login to create posts")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            What's on your mind?
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto">
          {["All", "Post", "Collab"].map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                selectedFilter === filter
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-gray-700 hover:bg-yellow-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl border-2 border-yellow-300 overflow-hidden shadow-lg">
              
              {/* Post Header */}
              <div className="p-4 flex items-center gap-3">
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{post.userName}</h3>
                  <p className="text-sm text-gray-600">{formatTimeAgo(post.createdAt)}</p>
                </div>
                {post.type === "collab" && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Collab
                  </span>
                )}
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                {post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-yellow-600 hover:text-yellow-700 cursor-pointer font-semibold text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Image */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full max-h-96 object-cover"
                />
              )}

              {/* Engagement Bar */}
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">{post.likeCount}</span>
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{post.commentCount}</span>
                </button>

                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">{post.repostCount}</span>
                </button>
              </div>

              {/* Comments Section */}
              {expandedComments === post.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="space-y-3 mb-3">
                    {comments[post.id]?.map(comment => (
                      <div key={comment.id} className="flex gap-3">
                        <img
                          src={comment.userAvatar}
                          alt={comment.userName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1 bg-white rounded-lg p-3">
                          <p className="font-semibold text-sm text-gray-900">{comment.userName}</p>
                          <p className="text-gray-700 text-sm">{comment.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(comment.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {user ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment[post.id] || ""}
                        onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onKeyPress={(e) => e.key === "Enter" && handleAddComment(post.id)}
                      />
                      <Button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-center text-gray-600">Login to comment</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h3>
            <p className="text-gray-600">Be the first to share something!</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Create Post</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`}
                  alt="You"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-900">{user?.displayName || "Anonymous"}</p>
                  <p className="text-sm text-gray-600">Sharing with community</p>
                </div>
              </div>

              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind? Use #hashtags..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[150px] resize-none"
              />

              {imagePreview && (
                <div className="mt-4 relative">
                  <img src={imagePreview} alt="Preview" className="w-full rounded-lg max-h-96 object-cover" />
                  <button
                    onClick={() => {
                      setNewPostImage(null)
                      setImagePreview("")
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                  <ImageIcon className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-semibold text-gray-700">Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCollab}
                    onChange={(e) => setIsCollab(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Looking for Collab
                  </span>
                </label>
              </div>

              <Button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim() || uploading}
                className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}