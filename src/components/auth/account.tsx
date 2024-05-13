"Use Client"
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Account = () => {
    const { data: session, status } = useSession({required: true});
    if (status === 'authenticated') {
    return (
        <div>
            Signed in as {session.user.email} <br />
            Welcome to the account page! <br />
            #Add all session data for user
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
    }
    return (
        <div>
            Not Signed In <br />
        </div>
    );
}

export default Account;