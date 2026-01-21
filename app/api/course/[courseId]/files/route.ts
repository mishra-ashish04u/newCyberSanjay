import { NextRequest, NextResponse } from 'next/server'
import { GitHubStorage } from '@/lib/github-storage'
import { auth, db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    // Get user from session (you'll need to implement auth middleware)
    const userId = req.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { courseId } = params

    // Verify user has purchased this course
    const purchasesRef = collection(db, 'users', userId, 'purchases')
    const q = query(purchasesRef, where('courseId', '==', courseId))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Course not purchased' },
        { status: 403 }
      )
    }

    // Get files from GitHub
    const github = new GitHubStorage()
    const files = await github.listCourseFiles(courseId)

    // Generate temporary URLs
    const filesWithUrls = await Promise.all(
      files.map(async (file) => ({
        ...file,
        tempUrl: await github.generateTempUrl(file.path, userId)
      }))
    )

    return NextResponse.json({ files: filesWithUrls })
  } catch (error) {
    console.error('Error fetching course files:', error)
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    )
  }
}