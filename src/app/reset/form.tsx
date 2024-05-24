'use client';

import { FormEvent, useState } from 'react';
import { passwordReset } from '@directus/sdk';
import { directus, rest } from '@/services/directus';
import { useRouter } from 'next/navigation';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function RequestResetForm({ token }: { token: string }) {
 const [newPassword, setNewPassword] = useState('');
 const [success, setSuccess] = useState('');
 const [error, setError] = useState('');
 const reset_token = token;
 const router = useRouter();
 const client = directus();

 const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   try {
     const response = await client.request(
       passwordReset(reset_token, newPassword)
     );
     setSuccess(
       'Password successfully reset, redirecting you to login page...'
     );
     setTimeout(() => router.push('/login'), 3000);
   } catch (e: any) {
     console.log(e);
     setError(
       'The reset password token is invalid, please request for a new password reset link!'
     );
   }
 };
 return (
   <div id="Password-Reset-Form-Shell" className="d-flex justify-content-center align-items-center"> 
      <div className="d-flex justify-content-center align-items-center p-5 m-5 rounded border border-secondary bg-secondary text-white">

        <Form onSubmit={handleFormSubmit}>
          <h2>Provide a new password for your account</h2>
          <p>Enter your new password for your account</p>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            name="password"
            required
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          {success && 
          <Alert className='mt-2' variant='success'>{success}</Alert>}
          {error && 
          <Alert className='mt-2' variant='warning'>{error}</Alert>}
          <Button className='mt-2' variant='primary'>Set New Password</Button>
        </Form>
      </div>
   </div> 
 );
}