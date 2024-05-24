import { NextResponse } from 'next/server';
import { createUser } from '@directus/sdk';
import { directus } from "@/services/directus";


export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, password } = await request.json();
    const client = directus();
    const result = await client.request(
      createUser({
        first_name,
        last_name,
        email,
        password,
        role: process.env.USER_ROLE,
      })
    );
    return NextResponse.json({ message: "Account Created!" }, { status: 201 });
  } catch (e: any) {
    console.log(e);
    const code = e.errors[0].extensions.code
    if (code === 'RECORD_NOT_UNIQUE') {
      return NextResponse.json({ message: "This user already exist" }, { status: 409 });
    }

    return NextResponse.json({ message: "An unexpected error occurred, please try again" }, { status: 500 });
  }
}