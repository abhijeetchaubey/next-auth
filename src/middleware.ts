import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

  // helps in finding in what path u are
    const path = request.nextUrl.pathname

    const isPublicPath = path ==='/login' || path ==='/signup' || path==='/verifyemail'
    const token =request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/',request.nextUrl))
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login',request.nextUrl))

    }
}
 
export const config = {
  matcher:[
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}