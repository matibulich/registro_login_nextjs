import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NEXT_PUBLIC_STRAPI_URL } from "./lib/strapi";

function isProtectedRoute(pathname: string) {
    return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

export async function proxy(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;
    const isProtected = isProtectedRoute(currentPath);
    if (!isProtected) return NextResponse.next(); // Si no es una ruta protegida, continúa normalmente

    try {
        const cookieStore = await cookies();
        const jwt = cookieStore.get("jwt")?.value;
        if (!jwt) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const response = await fetch(`${NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });
        const userResponse = await response.json();
        console.log("proxy userResponse:", userResponse);

        if (!response.ok || !userResponse || userResponse.error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next(); // Usuario autenticado, continúa a la ruta protegida
    } catch (error) {
        console.error("Error en proxy:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
}