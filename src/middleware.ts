import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const sessionId = req.cookies.get("session_id")?.value;

    if (!sessionId) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// Apply only to protected pages
export const config = {
    matcher: ["/me/:path*"],
};
