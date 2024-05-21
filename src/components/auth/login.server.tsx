// @/components/auth/login.server.tsx
"use server";
import { cookies } from 'next/headers';
import { signIn } from "next-auth/react";

export async function getCookieData() {
  const cookieDataRaw = cookies().get(process.env.NEXT_DIRECTUS_SESSION_TOKEN_NAME);
  if (cookieDataRaw !== undefined) {
    const cookieData = String(cookieDataRaw.value);
    return cookieData;
  }
  const cookieData = null;
  return cookieData;
}

export async function handleLogin() {
  const cookieData = await getCookieData();
  if (cookieData) {
    const signInOptions = {
      cookieData,
      callbackUrl: "/",
      redirect: false,
    };
    await signIn("credentials", signInOptions);
  }
}
