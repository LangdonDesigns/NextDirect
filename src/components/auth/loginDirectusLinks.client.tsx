// @/components/auth/loginDirectusLinks.client.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import LoadingSpinner from '@/components/blocks/spinners/loading';
import getDirectusProviders from '@/components/auth/loginDirectusLinks.server';

const DirectusLoginLinks = () => {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [providerNames, setProviderNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const directusProviders = await getDirectusProviders();
        const names = directusProviders.map((provider: any) => provider.name);
        setProviderNames(names);
      } catch (error) {
        console.error('Error fetching Directus providers:', error);
        setProviderNames([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoadingButton(e.currentTarget.id);
  };

  const generateLoginButton = (providerName: string) => {
    const loginUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/login/${providerName}?redirect=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/tokens/directusauth?return=${currentUrl}`;
    return (
      <Form.Group key={providerName}>
        <Button
          id={`${providerName}-login`}
          variant="primary"
          className="col-12 mt-2"
          href={loginUrl}
          onClick={handleClick}
        >
          {loadingButton === `${providerName}-login` ? <Spinner animation="border" size="sm" /> : `Login with ${providerName.charAt(0).toUpperCase() + providerName.slice(1)}`}
        </Button>
      </Form.Group>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {providerNames.map(generateLoginButton)}
    </>
  );
};

export default DirectusLoginLinks;