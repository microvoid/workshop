import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { AuthHelper } from '@/common'

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // If it's the root path, just render it
  if (AuthHelper.AuthWhitelist.includes(path)) {
    return NextResponse.next()
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!session && path === '/protected') {
    return AuthHelper.redirectToSignin(req)
  }

  if (session && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/protected', req.url))
  }

  return NextResponse.next()
}
