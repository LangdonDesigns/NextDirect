// @/components/auth/sessionWrapper.client.tsx
'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

const SessionWrapper = ({ children, session }: { children: React.ReactNode, session: any }) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};

export default SessionWrapper;
