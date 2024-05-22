// @/app/login/form.tsx
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from '@/components/auth/login.client';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import LoadingSpinner from "@/components/blocks/spinners/loading";
import Link from 'next/link';
import DirectusLoginLinks from '@/components/auth/loginDirectusLinks.client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export function LoginForm() {
  const [error, setError] = useState<string>("");
  const { handleSubmitForm, handleSubmitWithCookies, loadingButton, error: loginError } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    const res = await handleSubmitForm(values);
  };

  const searchParams = useSearchParams() as URLSearchParams;
  useEffect(() => {
    if (searchParams.get('directus') === 'true') {
      handleSubmitWithCookies();
    } else {
      const errorParam = searchParams.get('error');
      if (errorParam) {
        setError(errorParam);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  return (
    <div id="Login-Form-Shell" className="d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center p-5 m-5 rounded border border-secondary bg-secondary text-white">
        <div className="row">
          <div className="col-12 text-center">
            <h2>Login Here</h2>
          </div>
          <div className="col-12">
            <Form onSubmit={form.handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="loginForm.email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" autoComplete="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <Alert variant="warning" style={{ padding: 2, margin: 0 }}>
                    <p style={{ padding: 0, margin: 0 }}>{form.formState.errors.email.message}</p>
                  </Alert>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" autoComplete="password" {...form.register("password")} />
                {form.formState.errors.password && (
                  <Alert variant="warning" style={{ padding: 2, margin: 0 }}>
                    <p style={{ padding: 0, margin: 0 }}>{form.formState.errors.password.message}</p>
                  </Alert>
                )}
              </Form.Group>
              <Button variant="primary" disabled={loadingButton === 'submit'} type="submit" className="float-end">
                {loadingButton === 'submit' ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </Form>
          </div>
          <div className="col-12 d-none">
            <Button id="Cookie-Login" variant="primary" disabled={loadingButton === 'cookie'} type="button" onClick={handleSubmitWithCookies} className="float-end mt-2">
              {loadingButton === 'cookie' ? <Spinner animation="border" size="sm" /> : "Login with Cookie"}
            </Button>
          </div>
          <DirectusLoginLinks />
          <div className="col-12 my-2 text-center">
            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}
            <p>New here? <Link className="text-white" href="/register">Create an account</Link></p>
            <p><Link className="text-white" href="/reset">Forgot password?</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginFormOuter() {
  const { data: session } = useSession();
  return session ? (
    <div className="col-12 d-flex flex-column justify-text-center">
      <h3>Welcome Back {session?.user?.name}!</h3>
      <p>Logged in as {session?.user?.email}</p>
      <p>Session Id as {session?.user?.id}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  ) : (
    <div className="col-12 d-flex flex-column">
      <LoginForm />
    </div>
  );
}
