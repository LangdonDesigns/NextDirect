import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
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
    const loginUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/login/${providerName}?redirect=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/tokens/directusauth&return=${currentUrl}`;
    return (
      <div className="col-12" key={providerName}>
        <Button
          id={`${providerName}-login`}
          variant="primary"
          className="float-end mt-2"
          type="link"
          href={loginUrl}
          onClick={handleClick}
        >
          {loadingButton === `${providerName}-login` ? <Spinner animation="border" size="sm" /> : `Login with ${providerName.charAt(0).toUpperCase() + providerName.slice(1)}`}
        </Button>
      </div>
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
