# NextDirect
Nextjs based CMS connected to Directus.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Initial Set Up
After initial GIT pull request:
1. ### copy .env.example as .env
  - #### Next Auth Requirements
      - NEXTAUTH_SECRET is a randomly generated secret.  You can generate this by running `$ openssl rand -base64 32` in your CLI
      - NEXTAUTH_URL is the primary url or localhost value of your NextJS instance.
    - #### NextJS Public Information -  Must start with NEXT_PUBLIC to display in Client Renders.
      - NEXT_PUBLIC_SITE_NAME="Acme Inc"
      - NEXT_PUBLIC_SITE_DESCRIPTION="This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before."
      - NEXT_PUBLIC_DIRECTUS_API="http://localhost:8055" Directus SSL https URL for API
      - NEXT_PUBLIC_NEXTAUTH_URL="http://localhost:3000" NextJS URL for API Client Calls.
    - #### Directus SSO
      - DIRECTUS_SESSION_TOKEN_NAME="directus_session" Must match Directus ENV Configuration SESSION_COOKIE_NAME, SESSION_COOKIE_DOMAIN, SESSION_COOKIE_SECURE="true", SESSION_COOKIE_SAME_SITE="None", AUTH_GOOGLE_REDIRECT_ALLOW_LIST must contain NextJs domain.
      - DIRECTUS_SESSION_TOKEN_DOMAIN="" The directus domain is called a few times by the server for secure cookie transactions.
    - #### Directus API
      - DIRECTUS_STATIC_ADMIN_TOKEN="" Do not use your primary admin token, create a new one for the purpose of this connection.  Will create users and grant additional permissions when users base level doesn't work.
      - DIRECTUS_STATIC_VIEWER_TOKEN="" Used to view content that you do not want to be public, but want loaded into NextJS.
    - #### Directus User Creation
      - DIRECTUS_BASE_USER_ROLE="" The UUID for role that will be assigned to new users created by the system.  This should be a role that has the permissions you want to grant to users via the Register Form.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
