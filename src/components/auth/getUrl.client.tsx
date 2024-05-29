// @/components/auth/GetUrl.client.tsx
"use client";
import { useSearchParams } from 'next/navigation';

export function GetUrl() {
  const searchParams = useSearchParams() as URLSearchParams;
  const url = searchParams.get('url');
  return url;
}

export function GetUrlReturn() {
  const searchParams = useSearchParams() as URLSearchParams;
  const url = searchParams.get('return');
  return url;
}