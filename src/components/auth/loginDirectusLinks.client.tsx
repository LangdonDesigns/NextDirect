// @/components/auth/loginDirectusLinks.client.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

const DirectusLoginLinks = () => {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const directusGoogleLoginUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/login/google?redirect=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/tokens/directusauth`;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoadingButton(e.currentTarget.id);
  };
  

  return (
    <div className="col-12">
      <Button id="Google-Login" variant="primary" className="float-end mt-2" type="link" href={directusGoogleLoginUrl} onClick={handleClick}>
        {loadingButton === 'Google-Login' ? <Spinner animation="border" size="sm" /> : "Login with Google"}
      </Button>
    </div>
  );
};

export default DirectusLoginLinks;
