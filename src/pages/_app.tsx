import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";

import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

// Define the custom App component for Next.js
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // Wrap the application with the SessionProvider to provide session context
    <SessionProvider session={session}>
      {/* Render the current page component with its props */}
      <Component {...pageProps} />
      {/* Include the Toaster component for displaying toast notifications */}
      <Toaster />
    </SessionProvider>
  );
};

// Export the App component wrapped with the TRPC HOC to enable TRPC functionality
export default api.withTRPC(MyApp);
