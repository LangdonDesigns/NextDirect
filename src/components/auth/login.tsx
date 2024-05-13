import Link from "next/link";
import { FormEvent, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface Data {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: Data) => void;
  linkText: string;
  linkDescription: string;
  linkHref: string;
  isFullForm?: boolean;
}

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  linkText,
  linkHref,
  linkDescription,
  isFullForm = true,
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="centered-form" onSubmit={handleFormSubmit}>
      <h2>{title}</h2>
      {isFullForm && (
        <>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </>
      )}
      <input
        type="email"
        placeholder="Email Address"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        placeholder="Enter your Password"
        name="password"
        value={formData.password}
        required
        onChange={handleInputChange}
      />
      <button>
        {buttonText}
      </button>
      <p>
        {linkDescription}
        <Link
          href={linkHref}
        >
          {linkText}
        </Link>
      </p>
    </form>
  );
}