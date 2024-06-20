// @/components/auth/logout.server.tsx
'use server';
import { cookies } from 'next/headers';

export async function DirectusLogOut() {
  const cookieStore = cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
  cookieStore.delete({ name: process.env.DIRECTUS_SESSION_TOKEN_NAME || "directus_session_token", domain: process.env.DIRECTUS_SESSION_TOKEN_DOMAIN || "localhost" });
  const cookieDirect = cookieStore.get(process.env.DIRECTUS_SESSION_TOKEN_NAME || "directus_session_token");
  //console.log('cookieDirect Exists', cookieDirect);
  //TODO: Impliment another way to delete the cookie.  It still remains due to next/headers when on alternative domain. 
}