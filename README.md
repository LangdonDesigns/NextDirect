# NextDirect
Nextjs based CMS connected to Directus.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Initial Set Up

After initial GIT pull request:

### copy .env.example as .env
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
    
### Make changes in your Directus instance .env and/or Docker setup.
Note: For this project we recommend Directus 10.11^, but at minimum, this must be Directus 8^ due to the use of the Directus/SDK.
- Required Directus Fields:
  - AUTH_PROVIDERS This will automatically create SSO buttons for Google, GitHub, or other providers allowed in Directus on NextJs.
  - SESSION_COOKIE_NAME should match NextJs DIRECTUS_SESSION_TOKEN_NAME
  - SESSION_COOKIE_DOMAIN should match NextJs DIRECTUS_SESSION_TOKEN_DOMAIN
  - SESSION_COOKIE_SECURE="true"
  - SESSION_COOKIE_SAME_SITE="None"
  - DIRECTUS_AUTH_PUBLIC_URL should match NEXT_PUBLIC_NEXTAUTH_URL
  - PASSWORD_RESET_URL_ALLOW_LIST should be NEXT_PUBLIC_NEXTAUTH_URL/reset
- Recommended CORS Settings
  - CORS_ENABLED: true
  - CORS_METHODS: "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  - CORS_HEADERS: "Content-Type, Authorization, X-Requested-With, Origin, Accept"
  - CORS_MAX_AGE: 86400
  - CORS_CREDENTIALS: true
  - CORS_CACHE_DURATION: 86400
  - CORS_EXPOSED_HEADERS: "Content-Range, X-Content-Range, X-Total-Count"
  - CORS_ALLOWED_HEADERS: "Content-Type, Authorization, X-Requested-With, Origin, Accept"
  - CORS_ORIGIN: NEXT_PUBLIC_NEXTAUTH_URL with min of `https://`, but could include a string of all `regex:https?:\/\/(www\.|www\.` variations of domain to cover cross origin requests from NextJs an other URLs if your domain is not restrictively setup.

## Modify package.json
This instance of NextJs is set to run on a port for dev and start.  Defaults to port 7051.
```
  "scripts": {
    "dev": "next dev -p 7051",
    "trace": "NODE_OPTIONS='--trace-deprecation' next dev -p 7051",
    "build": "next build",
    "start": "next start -p 7051",
    "lint": "next lint"
  },
```

## Install Node Modules
```bash
npm install
# or
yarn install
# or
pnpm install
# or
npm ci
```
## Test Run
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

Open [http://localhost:7051](http://localhost:7051) with your browser to see the result.

You can start editing by adding pages in /src/app.  This will allow any new routes you create to automatically be populated.  Additional add-ons are in development to pull from Directus instance, pages, menus, and other components. 


## Learn More About NextJs

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!