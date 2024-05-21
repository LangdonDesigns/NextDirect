// @/components/auth/login.client.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { getCookieData } from '@/components/auth/login.server';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('triggerCookieLogin') === 'true') {
      handleSubmitWithCookies();
    }
  }, [searchParams]);

  const handleSubmitWithCookies = async () => {
    setLoadingButton('cookie');
    const res = await signInWithCookie();
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
    setLoadingButton(null);
  };

  const handleSubmitForm = async (values: { email: string; password: string }) => {
    setLoadingButton('submit');
    const res = await signInWithEmailPassword(values);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
    setLoadingButton(null);
  };

  return {
    isLoading,
    loadingButton,
    error,
    handleSubmitForm,
    handleSubmitWithCookies,
  };
};

const signInWithCookie = async () => {
  const cookieData = await getCookieData();
  const signInOptions = {
    cookieData,
    callbackUrl: `/`,
    redirect: false,
  };
  return await signIn("credentials", signInOptions);
};

const signInWithEmailPassword = async (values: { email: string; password: string }) => {
  const signInOptions = {
    email: values.email,
    password: values.password,
    callbackUrl: `/`,
    redirect: false,
  };
  return await signIn("credentials", signInOptions);
};
