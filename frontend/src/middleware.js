// src/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Ab hum asli JWT token check karenge jo cookie mein save hoga
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Define routes
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isRootRoute = pathname === '/';

  // Condition 1: Agar token nahi hai aur user protected route par jana chahta hai
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Condition 2: Agar user logged in hai aur login/signup ya root ('/') par jana chahta hai
  if (token && (isAuthRoute || isRootRoute)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Sab theek hai toh request ko aage badhne do
  return NextResponse.next();
}

export const config = {
  // API routes aur static files ko middleware se exclude kiya hai
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}