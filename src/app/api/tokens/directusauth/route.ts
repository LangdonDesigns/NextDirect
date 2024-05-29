// @/app/api/tokens/directusauth/route.ts
import { NextResponse } from 'next/server';
import { authOptions } from '@/auth';
import { getCookieData, createCookie } from '@/components/auth/login.server';
import { GetUrlReturn } from '@/components/auth/getUrl.client';

export async function GET(request: Request) {
  try {
    const cookieData = await getCookieData();
    if (cookieData) {
      //createCookie(cookieData); //redundancy to create a backup cookie on the local domain if needed
      const redirectUrl = `${process.env.NEXTAUTH_URL}/login?directus=true`;
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