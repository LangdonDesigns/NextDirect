import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import RegistrationForm from './form';
import FormShell from '@/components/wrappers/form-shell-standard';
import Container from '@/components/wrappers/container';

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect('/');
  }
  return (
    <Container>
      <FormShell>
        <RegistrationForm />
      </FormShell>
    </Container>
  );
}