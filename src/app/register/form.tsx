'use client';
import AuthForm from '@/components/auth/login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Data {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const handleFormSubmit = async (data: Data) => {
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
    });
    if (response.status === 201) {
      router.push('/');
      router.refresh();
    } else {
      response.status === 409
        ? setError('A user with this email already exist')
        : null;
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <AuthForm
        title="Register here"
        onSubmit={handleFormSubmit}
        buttonText="Register"
        linkDescription="Already have an account?"
        linkText="Login"
        linkHref="/login"
      />
    </>
  );
}