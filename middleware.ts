import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { DEFAULT_LOGIN_REDIRECT, apiRoutesPrefix, authRoutes, publicRoutes } from "@/lib/routes"

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
    const { nextUrl, } = req
    const isLoggedIn = !!req.auth
    // const isVerifiedEmail = req.auth?.user.verifiedEmail

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiRoutesPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) return

    if (isAuthRoute) {
        // If user has logged in they cannot open signin page or signup page
        if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        return
    }

    //If user not logged in and not in public routes they will redirect to login page
    if (!isLoggedIn) return Response.redirect(new URL('/signin', nextUrl))
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}