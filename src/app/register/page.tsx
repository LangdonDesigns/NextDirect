import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import RegistrationForm from './form';

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}