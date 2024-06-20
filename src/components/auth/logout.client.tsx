// @/components/auth/logout.client.tsx
'use client';

export const ClientLogOut = () => {
  localStorage.clear();
  sessionStorage.clear();
  return;
}