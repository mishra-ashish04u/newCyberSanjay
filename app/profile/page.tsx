"use client"

import { useState, useEffect } from "react"
import { User, Mail, MapPin, GraduationCap, Briefcase, Target, Code, Edit2, Camera, Linkedin, Github, Twitter, Globe, Instagram } from "lucide-react"

// Firebase Web SDK via CDN
declare global {
  interface Window {
    firebase: any;
  }
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "learning" | "purchases" | "activity">("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photoURL: "",
    bio: "",
    badge: "",
    country: "",
    state: "",
    education: "",
    currentRole: "",
    experienceLevel: "",
    careerGoal: "",
    skills: "",
    qualification: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      website: "",
      instagram: ""
    }
  })
  const [purchases, setPurchases] = useState<any[]>([])
  const [loadingPurchases, setLoadingPurchases] = useState(false)

  // Initialize Firebase
  useEffect(() => {
    const initFirebase = async () => {
      // Load Firebase SDK
      const script1 = document.createElement('script')
      script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js'
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js'
      document.head.appendChild(script2)

      const script3 = document.createElement('script')
      script3.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js'
      document.head.appendChild(script3)

      script3.onload = () => {
        // Initialize Firebase with your config
        const firebaseConfig = {
          apiKey: "AIzaSyDkeBMTJ1LVr5kQxMc8kdW_3twNo1OxRXo",
          authDomain: "cyber-sanjay.firebaseapp.com",
          projectId: "cyber-sanjay",
          storageBucket: "cyber-sanjay.firebasestorage.app",
          messagingSenderId: "251552621457",
          appId: "1:251552621457:web:ffd7707d2383a121397030"
        }

        if (!window.firebase.apps.length) {
          window.firebase.initializeApp(firebaseConfig)
        }

        // Listen to auth state
        window.firebase.auth().onAuthStateChanged((user: any) => {
          if (user) {
            setUserId(user.uid)
            loadUserData(user.uid, user.email || "", user.photoURL || "")
          } else {
            setLoading(false)
          }
        })
      }
    }

    initFirebase()
  }, [])

  // Load user data from Firestore
  const loadUserData = async (uid: string, userEmail: string, userPhotoURL: string) => {
    try {
      const db = window.firebase.firestore()
      const userDoc = await db.collection('users').doc(uid).get()

      // Get Google profile photo URL from email if not provided
      let photoUrl = userPhotoURL
      if (!photoUrl && userEmail) {
        // Try to get from Firebase Auth profile
        const currentUser = window.firebase.auth().currentUser
        if (currentUser && currentUser.photoURL) {
          photoUrl = currentUser.photoURL
        } else {
          // Fallback: Use Google's profile photo API with email
          photoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userEmail)}&size=200&background=FCD34D&color=1F2937&bold=true`
        }
      }

      if (userDoc.exists) {
        const data = userDoc.data()
        setProfileData({
          name: data.name || "User",
          email: userEmail,
          photoURL: photoUrl,
          bio: data.profile?.bio || "No bio added yet. Tell us about yourself!",
          badge: data.profile?.experienceLevel || "Beginner",
          country: data.profile?.country || "Not specified",
          state: data.profile?.state || "Not specified",
          education: data.profile?.education || "Not specified",
          currentRole: data.profile?.currentRole || "Not specified",
          experienceLevel: data.profile?.experienceLevel || "Not specified",
          careerGoal: data.profile?.careerGoal || "Not specified",
          skills: data.profile?.skills || "Not specified",
          qualification: data.profile?.qualification || "Not specified",
          socialLinks: {
            linkedin: data.profile?.socialLinks?.linkedin || "",
            github: data.profile?.socialLinks?.github || "",
            twitter: data.profile?.socialLinks?.twitter || "",
            website: data.profile?.socialLinks?.website || "",
            instagram: data.profile?.socialLinks?.instagram || ""
          }
        })
      } else {
        // If no user doc exists, still set basic info
        setProfileData(prev => ({
          ...prev,
          email: userEmail,
          photoURL: photoUrl
        }))
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleProfileUpdate = async () => {
    if (!userId) return

    try {
      const db = window.firebase.firestore()
      await db.collection('users').doc(userId).update({
        "profile.bio": profileData.bio,
        "profile.country": profileData.country,
        "profile.state": profileData.state,
        "profile.education": profileData.education,
        "profile.currentRole": profileData.currentRole,
        "profile.experienceLevel": profileData.experienceLevel,
        "profile.careerGoal": profileData.careerGoal,
        "profile.skills": profileData.skills,
        "profile.qualification": profileData.qualification,
        "profile.socialLinks": profileData.socialLinks
      })
      
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    }
  }

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.bio,
      profileData.country,
      profileData.state,
      profileData.education,
      profileData.currentRole,
      profileData.experienceLevel,
      profileData.careerGoal,
      profileData.skills
    ]
    
    const filledFields = fields.filter(field => field && field !== "Not specified" && field !== "No bio added yet. Tell us about yourself!").length
    return Math.round((filledFields / fields.length) * 100)
  }

  // Load purchases from Firestore
  const loadPurchases = async (uid: string) => {
    setLoadingPurchases(true)
    try {
      const db = window.firebase.firestore()
      
      // Method 1: Get purchases from separate collection
      const purchasesSnapshot = await db.collection('purchases')
        .where('userId', '==', uid)
        .orderBy('purchaseDate', 'desc')
        .get()
      
      const purchasesList = purchasesSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setPurchases(purchasesList)
    } catch (error) {
      console.error("Error loading purchases:", error)
      
      // Fallback: Try getting from user document
      try {
        const db = window.firebase.firestore()
        const userDoc = await db.collection('users').doc(uid).get()
        if (userDoc.exists) {
          const data = userDoc.data()
          const purchasedItems = data.purchasedItems || []
          setPurchases(purchasedItems)
        }
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError)
      }
    } finally {
      setLoadingPurchases(false)
    }
  }

  // Load purchases when switching to purchases tab
  useEffect(() => {
    if (activeTab === "purchases" && userId && purchases.length === 0) {
      loadPurchases(userId)
    }
  }, [activeTab, userId])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </main>
    )
  }

  const profileCompletion = calculateProfileCompletion()

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= HEADER CARD ================= */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Cover Banner */}
          <div className="h-32 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 gap-6">
              {/* Left: Avatar + Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
                    {profileData.photoURL ? (
                      <img 
                        src={profileData.photoURL} 
                        alt={profileData.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // If image fails to load, show fallback
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <User className={`fallback-icon w-16 h-16 text-yellow-600 ${profileData.photoURL ? 'hidden' : ''}`} />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4 text-gray-800" />
                  </button>
                </div>

                {/* Name & Email */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <p className="text-sm">{profileData.email}</p>
                  </div>
                  <span className="inline-block text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1.5 rounded-full font-medium border border-yellow-200">
                    🏆 {profileData.badge}
                  </span>
                </div>
              </div>

              {/* Right: Stats + Edit Button */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 px-6 py-4 rounded-2xl border border-yellow-200">
                  <p className="text-xs text-gray-600 mb-1">Profile completion</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{profileCompletion}%</p>
                  </div>
                </div>
                <button 
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Bio
              </h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full p-3 border border-yellow-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Social Links Section */}
            <div className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Social Links
              </h3>
              
              {isEditing ? (
                <div className="space-y-3">
                  <SocialLinkInput
                    icon={Linkedin}
                    label="LinkedIn"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={profileData.socialLinks.linkedin}
                    onChange={(val) => setProfileData({
                      ...profileData,
                      socialLinks: {...profileData.socialLinks, linkedin: val}
                    })}
                  />
                  <SocialLinkInput
                    icon={Github}
                    label="GitHub"
                    placeholder="https://github.com/yourusername"
                    value={profileData.socialLinks.github}
                    onChange={(val) => setProfileData({
                      ...profileData,
                      socialLinks: {...profileData.socialLinks, github: val}
                    })}
                  />
                  <SocialLinkInput
                    icon={Twitter}
                    label="Twitter/X"
                    placeholder="https://twitter.com/yourusername"
                    value={profileData.socialLinks.twitter}
                    onChange={(val) => setProfileData({
                      ...profileData,
                      socialLinks: {...profileData.socialLinks, twitter: val}
                    })}
                  />
                  <SocialLinkInput
                    icon={Globe}
                    label="Website"
                    placeholder="https://yourwebsite.com"
                    value={profileData.socialLinks.website}
                    onChange={(val) => setProfileData({
                      ...profileData,
                      socialLinks: {...profileData.socialLinks, website: val}
                    })}
                  />
                  <SocialLinkInput
                    icon={Instagram}
                    label="Instagram"
                    placeholder="https://instagram.com/yourusername"
                    value={profileData.socialLinks.instagram}
                    onChange={(val) => setProfileData({
                      ...profileData,
                      socialLinks: {...profileData.socialLinks, instagram: val}
                    })}
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {profileData.socialLinks.linkedin && (
                    <SocialButton icon={Linkedin} url={profileData.socialLinks.linkedin} color="bg-blue-500" />
                  )}
                  {profileData.socialLinks.github && (
                    <SocialButton icon={Github} url={profileData.socialLinks.github} color="bg-gray-800" />
                  )}
                  {profileData.socialLinks.twitter && (
                    <SocialButton icon={Twitter} url={profileData.socialLinks.twitter} color="bg-sky-500" />
                  )}
                  {profileData.socialLinks.website && (
                    <SocialButton icon={Globe} url={profileData.socialLinks.website} color="bg-green-500" />
                  )}
                  {profileData.socialLinks.instagram && (
                    <SocialButton icon={Instagram} url={profileData.socialLinks.instagram} color="bg-pink-500" />
                  )}
                  {!profileData.socialLinks.linkedin && 
                   !profileData.socialLinks.github && 
                   !profileData.socialLinks.twitter && 
                   !profileData.socialLinks.website && 
                   !profileData.socialLinks.instagram && (
                    <p className="text-gray-500 text-sm">No social links added yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="bg-white rounded-2xl shadow-md p-1 flex gap-2">
          {[
            { key: "overview", label: "Overview", icon: User },
            { key: "learning", label: "Learning", icon: GraduationCap },
            { key: "purchases", label: "Purchases", icon: Briefcase },
            { key: "activity", label: "Activity", icon: Target },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 shadow-md"
                  : "text-gray-600 hover:bg-yellow-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Personal Information</h3>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <InfoCard 
                  icon={MapPin} 
                  label="Country" 
                  value={profileData.country} 
                  isEditing={isEditing}
                  onChange={(val) => setProfileData({...profileData, country: val})}
                />
                <InfoCard 
                  icon={MapPin} 
                  label="State" 
                  value={profileData.state} 
                  isEditing={isEditing}
                  onChange={(val) => setProfileData({...profileData, state: val})}
                />
                <InfoCard 
                  icon={GraduationCap} 
                  label="Education" 
                  value={profileData.education} 
                  isEditing={isEditing}
                  onChange={(val) => setProfileData({...profileData, education: val})}
                />
                <InfoCard 
                  icon={Briefcase} 
                  label="Current Role" 
                  value={profileData.currentRole} 
                  isEditing={isEditing}
                  onChange={(val) => setProfileData({...profileData, currentRole: val})}
                />
                <div className="col-span-2">
                  <InfoCard 
                    icon={Target} 
                    label="Experience Level" 
                    value={profileData.experienceLevel} 
                    isEditing={isEditing}
                    onChange={(val) => setProfileData({...profileData, experienceLevel: val})}
                  />
                </div>
              </div>
            </div>

            {/* Career Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Career Details</h3>
              </div>

              <div className="space-y-5">
                <InfoCard 
                  icon={Target} 
                  label="Career Goal" 
                  value={profileData.careerGoal} 
                  isEditing={isEditing} 
                  fullWidth
                  onChange={(val) => setProfileData({...profileData, careerGoal: val})}
                />
                <InfoCard 
                  icon={Code} 
                  label="Skills" 
                  value={profileData.skills} 
                  isEditing={isEditing} 
                  fullWidth
                  onChange={(val) => setProfileData({...profileData, skills: val})}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "learning" && (
          <EmptyState 
            icon={GraduationCap}
            text="Your learning journey will appear here soon." 
            subtext="Enroll in courses to start tracking your progress"
          />
        )}

        {activeTab === "purchases" && (
          loadingPurchases ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-md border border-gray-100">
              <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading purchases...</p>
            </div>
          ) : purchases.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={Briefcase}
              text="No purchases yet" 
              subtext="Browse our catalog to find courses and PDFs that match your goals"
            />
          )
        )}

        {activeTab === "activity" && (
          <EmptyState 
            icon={Target}
            text="Your community activity will show here." 
            subtext="Engage with the community to see your activity timeline"
          />
        )}

        {/* Save Button (shown when editing) */}
        {isEditing && (
          <div className="fixed bottom-8 right-8">
            <button 
              onClick={handleProfileUpdate}
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

/* ================= COMPONENTS ================= */

function InfoCard({ icon: Icon, label, value, isEditing, fullWidth = false, onChange }: { 
  icon: any
  label: string
  value: string
  isEditing: boolean
  fullWidth?: boolean
  onChange?: (value: string) => void
}) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      </div>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
        />
      ) : (
        <p className="font-semibold text-gray-900">{value}</p>
      )}
    </div>
  )
}

function EmptyState({ icon: Icon, text, subtext }: { icon: any, text: string, subtext: string }) {
  return (
    <div className="bg-white rounded-2xl p-16 text-center shadow-md border border-gray-100">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-yellow-100 rounded-2xl">
          <Icon className="w-12 h-12 text-yellow-600" />
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-2">{text}</p>
      <p className="text-sm text-gray-500">{subtext}</p>
    </div>
  )
}

function SocialLinkInput({ icon: Icon, label, placeholder, value, onChange }: {
  icon: any
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-1">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
      />
    </div>
  )
}

function SocialButton({ icon: Icon, url, color }: { icon: any, url: string, color: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} hover:opacity-90 text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105`}
    >
      <Icon className="w-5 h-5" />
    </a>
  )
}

