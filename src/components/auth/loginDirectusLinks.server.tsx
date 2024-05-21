// @/components/auth/loginDirectusLinks.server.tsx
"use server";
import React from 'react';
import { directus } from '@/services/directus';
import { readProviders } from '@directus/sdk';

export async function getRedirectURI() {
  const nextAuthURL = process.env.NEXTAUTH_URL;
  const redirectURLFinished = `?redirect=${nextAuthURL}/api/tokens/directusauth`;
  return redirectURLFinished;
};

export async function getDirectusProviders() {
  const directusProviders = await directus.request(directus.readProviders());
  return directusProviders;
};
