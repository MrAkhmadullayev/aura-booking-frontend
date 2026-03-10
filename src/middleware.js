import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

// Optional: define which routes require authentication
const protectedRoutes = ['/business', '/client', '/admin', '/employee']

export async function middleware(request) {
	const { pathname } = request.nextUrl
	const token = request.cookies.get('token')?.value

	// Define role-to-path mappings
	const rolePaths = {
		admin: '/admin',
		business: '/business',
		client: '/client',
		employee: '/employee',
	}

	// 1. Handle protected routes
	const isProtectedRoute = protectedRoutes.some(route =>
		pathname.startsWith(route),
	)

	if (isProtectedRoute) {
		if (!token) {
			return NextResponse.redirect(new URL('/login', request.url))
		}

		try {
			const secret = new TextEncoder().encode(
				process.env.JWT_SECRET || 'fallback_secret',
			)
			const { payload } = await jwtVerify(token, secret)
			const role = payload.role

			// Check for exact root path access (e.g., /client) and redirect to dashboard
			for (const [r, path] of Object.entries(rolePaths)) {
				if (pathname === path) {
					return NextResponse.redirect(
						new URL(`${path}/dashboard`, request.url),
					)
				}
			}

			// Strict RBAC: Check if user is trying to access another role's path
			for (const [r, path] of Object.entries(rolePaths)) {
				if (pathname.startsWith(path) && role !== r) {
					// Redirect to their own dashboard
					return NextResponse.redirect(
						new URL(`${rolePaths[role]}/dashboard`, request.url),
					)
				}
			}

			return NextResponse.next()
		} catch (error) {
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	// 2. Prevent authenticated users from accessing login/register
	if (pathname === '/login' || pathname === '/register') {
		if (token) {
			try {
				const secret = new TextEncoder().encode(
					process.env.JWT_SECRET || 'fallback_secret',
				)
				const { payload } = await jwtVerify(token, secret)
				const role = payload.role
				return NextResponse.redirect(
					new URL(`${rolePaths[role]}/dashboard`, request.url),
				)
			} catch (error) {
				return NextResponse.next()
			}
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}
