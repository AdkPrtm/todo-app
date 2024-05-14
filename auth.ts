import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db/db"
import authConfig from "./auth.config"
import { getUserById } from "./lib/db/actions/user.actions"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    basePath: '/api/auth',
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async session({ session, token }) {
            const {sub, createdAt, iat, exp, jti, ...allData } = token
            const res = {
                ...session,
                user: {
                    ...allData,
                    id: token.sub
                }
            }
            return res
        },
        async jwt({ token }) {
            if (!token.sub) return null

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return null
            const { password, email, id, ...allData } = existingUser
            const res = {
                ...token,
                ...allData
            }
            return res;
        }
    },
    ...authConfig,
})