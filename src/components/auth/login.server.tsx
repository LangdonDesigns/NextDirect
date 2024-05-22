// @/components/auth/login.server.tsx
"use server";
import { cookies } from 'next/headers';

export async function getCookieData() {
  const cookieDataRaw = cookies().get(process.env.DIRECTUS_SESSION_TOKEN_NAME, { domain: process.env.DIRECTUS_SESSION_TOKEN_DOMAIN });
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