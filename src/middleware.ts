import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateJWT } from "./app/actions";

const deleteCookie = async (request: NextRequest): Promise<void> => {
    await request.cookies.delete("token");
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const token = request.cookies.get("token");

    if (!token)
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));

    const validated = await validateJWT(token.value);

    if (!validated) {
        await deleteCookie(request);
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    if (request.nextUrl.pathname === "/")
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)"]
};