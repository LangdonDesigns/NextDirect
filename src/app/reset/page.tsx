import { redirect } from 'next/navigation';
import ResetPasswordForm from './form';
import Container from '@/components/wrappers/container';
import FormShell from '@/components/wrappers/form-shell-standard';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  if (!token) redirect('/login');
  return (
    <Container>
      <FormShell>
        <ResetPasswordForm token={token} />
      </FormShell>
    </Container>
  );
}