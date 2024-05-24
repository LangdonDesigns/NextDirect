// @/components/auth/resetPassword.client.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';
import { directusPasswordReset } from "@/components/auth/resetPassword.server";

const resetFormSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
});

const ResetPasswordModal = () => {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const resetForm = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoadingButton(null);
  };
  const handleShow = () => {
    setLoadingButton('password');
    setShow(true);
  };

  const passwordReset = async () => {
    try {
      setLoadingButton('resetpassword');
      const resetEmail = resetForm.getValues('email');
      const resetEmailResult = await directusPasswordReset(resetEmail);
      setLoadingButton(null);
      setError('Success! Check your email for a password reset link.');
      setTimeout(() => {setError(null);setShow(false);resetForm.reset();}, 3000);      
      return;
    }
    catch (error) {
      setError(error.message);
      setLoadingButton(null);
      return;
    }
  }

  return (
    <>
    <Modal centered={true} show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Password Reset</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Alert variant="info">
        <p>Note: this is only for local accounts. You cannot reset a SSO (Google, Facebook, etc.) password via this form.</p>
      </Alert>
      <Form onSubmit={resetForm.handleSubmit(passwordReset)}>
        <Form.Group controlId="passwordReset.email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" autoComplete="email" {...resetForm.register("email")} />
          {resetForm.formState.errors.email && (
            <Alert variant="warning" style={{ padding: 2, margin: 0 }}>
              <p style={{ padding: 0, margin: 0 }}>{resetForm.formState.errors.email.message}</p>
            </Alert>
          )}
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
            {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" disabled={loadingButton === 'resetpassword'} className="mt-2" type="submit">
          {loadingButton === 'resetpassword' ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
  <Button id="Password-Reset" variant="primary" disabled={loadingButton === 'password'} type="button" onClick={handleShow} className="float-center w-100">
    {loadingButton === 'password' ? <Spinner animation="border" size="sm" /> : "Reset Password"}
  </Button>
  </>
  )
}

export default ResetPasswordModal;