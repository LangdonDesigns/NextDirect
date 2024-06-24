// @/app/user/profile/page.tsx
'use client';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-12">
          <h1>User Profile</h1>
          <h2>Welcome Back {session?.user?.name}!</h2>
          <p>Logged in as {session?.user?.email}</p>
          <p>Session Id: {session?.user?.id}</p>
          <p>Role: {session?.user?.role}</p>
          </div>
      </div>
    </div>
  );
}
