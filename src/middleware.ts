import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    let loggedin = request.cookies.get('token');
    if (!loggedin) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

export const config = {
    matcher: ['/dashboard/:path*'],
}