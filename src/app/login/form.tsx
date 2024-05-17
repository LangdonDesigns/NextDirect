'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';


const formSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setIsLoading(true)
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: `/`,
      redirect: false,
    })
    if (res?.error) {
      setError(res?.error)
      setIsLoading(false)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center p-5 m-5 rounded border border-secondary bg-secondary text-white">
        <div className="row">
          <div className="col-12 text-center">
            <h2>Login Here</h2>
          </div>
          <div className="col-12">
            <Form onSubmit={form.handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="loginForm.email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" {...form.register("email")} />
                {form.formState.errors.email && (
                  <Alert variant="warning" style={{ padding: 2, margin: 0 }}>
                  <p style={{ padding: 0, margin: 0 }}>{form.formState.errors.email.message}</p>
                  </Alert>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" {...form.register("password")} />
                {form.formState.errors.password && (
                  <Alert variant="warning" style={{ padding: 2, margin: 0 }}>
                  <p style={{ padding: 0, margin: 0 }}>{form.formState.errors.password.message}</p>
                  </Alert>
                )}
              </Form.Group>
              <Button variant="primary" disabled={isLoading} type="submit" className="float-end">{isLoading ? <Spinner animation="border" size="sm" /> : "Login"}</Button>
            </Form>
          </div>
          <div className="col-12 text-center">
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