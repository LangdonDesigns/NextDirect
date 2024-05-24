// @/components/forms/form.tsx
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';

export default function StandardForm({ formData, onSubmit, error: errorProp, success: successProp }) {
  const router = useRouter();
  const [loadingButton, setloadingButton] = useState<string | null>(null);
  const [validated, setValidated] = useState<boolean>(false);
  const [initialWidth, setInitialWidth] = useState<string | null>(null);

  useEffect(() => {
    const formInner = document.getElementById('Form-Inner');
    if (formInner) {
      setInitialWidth(formInner.offsetWidth);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    let formTotalData = Object.fromEntries(formData);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      onSubmit(formTotalData);
    }
  };
  
  return (
    <div id="Form-Shell" className="d-flex justify-content-center align-items-center">
      <div
        id="Form-Inner"
        style={{ width: initialWidth }}
        className="d-flex justify-content-center align-items-center p-5 m-5 rounded border border-secondary bg-secondary text-white"
      >
        <div className="row">
          <div className="col-12" style={{ minWidth: '25vw' }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {formData.map((field) => {
                switch (field.type) {
                  case 'select':
                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Select className="form-select" aria-label={field.label}>
                          {field.values.map((value, index) => (
                            <option key={index + 1} value={index + 1}>
                              {value}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    );
                  case 'checkbox':
                  case 'radio':
                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <fieldset>
                          <legend>{field.label}</legend>
                          {Array.isArray(field.values) &&
                            field.values.map((value, index) => (
                              <Form.Check
                                type={field.type}
                                id={`${field.id}-${index}`}
                                key={`${field.id}-${index}`}
                                required={field.required}
                              >
                                <Form.Check.Input type={field.type} name={field.id} />
                                <Form.Check.Label>{value}</Form.Check.Label>
                                <Form.Control.Feedback>{field.feedback}</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                  {field.invalidFeedback}
                                </Form.Control.Feedback>
                              </Form.Check>
                            ))}
                        </fieldset>
                      </Form.Group>
                    );
                  case 'switch':
                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <fieldset>
                          <legend>{field.label}</legend>
                          {Array.isArray(field.values) &&
                            field.values.map((value, index) => (
                              <Form.Check
                                type={field.type}
                                id={`${field.id}-${index}`}
                                key={`${field.id}-${index}`}
                                required={field.required}
                              >
                                <Form.Check.Input name={field.id} />
                                <Form.Check.Label>{value}</Form.Check.Label>
                                <Form.Control.Feedback>{field.feedback}</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                  {field.invalidFeedback}
                                </Form.Control.Feedback>
                              </Form.Check>
                            ))}
                        </fieldset>
                      </Form.Group>
                    );
                  case 'button':
                    return (
                      <>
                        {field.buttonType === 'submit' && successProp && (
                          <Alert variant="success">{successProp}</Alert>
                        )}
                        {field.buttonType === 'submit' && errorProp && (
                          <Alert variant="danger">{errorProp}</Alert>
                        )}
                        <Button
                          id={field.id}
                          key={field.id}
                          variant="primary"
                          disabled={loadingButton === field.loading}
                          type={
                            field.buttonType === 'submit'
                              ? 'submit'
                              : field.buttonType === 'reset'
                              ? 'reset'
                              : undefined
                          }
                          onClick={field.buttonType === 'submit' ? undefined : field.action}
                          className={field.class ? field.class : 'col-12 my-2 text-center'}
                        >
                          {loadingButton === field.loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            field.label
                          )}
                        </Button>
                      </>
                    );
                  case 'range':
                    return (
                      <div id={field.id} key={field.id}>
                        <Form.Label id={field.id} className={field.class}>
                          {field.title}
                        </Form.Label>
                        <Form.Range />
                      </div>
                    );
                  case 'textbox':
                    return (
                      <div id={field.id} key={field.id} className={field.class}>
                        <h2>{field.title}</h2>
                        {field.value ? <p>{field.value}</p> : null}
                        {field.code}
                      </div>
                    );
                  default:
                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control
                          name={field.id}
                          required={field.required}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          type={field.type}
                          pattern={field.pattern}
                        />
                        <Form.Control.Feedback>{field.feedback}</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {field.invalidFeedback}
                        </Form.Control.Feedback>
                      </Form.Group>
                    );
                }
              })}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};