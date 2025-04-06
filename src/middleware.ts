import { NextRequest, NextResponse } from "next/server";
import { getSession } from '@/helpers/session';
import { User } from '@/interfaces/User';

export default async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	if (pathname === "/") {
		try {
			const user = await getSession() as User | null;

			if (!user) {
				return NextResponse.redirect(new URL('/auth/customer/sign-in', req.url));
			}

			const redirectUrl = user.key === "ADMIN"
				? "/admin/customers"
				: "/customer/machine-panel";

			return NextResponse.redirect(new URL(redirectUrl, req.url));
		} catch (error) {
			console.error('Middleware error:', error);
			return NextResponse.redirect(new URL('/auth/error', req.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};