import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import type { UserAuthenticated } from '@/types/next-auth.d.ts';

//read session status and display button accordingly, sign in or sign out
export default function ButtonUser({ user }: { user: UserAuthenticated }) {
    return (
            <Button as={Link} variant='primary' href={user ? "/logout" : "/login"} >{user ? "Sign Out" : "Sign In"}</Button>
    );
}