// @/app/user/profile/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/blocks/spinners/loading';

export default async function Profile() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return <><LoadingSpinner /></>;
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-12">
          <div className="col-12 col-md-12">
            <h1>User Profile</h1>
          </div>
          <div className="col-12 my-4 d-flex flex-column justify-content-center">
            <h3>Welcome Back {session?.user?.name}!</h3>
            <p>Logged in as {session?.user?.email}</p>
            <p>Session Id: {session?.user?.id}</p>
            <p>Role: {session?.user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
