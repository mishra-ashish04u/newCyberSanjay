// hooks/useAuth.ts
import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

interface User {
  isLoggedIn: boolean
  uid?: string
  email?: string
  name?: string
  avatar?: string
  profile?: any
}

interface AuthState {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'users', currentUser.uid)
          const userDoc = await getDoc(userDocRef)
          
          if (userDoc.exists()) {
            const userData = userDoc.data()
            
            setUser({
              isLoggedIn: true,
              uid: currentUser.uid,
              email: userData.email || currentUser.email,
              name: userData.name || currentUser.displayName || 'User',
              avatar: currentUser.photoURL || generateAvatar(userData.name || 'User'),
              profile: userData.profile || {}
            })
          } else {
            setUser({
              isLoggedIn: true,
              uid: currentUser.uid,
              email: currentUser.email || '',
              name: currentUser.displayName || 'User',
              avatar: currentUser.photoURL || generateAvatar(currentUser.displayName || 'User'),
            })
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          setUser({ isLoggedIn: false })
        }
      } else {
        setUser({ isLoggedIn: false })
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setUser({ isLoggedIn: false })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return { user, loading, signOut }
}

// Helper function to generate avatar URL
function generateAvatar(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fef3c7&color=713f12&size=128`
}