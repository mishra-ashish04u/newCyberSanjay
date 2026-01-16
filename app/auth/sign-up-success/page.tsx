"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="border-border text-center">
          <CardHeader className="space-y-4">
            <div className="text-5xl">🎉</div>
            <CardTitle className="text-2xl">Account Created!</CardTitle>
            <CardDescription className="text-base">
              Your account has been successfully created. Log in to access your purchases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/login">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
