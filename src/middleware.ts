import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'https://www.ohg365.com')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const fallbackOrigin = allowedOrigins[0] ?? '*';

function getAllowedOrigin(requestOrigin: string | null): string {
  if (!requestOrigin) {
    return fallbackOrigin;
  }

  if (allowedOrigins.includes('*') || allowedOrigins.includes(requestOrigin)) {
    return requestOrigin;
  }

  return fallbackOrigin;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS for API routes
  if (pathname.startsWith('/api/jobcy')) {
    const response =
      request.method === 'OPTIONS'
        ? new NextResponse(null, { status: 204 })
        : NextResponse.next();

    const origin = getAllowedOrigin(request.headers.get('origin'));
    const requestHeaders =
      request.headers.get('access-control-request-headers') ??
      'Content-Type, Authorization, X-Requested-With';

    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    response.headers.set('Access-Control-Allow-Headers', requestHeaders);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Vary', 'Origin');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/jobcy/:path*'],
};

