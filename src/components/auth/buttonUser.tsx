import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import type { UserAuthenticated } from '@/types/next-auth.d.ts';
import { useSession, signOut } from 'next-auth/react';
import { directusLogOut } from '@/components/auth/logout.server.tsx';


//read session status and display button accordingly, sign in or sign out
export default function ButtonUser({ user }: { user: UserAuthenticated }) {
    const { data: session} = useSession();
    async function customSignOut() {
        await signOut();
        await directusLogOut();
    }
    return (
    <>
        {session ? (
            <Button variant="secondary" onClick={() => customSignOut()}>
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