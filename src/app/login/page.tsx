import LoginFormOuter from "./form"
import FormShell from "@/components/wrappers/form-shell-standard"
import Container from '@/components/wrappers/container';

export default async function LoginPage() {
  return (
    <Container>
      <FormShell>
        <LoginFormOuter />
      </FormShell>
    </Container>
  )
}