import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/admin');

  if (isAdminPath) {
    if (process.env.NODE_ENV === 'production' && process.env.ENABLE_ADMIN_PANEL !== 'true') {
      // Rewrite to 404 to completely hide the admin panel
      request.nextUrl.pathname = '/404';
      return NextResponse.rewrite(request.nextUrl);
    }

    // Basic Authentication for Admin Panel
    const basicAuth = request.headers.get('authorization');
    console.log('Incoming basicAuth header:', basicAuth ? 'Present' : 'Not Present');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      console.log('Parsed user:', user, 'Expected:', process.env.ADMIN_USERNAME);

      if (
        user === process.env.ADMIN_USERNAME &&
        pwd === process.env.ADMIN_PASSWORD
      ) {
        return NextResponse.next();
      }
    }

    // If no valid auth provided, prompt for credentials
    console.log('No valid auth, returning 401');
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin',
    '/api/admin/:path*',
  ],
};
