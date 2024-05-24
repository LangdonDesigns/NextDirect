//create an async server function as a default export that uses cookies from next/navigation deleting all local cookies and StackSession
"use server";
import { cookies } from "next/headers";

export async function directusLogOut() {
  const cookieStore = cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
  cookieStore.delete({ name: process.env.DIRECTUS_SESSION_TOKEN_NAME });
  const cookieDirect = cookieStore.get(process.env.DIRECTUS_SESSION_TOKEN_NAME, { domain: process.env.DIRECTUS_SESSION_TOKEN_DOMAIN });
  //console.log('cookieDirect Exists', cookieDirect);
}