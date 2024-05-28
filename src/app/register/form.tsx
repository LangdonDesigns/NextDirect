'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createUserAccount } from '@/components/auth/register.sever';
import StandardForm from '@/components/forms/standard';

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const onSubmit = async (formTotalData: any) => {
    const res = await createUserAccount(formTotalData);
    if (res.error) {
      setError(res.error);
    } else {
      setSuccess(res.success || '');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }

  const formData = [
    {
      id: 'registrationTitle',
      title: 'Registration',
      value: 'Join the community portal.',
      type: 'textbox',
      class: 'col-12 text-center'
    },
    {
      id: 'first_name',
      label: 'First Name',
      placeholder: 'first',
      autoComplete: 'given-name',
      type: 'text',
      required: true,
      feedback: 'Looks good!',
      invalidFeedback: 'Please provide a valid first name.',
    },
    {
      id: 'last_name',
      label: 'Last Name',
      placeholder: 'last',
      autoComplete: 'family-name',
      type: 'text',
      required: true,
      feedback: 'Looks good!',
      invalidFeedback: 'Please provide a valid last name.',
    },
    {
      id: 'email',
      label: 'Email Address',
      placeholder: 'name@example.com',
      autoComplete: 'email',
      type: 'email',
      required: true,
      feedback: 'Looks good!',
      invalidFeedback: 'Please provide a valid email address.',
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
      label: 'Register',
      type: 'button',
      loading: 'submitButton',
      buttonType: 'submit',
      class: 'col-12 my-2 text-center' 
    },
    {
      id: 'resetButton',
      label: 'Reset',
      type: 'button',
      loading: 'resetButton',
      buttonType: 'reset',
      class: 'col-12 my-2 text-center'
    },   
    {
      id: 'existingUser',
      title: 'Existing User?',
      code: <p>Please visist the <a href='login'>login</a> page.</p>,
      type: 'textbox',
      class: 'col-12 text-center'
    },
    {
      id: 'loginButton',
      label: 'Login',
      type: 'button',
      loading: 'loginButton',
      buttonType: 'onclick',
      action: () => router.push('/login'),
      class: 'col-12 text-center',
    },
  ];

  return (
    <StandardForm formData={formData} onSubmit={onSubmit} error={error} success={success} />    
  );
}