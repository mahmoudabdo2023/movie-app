import { BASE_URL } from "@/api/Api";
import { CustomUser } from "@/lib/types";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (res.ok && data.success) {
          // Combine user data with token
          return { ...data.data.user, token: data.data.token } as CustomUser;
        }
        throw new Error(data.message || "Authentication failed");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as CustomUser;
        // token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as CustomUser;
      // session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
