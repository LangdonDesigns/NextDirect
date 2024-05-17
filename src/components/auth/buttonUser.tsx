import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import type { UserAuthenticated } from '@/types/next-auth.d.ts';
import { useSession, signOut } from 'next-auth/react';

//read session status and display button accordingly, sign in or sign out
export default function ButtonUser({ user }: { user: UserAuthenticated }) {
    const { data: session } = useSession();
    return (
    <>
        {session ? (
            <Button variant="secondary" onClick={() => signOut()}>
                Sign Out
            </Button>
        ) : (
            <Button as={Link} variant="secondary" href="/login">
                Sign In
            </Button>
        )}
    </>
    );
}