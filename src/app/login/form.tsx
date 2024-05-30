// @/app/login/form.tsx
'use client';
import { useLogin } from '@/components/auth/login.client';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/blocks/spinners/loading';
import DirectusLoginLinks from '@/components/auth/loginDirectusLinks.client';
import ResetPasswordModal from '@/components/auth/resetPassword.client';
import StandardForm from '@/components/forms/standard';
import Link from 'next/link';

const formData = [
  {
    id: 'titleTextBox',
    type: 'textbox',
    title: 'Login Here',
    class: 'col-12 text-center'
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
    //pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    feedback: 'Looks good!',
    invalidFeedback: 'Please provide a valid password.',
  },
  {
    id: 'submitButton',
    label: 'Login',
    type: 'button',
    loading: 'submitButton',
    buttonType: 'submit',
    class: 'col-12 my-2 text-center'
  },
  {
    id: 'newTextBox',
    type: 'textbox',
    title: 'Create an Account',
    code: <p>New here? <Link href='register'>Create an account</Link></p>,
    class: 'col-12 text-center'
  }
];

export function LoginForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { handleSubmitForm, handleSubmitWithCookies, error: loginError } = useLogin();

  const onSubmit = async (formDataEntries: any): Promise<void> => {
    const res = await handleSubmitForm(formDataEntries);
  };

  const searchParams = useSearchParams() as URLSearchParams;
  useEffect(() => {
    setLoading(false);
    if (searchParams.get('directus') === 'true') {
      setLoading(true);
      handleSubmitWithCookies().then(() => {
        setLoading(false);
      });
    } else {
      const errorParam = searchParams.get('error');
      if (errorParam) {
        setError(errorParam);
      }
    }
  }, [searchParams, handleSubmitWithCookies]);

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);
  if (loading) {
    return <><LoadingSpinner /></>;
  }
  return (
      <>
          <StandardForm formData={formData} onSubmit={onSubmit} error={error} success={success} />
          <DirectusLoginLinks />          
          <ResetPasswordModal />
      </>

  );
}

export default function LoginFormOuter() {
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

  return session ? (
    <div className="container">
      <div className="row">
        <div className="col-12 my-4 d-flex flex-column justify-content-center">
          <h3>Welcome Back {session?.user?.name}!</h3>
          <p>Logged in as {session?.user?.email}</p>
          <p>Session Id: {session?.user?.id}</p>
          <p>Role: {session?.user?.role}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="col-12 d-flex flex-column">
      <LoginForm />
    </div>
  );
}
