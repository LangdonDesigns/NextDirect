// @/components/auth/removeQueryParams.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const removeQueryParams = (url: string): string => {
  const cleanedUrl = url.split('?')[0].split('#')[0];
  const queryParams = url.split('?')[1];
  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    if (params.has('callbackUrl')) {
      const cleanedCallbackUrl = (params.get('callbackUrl') || '').split('?')[0].split('&')[0];
      return cleanedCallbackUrl;
    }
  }
  return cleanedUrl;
};

export const useRemoveQueryParams = () => {
    const router = useRouter();

    const removeQueryParamsFromCurrentUrl = useCallback(() => {
        const currentUrl = window.location.href;
        const cleanedUrl = removeQueryParams(currentUrl);
        router.push(cleanedUrl);
    }, [router]);

    return { removeQueryParamsFromCurrentUrl };
};