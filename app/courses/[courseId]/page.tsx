"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { Loader2, FileText, Download, ArrowLeft, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CourseViewerPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/auth/login')
        return
      }
      
      setUser(currentUser)
      await loadCourseFiles(currentUser.uid)
    })

    return () => unsubscribe()
  }, [])

  const loadCourseFiles = async (userId: string) => {
    try {
      const response = await fetch(`/api/course/${params.courseId}/files`, {
        headers: {
          'x-user-id': userId
        }
      })

      if (!response.ok) {
        if (response.status === 403) {
          alert('You do not have access to this course')
          router.push('/dashboard')
          return
        }
        throw new Error('Failed to load files')
      }

      const data = await response.json()
      setFiles(data.files)
    } catch (error) {
      console.error('Error loading files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewFile = (file: any) => {
    setSelectedFile(file)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-yellow-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-2xl font-bold text-gray-900">Course Materials</h1>
          <p className="text-gray-600">View and download your course files</p>
        </div>

        {/* Files Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {files.map((file) => (
            <div
              key={file.path}
              className="bg-white border-2 border-yellow-300 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{file.name}</h3>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleViewFile(file)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  onClick={() => window.open(file.tempUrl, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* PDF Viewer */}
        {selectedFile && (
          <div className="bg-white border-2 border-yellow-300 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{selectedFile.name}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Close
              </Button>
            </div>
            
            <div className="w-full h-[600px] border rounded">
              <iframe
                src={`${selectedFile.tempUrl}#toolbar=0`}
                className="w-full h-full"
                title={selectedFile.name}
              />
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-gray-700">
              <p>📧 Licensed to: {user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                This content is for personal use only. Sharing or distributing is prohibited.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
