// @/auth/providers/directus.ts
import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

interface DirectusProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export default function DirectusProvider<P extends Record<string, any> = DirectusProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "directus",
    name: "Directus",
    type: "oauth",
    authorization: `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/login`,
    token: `${process.env.NEXT_PUBLIC_DIRECTUS_API}/auth/token`,
    userinfo: `${process.env.NEXT_PUBLIC_DIRECTUS_API}/users/me`,
    profile(profile) {
      return {
        id: profile.id,
        name: `${profile.first_name} ${profile.last_name}`,
        email: profile.email,
      };
    },
    options,
  };
}
