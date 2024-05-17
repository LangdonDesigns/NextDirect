import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register|reset|public).*)", "/lib", "/services", "/types"] }

export default auth((req) => {
  const reqUrl = new URL(req.url);
  if (!req.auth && reqUrl?.pathname !== "/") {
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  }
});