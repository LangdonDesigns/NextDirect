// @/components/wrappers/form-shell-standard.tsx
import React from 'react';

interface FormShellProps {
  children: React.ReactNode;
}

const FormShell: React.FC<FormShellProps> = ({ children }) => (
  <div id="Form-Shell" className="justify-content-center align-items-center">
    <div id="Form-Inner" className="justify-content-center align-items-center p-5 m-5 rounded border border-secondary bg-secondary text-white">
      {children}
    </div>
  </div>
);

export default FormShell;