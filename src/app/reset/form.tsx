'use client';

import { FormEvent, useState } from 'react';
import { passwordReset } from '@directus/sdk';
import { directus } from '@/services/directus';
import { useRouter } from 'next/navigation';

export default function RequestResetForm({ token }: { token: string }) {
 const [newPassword, setNewPassword] = useState('');
 const [success, setSuccess] = useState('');
 const [error, setError] = useState('');
 const reset_token = token;
 const router = useRouter();

 const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   try {
     const response = await directus.request(
       passwordReset(reset_token, newPassword)
     );
     setSuccess(
       'Password successfully reset, redirecting you to login page...'
     );
     setTimeout(() => router.push('/login'), 1000);
   } catch (e: any) {
     console.log(e);
     setError(
       'The reset password token is invalid, please request for a new password reset link!'
     );
   }
 };
 return (
   <form onSubmit={handleFormSubmit}>
     <h1>Provide a new password for your account</h1>
     {success && <p>{success}</p>}
     {error && <p>{error}</p>}
     <p>Enter your new password for your account</p>
     <input
       type="password"
       placeholder="Enter your new password"
       name="password"
       required
       onChange={(e) => setNewPassword(e.target.value)}
       autoComplete="new-password"
     />
     <button>Create new password</button>
   </form>
 );
}