function PurchaseCard({ purchase }: { purchase: any }) {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const isPDF = purchase.type === 'pdf'
  const bgColor = isPDF ? 'from-red-50 to-pink-50' : 'from-blue-50 to-indigo-50'
  const badgeColor = isPDF ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'

  return (
    <div className={`bg-gradient-to-br ${bgColor} rounded-2xl p-5 border shadow-md hover:shadow-xl transition-all`}>
      {/* Thumbnail */}
      {purchase.thumbnail && (
        <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-white">
          <img 
            src={purchase.thumbnail} 
            alt={purchase.itemName}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 line-clamp-2">{purchase.itemName || "Purchased Item"}</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${badgeColor}`}>
            {isPDF ? "PDF" : "Course"}
          </span>
        </div>
        
        {purchase.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{purchase.description}</p>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm text-gray-500">
            <p className="font-medium">₹{purchase.price || 0}</p>
            <p className="text-xs">{formatDate(purchase.purchaseDate)}</p>
          </div>
          
          <button 
            onClick={() => {
              // Navigate to the item or download PDF
              if (purchase.downloadUrl) {
                window.open(purchase.downloadUrl, '_blank')
              } else if (purchase.courseUrl) {
                window.location.href = purchase.courseUrl
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all"
          >
            {isPDF ? "Download" : "Open Course"}
          </button>
        </div>
      </div>
    </div>
  )
}