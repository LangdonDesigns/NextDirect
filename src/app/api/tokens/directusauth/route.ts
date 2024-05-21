// @/app/api/tokens/directusauth/route.ts
import { NextResponse } from 'next/server';
import { authOptions } from '@/auth';
import { getCookieData, createCookie } from '@/components/auth/login.server';

export async function GET() {
  try {
    const cookieData = await getCookieData();
    if (cookieData) {
      //createCookie(cookieData); //redundancy to create a backup cookie on the local domain if needed
      const redirectUrl = `${process.env.NEXTAUTH_URL}/login?directus=true`;
      return NextResponse.redirect(redirectUrl, { status: 302 });
    } else {
      return NextResponse.json({ message: 'No cookie data available' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during cookie login:', error);
    return NextResponse.json({ message: "An unexpected error occurred, please try again" }, { status: 500 });
  }
}