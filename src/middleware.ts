import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";
import { GetServerSidePropsContext } from "next";

//export const config = { matcher: [] }
export const config = { matcher: ["/((?!api|_next/public|_next/static|_next/image|favicon.ico|login|reset|register|public|api/image|robots.txt|sitemap.xml).*)", "/lib", "/services", "/types"] }

export default auth((request: GetServerSidePropsContext[Request] & { auth: boolean | null }) => {
  const reqUrl = new URL(request.url);
  if (!request.auth && reqUrl?.pathname !== "/") {
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        request.url
      )
    );
  }
});