/**
 * An array of routes accessible to the public
 * These routes do not need authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
]

/**
 * An array of routes that need authentication
 * These routes will redirect logged in users to settings
 * @type {string[]}
 */
export const authRoutes = [
    "/signin",
    "/signup",
]

/**
 * These prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiRoutesPrefix = '/api/'

/**
 * The default  redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/'