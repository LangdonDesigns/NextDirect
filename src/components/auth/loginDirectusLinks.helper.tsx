// @/components/auth/loginDirectusLinks.helper.tsx
const nextAuthURL = 'process.env.NEXTAUTH_URL_INTERNAL';
const nextAuthURLString = nextAuthURL?.toString(); 
export const redirectURLFinished = `?redirect=${nextAuthURLString}/api/tokens/directusauth`;