// @/app/api/tokens/directusauth/route.ts
import { NextResponse } from 'next/server';
import { getCookieData } from '@/components/auth/login.server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const returnUrl = url.searchParams.get('return');

    const cookieData = await getCookieData();
    if (cookieData) {
      const redirectUrl = `${returnUrl}?directus=true`;
      return NextResponse.redirect(redirectUrl, { status: 302 });
    } else {
      const error = 'Invalid Provider Contact Webmaster';
      const redirectUrl = `${process.env.NEXTAUTH_URL}/login?error=${error}`;
      return NextResponse.redirect(redirectUrl, { status: 302 });
    }
  } catch (error) {
    console.error('Error during cookie login:', error);
    return NextResponse.json({ message: "An unexpected error occurred, please try again" }, { status: 500 });
  }
}