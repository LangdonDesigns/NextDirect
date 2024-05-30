import { authentication, createDirectus, graphql, rest, staticToken, } from "@directus/sdk"
  
export default function Directus(token: string = "") {
  if (token) {
    return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
      .with(staticToken(token))
      .with(graphql())
      .with(rest());
  }
  return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
    .with(authentication("session", { credentials: "include", autoRefresh: true }))
    .with(graphql())
    .with(rest());
}

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }
  )
  const user = await res.json()
  if (!res.ok && user) {
    throw new Error("Email address or password is invalid")
  }
  if (res.ok && user) {
    return user?.data
  }
}

export const directusBot = () => {
  return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
  .with(staticToken(process.env.DIRECTUS_STATIC_ADMIN_TOKEN ?? ""))
  .with(rest());
}