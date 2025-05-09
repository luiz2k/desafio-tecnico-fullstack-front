import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/sign-in"];
const REDIRECT_WHEN_NOT_AUTHENTICATED = "/sign-in";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicPaths.includes(path);
  const accessToken = request.cookies.get("access_token")?.value;

  // Se não estiver autenticado e for uma rota publica, não faz nada
  if (!accessToken && isPublicRoute) {
    return NextResponse.next();
  }

  // Se não estiver autenticado e não for uma rota publica, redireciona para a tela de login
  if (!accessToken && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  // Se estiver autenticado e for uma rota publica, redireciona para a tela de user
  if (accessToken && isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/user";

    return NextResponse.redirect(redirectUrl);
  }

  // Se estiver autenticado e não for uma rota publica, verifica a validade do token
  if (accessToken && !isPublicRoute) {
    const decoded = jwtDecode(accessToken);

    const tokenExpired = decoded.exp! < Date.now() / 1000;

    if (tokenExpired) {
      const redirectUrl = request.nextUrl.clone();

      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

      const response = NextResponse.redirect(redirectUrl);

      response.cookies.delete("access_token");

      return response;
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
