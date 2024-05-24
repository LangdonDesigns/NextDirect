import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import RegistrationForm from './form';

export default async function RegisterPage() {
  const session = await auth();
  if (session) {
    redirect('/');
  }
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}