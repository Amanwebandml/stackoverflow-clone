import { NextRequest, NextResponse } from 'next/server'
import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storage.collection'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    await Promise.all([
        getOrCreateDB(),
        getOrCreateStorage()
    ])
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    // match all request path exceot the for the ones starting with:
    // /api
    // next/staic 
    // next/image
    // favicon
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/login",
    ],
}