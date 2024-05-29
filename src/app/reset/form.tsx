'use client';

import { useState } from 'react';
import { passwordReset } from '@directus/sdk';
import Directus from '@/services/directus';
import { useRouter } from 'next/navigation';
import StandardForm from '@/components/forms/standard';

export default function RequestResetForm({ token }: { token: string }) {
 const [success, setSuccess] = useState('');
 const [error, setError] = useState('');
 const reset_token = token;
 const router = useRouter();
 const client = Directus();

 const formData = [
    {
      id: 'resetTitle',
      title: 'Password Reset',
      value: 'Enter your new password below. Note: Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.',
      type: 'textbox',
      class: 'col-12 text-center',
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: 'password',
      autoComplete: 'password',
      type: 'password',
      required: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      feedback: 'Looks good!',
      invalidFeedback: 'Please provide a valid password. Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.',
    },
    {
      id: 'submitButton',
      label: 'Set New Password',
      type: 'button',
      loading: 'submitButton',
      buttonType: 'submit',
      class: 'col-12 my-2 text-center' 
    },
  ];

const onSubmit = async (formTotalData: any) => {
  const newPassword = formTotalData.password;

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
    <StandardForm formData={formData} onSubmit={onSubmit} error={error} success={success} />
 );
}