/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    secret: process.env.NEXTAUTH_SECRET || "your_nextauth_secret",
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/',
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                if (!user || !(user as any).password) {
                    throw new Error("Invalid credentials");
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    (user as any).password
                );
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }
                return user as any;
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session.user && token.sub) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
