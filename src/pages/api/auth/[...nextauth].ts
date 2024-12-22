import NextAuth from "next-auth";
import { authOptions } from "../../../server/auth";

// This file configures NextAuth.js for authentication in a Next.js application.
// It imports the NextAuth function and the authOptions configuration from the server/auth module.
// The NextAuth function is called with the authOptions to set up authentication with the specified options.
// The default export is the configured NextAuth function, which will handle authentication requests.
export default NextAuth(authOptions);