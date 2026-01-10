import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // 🔐 Protect routes
  if (!user && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/sign-up", request.url))
  }

  if (!user && path.startsWith("/downloads")) {
    return NextResponse.redirect(new URL("/auth/sign-up", request.url))
  }

  if (!user && path.startsWith("/checkout")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (!user && path.startsWith("/view")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (!user && path.startsWith("/download")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // 🚫 Block auth pages for logged-in users
  if (user && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}
