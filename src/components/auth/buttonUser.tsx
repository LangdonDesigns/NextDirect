// @/components/auth/buttonUser.tsx
import { Button } from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';
import { ClientLogOut } from '@/components/auth/logout.client';
import { DirectusLogOut } from '@/components/auth/logout.server';
import { removeQueryParams } from '@/components/auth/removeQueryParams.client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
            <>
                <Button variant="secondary" className="ms-2" href="/user/inbox">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" aria-label="Inbox" />
                    <p style={{ paddingInlineStart: '5px', display: 'inline' }}>Inbox</p>
                </Button>
                <Button variant="secondary" className="ms-2" href="/user/profile">
                    <FontAwesomeIcon icon={faUser} size="lg" aria-label="Profile" />
                    <p style={{ paddingInlineStart: '5px', display: 'inline' }}>Profile</p>
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => customSignOut()}>
                    Sign Out
                </Button>
            </>
        ) : (
            <Button variant="secondary" className="ms-2" href="/login">
                Sign In
            </Button>
        )}
    </>
    );
}