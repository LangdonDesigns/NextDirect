import {
    authentication,
    createDirectus,
    graphql,
    rest,
    staticToken,
  } from "@directus/sdk"
  
  export const directus = (token: string = "") => {
    if (token) {
      return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
        .with(staticToken(token))
        .with(graphql())
        .with(rest())
    }
    return createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
      .with(authentication("session", { credentials: "include", autoRefresh: true }))
      .with(graphql())
      .with(rest())
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

  export const StaticDirectus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API ?? "")
    .with(authentication("session", {credentials: "include", autoRefresh: true}))
    .with(rest());

  export const getResult = async () => {
    const result = await StaticDirectus.request<Output>({
      
    });
    return result;
  };
  
  export default { directus };