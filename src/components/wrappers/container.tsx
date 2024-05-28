// @/components/wrappers/form-shell-standard.tsx
import React from 'react';

interface FormShellProps {
  children: React.ReactNode;
}

const Container: React.FC<FormShellProps> = ({ children }) => (
  <div className="container">
      {children}
  </div>
);

export default Container;