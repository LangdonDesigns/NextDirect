// @/components/auth/login.client.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { getCookieData } from '@/components/auth/login.server';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmitWithCookies = useCallback(async () => {
    setLoadingButton('cookie');
    const result = await signInWithCookie();
    if (result?.error) {
      setError(result.error);
    } else {
      router.back();
    }
    setLoadingButton(null);
  }, [router]); 
  
  useEffect(() => {
    if (searchParams.get('triggerCookieLogin') === 'true') {
      handleSubmitWithCookies();
    }
  }, [searchParams, handleSubmitWithCookies]);
  
  const handleSubmitForm = async (values: { email: string; password: string }) => {
    setLoadingButton('submit');
    const signInOptions = {
      email: values.email,
      password: values.password,
      callbackUrl: `/`,
      redirect: false,
    };
    const result = await signIn("credentials", signInOptions);    
    if (result?.error) {
      setError(result.error);
    } else {
      router.back();
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
  const result = await signIn("credentials", signInOptions);
  if (result?.error) {
    return { error: result.error };
  }
  return result;
};
