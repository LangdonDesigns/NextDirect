// @/auth/index.ts
import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { handleError } from "@/lib/error/error";
import { readMe, refresh } from "@directus/sdk";
import Directus, { login } from "@/services/directus";
import { AuthRefresh, UserSession, UserParams } from "@/types/next-auth";
import { getCookieData } from "@/components/auth/login.server";
import { cookies } from "next/headers";

export const BASE_PATH = "/api/auth";

async function getUserData(token: string): Promise<User | null> {
  try {
      const expireFloor = Math.floor(Date.now() + 12 * 3600 * 1000);
      const apiAuth = Directus(token);
      const loggedInUser = await apiAuth.request(
        readMe({ fields: ["id", "email", "first_name", "last_name", "role.name"] })
      );
      const user: User = {
        id: loggedInUser.id,
        first_name: loggedInUser.first_name ?? "",
        last_name: loggedInUser.last_name ?? "",
        email: loggedInUser.email ?? "",
        role: loggedInUser.role.name ?? "",
        access_token: token,
        expires: expireFloor,
        refresh_token: "",
      };
      return user;
  } catch (error: any) {
    return null;
  }
}

const { DIRECTUS_CLIENT_ID, DIRECTUS_CLIENT_SECRET } = process.env;

const authOptions: NextAuthConfig = {
  providers: [
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
      },
      authorize: async (credentials) => {
        if ("email" in credentials && "password" in credentials) {
          try {
            const { email, password } = credentials as { email: string; password: string; };
            const auth = await login({ email, password });
            const user = await getUserData(auth.access_token ?? "");
            if (user) {
              user.expires = Math.floor(Date.now() + (auth.expires ?? 0));
              user.refresh_token = auth.refresh_token ?? "";
              return user;
            } else {
              throw new Error("Email address or password is invalid");
            }
          } catch (error: any) {
            handleError(error.Configuration);
            return null;
          }
        }
        await getCookieData();
        const cookieStore = cookies();
        const cookieDirect = cookieStore.get(process.env.DIRECTUS_SESSION_TOKEN_NAME || "directus_session_token");
        const cookieDirectValue = cookieDirect?.value; 
        if (cookieDirectValue !== undefined) {
          return getUserData(cookieDirectValue);
        }
        if ("cookieData" in credentials) {
          const { cookieData } = credentials as { cookieData: string };
          if (cookieData !== undefined) {
            return getUserData(cookieData);
          }
        }
        return null;
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
      if (trigger === "update" && session?.tokenIsRefreshed === false) {
        if (session.access_token && session.refresh_token && session.expires_at) {
          token.access_token = session.access_token;
          token.refresh_token = session.refresh_token;
          token.expires_at = session.expires_at;
          token.tokenIsRefreshed = false;
        }
      }
  
      if (account && user) {
        return {
          access_token: user.access_token,
          expires_at: user.expires,
          refresh_token: user.refresh_token,
          user: user,
          role: user.role,
          error: null,
        };
      } else if (token.expires_at && Date.now() < token.expires_at) {
        return { ...token, error: null };
      } else {
        try {
          const api = Directus();
          const result: AuthRefresh = await api.request(
            refresh("json", user?.refresh_token ?? token?.refresh_token ?? "")
          );
          return {
            ...token,
            access_token: result.access_token ?? "",
            expires_at: Math.floor(Date.now() + (result.expires ?? 0)),
            refresh_token: result.refresh_token ?? "",
            error: null,
            tokenIsRefreshed: true,
          };
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      if (token.error) {
        throw new Error(token.error);
      } else {
        interface UserParams {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          role: string;
          access_token: string;
          expires: number;
          refresh_token: string;
        }
        const { id, first_name, last_name, email, role, access_token, expires, refresh_token } = token.user as UserParams;
        session.user = { 
          id: id ?? "", 
          name: `${first_name ?? ""} ${last_name ?? ""}`,
          email: email ?? "", 
          role: role ?? "",
          emailVerified: new Date(), 
          first_name: first_name ?? "",
          last_name: last_name ?? "",
          access_token: "", //returned only for AdapterRouter
          expires: 0,//returned only for AdapterRouter
          refresh_token: "", //returned only for AdapterRouter
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export { authOptions };