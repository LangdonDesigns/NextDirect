// @/components/auth/resetPassword.server.tsx
"use server";
import Directus from '@/services/directus';
import { passwordRequest } from '@directus/sdk';

export async function directusPasswordReset(user_email: string) {
  const client = Directus();
  const reset_url = process.env.NEXT_PUBLIC_NEXTAUTH_URL+'/reset';
  const result = await client.request(passwordRequest(user_email, reset_url));
  if ((result as unknown as { status?: number })?.status === 204) {
    return 'Success! Check your email inbox for a password reset link.';
  }
  return result;
}