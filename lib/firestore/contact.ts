// lib/firestore/contact.ts
// Service for handling contact form submissions

import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactSubmission extends ContactFormData {
  status: 'new' | 'in-progress' | 'resolved'
  createdAt: any
  respondedAt?: any
  notes?: string
}

/**
 * Submit contact form to Firestore
 */
export async function submitContactForm(formData: ContactFormData) {
  try {
    const contactSubmission: ContactSubmission = {
      ...formData,
      status: 'new',
      createdAt: serverTimestamp(),
    }

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'contactSubmissions'), contactSubmission)

    console.log('Contact form submitted with ID:', docRef.id)
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}

/**
 * Firestore collection structure:
 * 
 * contactSubmissions/{submissionId}
 * ├── name: string
 * ├── email: string
 * ├── subject: string
 * ├── message: string
 * ├── status: 'new' | 'in-progress' | 'resolved'
 * ├── createdAt: timestamp
 * ├── respondedAt: timestamp (optional)
 * └── notes: string (optional, for admin use)
 */