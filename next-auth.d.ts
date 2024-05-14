import NextAuth, { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    firstName: string,
    lastName: string,
    verifiedEmail: boolean,
    avatar: string,
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}