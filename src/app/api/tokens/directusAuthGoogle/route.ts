// @/app/api/tokens/directusAuthGoogle/route.ts
import { NextResponse } from 'next/server';
import { authOptions } from '@/auth';
import { getCookieData } from '@/components/auth/login.server';

export async function GET(request: Request) {
  try {
    const cookieData = await getCookieData();

    if (!cookieData) {
      return NextResponse.json({ message: 'No cookie data available' }, { status: 401 });
    }

    const credentialsProvider = authOptions.providers.find(provider => provider.id === 'credentials');

if (!credentialsProvider) {
  throw new Error('Credentials provider not found');
}

console.log('credentialsProvider:', credentialsProvider); // Debugging line

const user = await authorizeWithCredentials(credentialsProvider, cookieData);

if (!user) {
  return NextResponse.json({ message: 'Failed to authenticate with cookie' }, { status: 401 });
}
return NextResponse.json({ message: 'Successfully authenticated with cookie', user }, { status: 200 });
} catch (error) {
console.error('Error during cookie login:', error);
return NextResponse.json({ message: "An unexpected error occurred, please try again" }, { status: 500 });
}
}

async function authorizeWithCredentials(credentialsProvider, cookieData) {
  if (!cookieData) {
    console.error('No cookie data provided');
    return null;
  }
  //const { cookieData } = credentials as { cookieData: string };

  try {
    const loggedInUser = await credentialsProvider.authorize({ cookieData, req });
    ({ cookieData, request });
    return loggedInUser;
  } catch (error) {
    console.error('Error during cookie authentication:', error);
    return null;
  }
}
