import { Button } from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';
import { DirectusLogOut } from '@/components/auth/logout.server';

export default function ButtonUser() {
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