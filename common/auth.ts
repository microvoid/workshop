import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export class AuthHelper {
  static AuthWhitelist = Object.values({
    home: '/',
  })

  static getSession(req: NextRequest) {
    return getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })
  }

  static redirectToSignin(req: NextRequest) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  static redirectIfSigned(req: NextRequest) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
}
