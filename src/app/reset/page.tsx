import { redirect } from 'next/navigation';
import ResetPasswordForm from './form';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  if (!token) redirect('/login');
  return (
    <div>
      <ResetPasswordForm token={token} />
    </div>
  );
}