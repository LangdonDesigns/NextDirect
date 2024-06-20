// @/components/auth/buttonUser.tsx
import { Button } from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';
import { ClientLogOut } from '@/components/auth/logout.client';
import { DirectusLogOut } from '@/components/auth/logout.server';
import { removeQueryParams } from '@/components/auth/removeQueryParams.client';

export default function ButtonUser() {
    const { data: session} = useSession();
    
    async function customSignOut() {
        const cleanUrl = removeQueryParams(window.location.href);
        await signOut({ callbackUrl: cleanUrl });
        ClientLogOut();
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