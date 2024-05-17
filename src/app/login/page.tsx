import LoginForm from "./form"

export default async function LoginPage() {
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw Error("This is an error")
  return (
    <div>
      <LoginForm />
    </div>
  )
}