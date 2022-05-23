import { NextResponse } from 'next/server'

const secret = process.env.SECRET

export default function middleware(req) {
  const { cookies } = req
  const jwt = cookies.OursiteJWT
  const { pathname } = req.nextUrl

  if (pathname.includes('/leaderboard')) {
    return NextResponse.next()
  }

  if (pathname.includes('/login')) {
    if (jwt) {
      try {
        return NextResponse.redirect(new URL('/home', req.url))
      } catch (e) {
        return NextResponse.next()
      }
    }
  }

  if (pathname.includes('.jpg')) {
    return NextResponse.next()
  }
  if (pathname.includes('.svg')) {
    return NextResponse.next()
  }
  if (pathname.includes('.png')) {
    return NextResponse.next()
  }
  if (pathname.includes('../api/auth/log')) {
    return NextResponse.next()
  }
  if (pathname.includes('/api/auth/log')) {
    return NextResponse.next()
  }

  if (pathname.includes('/userdata')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    try {
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  if (pathname.includes('/home')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    try {
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (pathname.includes('/sign')) {
    if (jwt) {
      try {
        return NextResponse.redirect(new URL('/home', req.url))
      } catch (e) {
        return NextResponse.next()
      }
    }
  }
  if (pathname.includes('/')) {
    if (jwt) {
      try {
        return NextResponse.redirect(new URL('/home', req.url))
      } catch (e) {
        return NextResponse.next()
      }
    }
  }

  return NextResponse.next()
}
