import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({req, res})

  const {data: {session}} = await supabase.auth.getSession()
  const publicUrls = ['/reset']

  if(publicUrls.includes(req.nextUrl.pathname)) {
    return res
  }

  if(!session) {
    // console.log('there is no session')
    return NextResponse.rewrite(new URL('/', req.url))
  }

  if(session) {
    // console.log('you have session')
    return NextResponse.rewrite(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard']
}