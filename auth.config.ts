import type { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { signInUser } from "./lib/db/actions/user.actions"
import { SignInUserParams } from "./types/types"

export default {
    providers: [
        Credentials({
            name: "Credentials",
            async authorize(credentials, request): Promise<User | null> {
                const { email, password } = await request.json();
                const data: SignInUserParams = {
                    email: email,
                    password: password
                }
                const { user, error } = await signInUser(data);
                if (user) return user
                throw new Error(JSON.stringify({ errors: error }),)
            }
        })
    ],
} satisfies NextAuthConfig