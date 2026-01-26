// app/api/view-pdf/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { hasUserPurchased } from '@/lib/firestore/purchases-admin' // ← Changed import
import { getAuth } from 'firebase-admin/auth'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

// Initialize Firebase Admin
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

// Product ID to GitHub path mapping
const PRODUCT_PATHS: Record<string, string> = {
  'starter_kit_pdf_2024': 'starter-kit/starter-kit.pdf',
  'resume_pack_pdf_2024': 'resume-pack/resume-pack.pdf',
  'complete_bundle_2024': 'starter-kit/starter-kit.pdf'
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    console.log('🚀 /api/view-pdf - GET request received')
    
    const { productId } = await params
    console.log('📦 Product ID:', productId)
    
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No authorization header')
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split('Bearer ')[1]
    
    let decodedToken
    try {
      decodedToken = await getAuth().verifyIdToken(token)
      console.log('✅ Token verified for user:', decodedToken.uid)
    } catch (error: any) {
      console.error('❌ Token verification failed:', error.message)
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid token' },
        { status: 401 }
      )
    }

    const userId = decodedToken.uid

    console.log('🔐 Checking purchase authorization...')
    const hasPurchased = await hasUserPurchased(userId, productId)
    
    if (!hasPurchased) {
      console.log('🚫 User has not purchased this product')
      return NextResponse.json(
        { success: false, error: 'You have not purchased this product' },
        { status: 403 }
      )
    }

    console.log('✅ Purchase verified, fetching PDF...')

    const githubPath = PRODUCT_PATHS[productId]
    
    if (!githubPath) {
      console.log('❌ Product path not found for:', productId)
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    const githubUrl = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${githubPath}`
    
    console.log('📥 Fetching from GitHub:', githubUrl)
    
    const response = await fetch(githubUrl, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'CyberSanjay-App'
      }
    })

    if (!response.ok) {
      console.error('❌ GitHub API error:', {
        status: response.status,
        statusText: response.statusText
      })
      return NextResponse.json(
        { success: false, error: 'Failed to fetch PDF from repository' },
        { status: 500 }
      )
    }

    console.log('✅ PDF fetched successfully, streaming to client...')

    const pdfBuffer = await response.arrayBuffer()

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="document.pdf"',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
      }
    })

  } catch (error: any) {
    console.error('❌ Error in /api/view-pdf:', error)
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to view PDF' },
      { status: 500 }
    )
  }
}