// @/components/auth/getUrl.client.tsx
"use client";
import { useSearchParams } from 'next/navigation';

export function getUrl() {
  const searchParams = useSearchParams() as URLSearchParams;
  const url = searchParams.get('url');
  return url;
}

export function getUrlReturn() {
  const searchParams = useSearchParams() as URLSearchParams;
  const url = searchParams.get('return');
  return url;
}