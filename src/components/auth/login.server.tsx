// @/components/auth/login.server.tsx
"use server";
import { cookies } from 'next/headers';

export async function getCookieData() {
  const cookieDataRaw = cookies().get(process.env.NEXT_DIRECTUS_SESSION_TOKEN_NAME);
  if (cookieDataRaw !== undefined) {
    const cookieData = String(cookieDataRaw.value);
    return cookieData;
  }
  const cookieData = null;
  return cookieData;
}

export async function createCookie(cookieData) {
  const stringCookieData = String(cookieData);
  cookies().set({
    name: 'directus_token',
    value: stringCookieData,
    secure: true,
    sameSite: 'Lax',
    httpOnly: true,
    path: '/',
  })
}