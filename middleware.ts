import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/admin');

  if (isAdminPath) {
    if (process.env.NODE_ENV === 'production' && process.env.ENABLE_ADMIN_PANEL !== 'true') {
      // Rewrite to 404 to completely hide the admin panel
      request.nextUrl.pathname = '/404';
      return NextResponse.rewrite(request.nextUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
