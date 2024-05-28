// @/components/auth/resetPassword.client.tsx
"use client";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { directusPasswordReset } from "@/components/auth/resetPassword.server";
import StandardForm from "@/components/forms/standard";

const formData = [
  {
    id: 'email',
    label: 'Email Address',
    placeholder: 'name@example.com',
    autoComplete: 'email',
    required: true,
    feedback: 'Looks good!',
    invalidFeedback: 'Please provide a valid email address.',
  },
  {
    id: 'resetButton',
    label: 'Reset Password',
    type: 'button',
    loading: 'resetButton',
    buttonType: 'submit',
    class: 'col-12 my-2 text-center'
  },
];

const ResetPasswordModal = () => {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoadingButton(null);
  };
  const handleShow = () => {
    setLoadingButton('password');
    setShow(true);
  };

  const onSubmit = async (formTotalData: any) => {
    try {
      setLoadingButton('resetButton');
      const resetEmail = formTotalData.email;
      await directusPasswordReset(resetEmail);
      setSuccess('Success! Check your email for a password reset link.');
      setTimeout(() => {setError("");setSuccess("");setShow(false);}, 3000);      
      return;
    }
    catch (error) {
      setError(error.message);
      return;
    }
  }

  return (
    <div className="col-12 my-2 text-center">       
    <Modal centered={true} show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Password Reset</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Alert variant="info">
        <p>Note: this is only for local accounts. You cannot reset a SSO (Google, Facebook, etc.) password via this form.</p>
      </Alert>
      <StandardForm formData={formData} onSubmit={onSubmit} error={error} success={success}/>  
    </Modal.Body>
  </Modal>
  <Button id="Password-Reset" variant="primary" disabled={loadingButton === 'password'} type="button" onClick={handleShow} className="float-center w-100">
    {loadingButton === 'password' ? <Spinner animation="border" size="sm" /> : "Reset Password"}
  </Button>
  </div>
  )
}

export default ResetPasswordModal;