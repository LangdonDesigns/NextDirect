// @/components/recaptcha/googleRecapatcha.tsx
import React, { useRef, RefObject } from 'react';
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha';

interface ReCaptchaProps {
  onVerify: (value: string) => void;
}

const ReCaptcha = ({ onVerify }: ReCaptchaProps) => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleOnChange = (value: string | null) => {
    onVerify(value as string); 
  };

  return (
    <ReCAPTCHA
      ref={recaptchaRef as RefObject<ReCAPTCHA>}
      sitekey={process.env.RECAPTCHA_SITE_KEY || ''}
      onChange={handleOnChange}
    />
  );
};

export default ReCaptcha;