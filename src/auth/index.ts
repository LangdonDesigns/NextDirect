// @/auth/index.ts
import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DirectusProvider from "@/auth/providers/directus";
import { JWT } from "next-auth/jwt";
import { handleError } from "@/lib/error/error";
import { readMe, refresh } from "@directus/sdk";
import { directus, login } from "@/services/directus";
import { AuthRefresh, UserSession, UserParams } from "@/types/next-auth";
import { getCookieData, createCookie } from "@/components/auth/login.server";
import { cookies } from "next/headers";


export const BASE_PATH = "/api/auth";

const userParams = (user: UserSession): UserParams => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    name: `${user.first_name} ${user.last_name}`,
  };
};

const authOptions: NextAuthConfig = {
  providers: [
    DirectusProvider({
      clientId: process.env.DIRECTUS_CLIENT_ID,
      clientSecret: process.env.DIRECTUS_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        cookieData: {
          label: "Cookie Data",
          type: "text",
          placeholder: "Enter cookie data",
        },
      },
      authorize: async (credentials) => {
        if ("email" in credentials && "password" in credentials) {
          try {
            const { email, password } = credentials as { email: string; password: string; };
            const auth = await login({ email, password });
            const apiAuth = directus(auth.access_token ?? "");
            const loggedInUser = await apiAuth.request(
              readMe({
                fields: ["id", "email", "first_name", "last_name"],
              })
            );
            const user: Awaitable<User> = {
              id: loggedInUser.id,
              first_name: loggedInUser.first_name ?? "",
              last_name: loggedInUser.last_name ?? "",
              email: loggedInUser.email ?? "",
              access_token: auth.access_token ?? "",
              expires: Math.floor(Date.now() + (auth.expires ?? 0)),
              refresh_token: auth.refresh_token ?? "",
            };
            return user;
          } catch (error: any) {
            console.error('Error in email/password authorization:', error);
            handleError(error);
            return null;
          }
        }
        await getCookieData();
        const cookieStore = cookies();
        const cookieDirect = cookieStore.get('StackSession');
        const cookieDirectValue = cookieDirect.value;
        if ( cookieDirectValue !== null ) {
          console.log('Cookies Found!');
          try {
            const apiAuth = directus(cookieDirectValue);
            const loggedInUser = await apiAuth.request(
              readMe({
                fields: ["id", "email", "first_name", "last_name"],
              })
            );
            const user: Awaitable<User> = {
              id: loggedInUser.id,
              first_name: loggedInUser.first_name ?? "",
              last_name: loggedInUser.last_name ?? "",
              email: loggedInUser.email ?? "",
              access_token: cookieDirectValue,
              expires: Math.floor(Date.now() + 3600 * 1000), // 1 hour expiry
              refresh_token: "",
            };
            return user;
          } catch (error: any) {
            //console.error('Error in cookieData authorization:', error);
            handleError(error);
            return null;
          }

        }
        if ("cookieData" in credentials) {
          try {
            const { cookieData } = credentials as { cookieData: string };
            //console.log('cookieData in authorize:', cookieData);
            const apiAuth = directus(cookieData);
            const loggedInUser = await apiAuth.request(
              readMe({
                fields: ["id", "email", "first_name", "last_name"],
              })
            );
            const user: Awaitable<User> = {
              id: loggedInUser.id,
              first_name: loggedInUser.first_name ?? "",
              last_name: loggedInUser.last_name ?? "",
              email: loggedInUser.email ?? "",
              access_token: cookieData,
              expires: Math.floor(Date.now() + 3600 * 1000), // 1 hour expiry
              refresh_token: "",
            };
            return user;
          } catch (error: any) {
            //console.error('Error in cookieData authorization:', error);
            handleError(error);
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user, trigger, session }): Promise<JWT> {
      if (trigger === "update" && !session?.tokenIsRefreshed) {
        token.access_token = session.access_token;
        token.refresh_token = session.refresh_token;
        token.expires_at = session.expires_at;
        token.tokenIsRefreshed = false;
      }

      if (account) {
        return {
          access_token: user.access_token,
          expires_at: user.expires,
          refresh_token: user.refresh_token,
          user: userParams(user),
          error: null,
        };
      } else if (Date.now() < (token.expires_at ?? 0)) {
        return { ...token, error: null };
      } else {
        try {
          const api = directus();
          const result: AuthRefresh = await api.request(
            refresh("json", user?.refresh_token ?? token?.refresh_token ?? "")
          );
          const resultToken = {
            ...token,
            access_token: result.access_token ?? "",
            expires_at: Math.floor(Date.now() + (result.expires ?? 0)),
            refresh_token: result.refresh_token ?? "",
            error: null,
            tokenIsRefreshed: true,
          };
          return resultToken;
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }): Promise<Session> {
      if (token.error) {
        session.error = token.error;
        session.expires = new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString();
      } else {
        const { id, name, email } = token.user as UserParams;
        session.user = { id, name, email };
        session.access_token = token.access_token;
        session.tokenIsRefreshed = token?.tokenIsRefreshed ?? false;
        session.expires_at = token.expires_at;
        session.refresh_token = token.refresh_token;
      }

      return session;
    },
    /* async signIn(user, account, profile) {
      const cookieData = await getCookieData();
      if (cookieData) {
        return '/api/tokens/directusAuthGoogle';
      }
      return false;
    }, */
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export { authOptions };