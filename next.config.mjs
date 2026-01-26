/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.google.com https://*.gstatic.com https://*.firebaseapp.com https://vercel.live https://va.vercel-scripts.com https://*.cashfree.com",
              "connect-src 'self' https://*.googleapis.com https://*.google.com https://*.firebaseio.com wss://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.cashfree.com",
              "frame-src 'self' https://*.google.com https://*.firebaseapp.com https://accounts.google.com https://*.cashfree.com",
              "img-src 'self' data: https: blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "worker-src 'self' blob:",
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig