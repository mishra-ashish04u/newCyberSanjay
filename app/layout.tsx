import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cyber Sanjay | Your Cybersecurity Mentor",
  description:
    "Start your cybersecurity journey in just 7 days with our beginner-friendly starter kit + resume booster pack. Perfect for students with no prior experience.",
  generator: "cybersanjay.com",
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_io/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon_io/favicon.ico",
        type: "image/svg+xml",
      },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

