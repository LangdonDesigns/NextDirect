import LoginFormOuter from "./form"
import FormShell from "@/components/wrappers/form-shell-standard"
import Container from '@/components/wrappers/container';


export default async function LoginPage() {
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw Error("This is an error")
  return (
    <Container>
      <FormShell>
        <LoginFormOuter />
      </FormShell>
    </Container>
  )
}