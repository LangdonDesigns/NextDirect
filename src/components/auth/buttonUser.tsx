import { Button } from 'react-bootstrap';
import type { UserAuthenticated } from '@/types/next-auth.d.ts';
import { useSession, signOut } from 'next-auth/react';
import { DirectusLogOut } from '@/components/auth/logout.server';


//read session status and display button accordingly, sign in or sign out
export default function ButtonUser({ user }: { user: UserAuthenticated }) {
    const { data: session} = useSession();
    async function customSignOut() {
        await signOut();
        await DirectusLogOut();
    }
    return (
    <>
        {session ? (
            <Button variant="secondary" onClick={() => customSignOut()}>
                Sign Out
            </Button>
        ) : (
            <Button variant="secondary" href="/login">
                Sign In
            </Button>
        )}
    </>
    );
}