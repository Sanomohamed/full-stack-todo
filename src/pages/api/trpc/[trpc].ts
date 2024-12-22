import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createTRPCContext } from "../../../server/api/trpc";
import { appRouter } from "../../../server/api/root";

// Export the API handler for tRPC
export default createNextApiHandler({
  // Specify the router to handle the API routes
  router: appRouter,
  // Function to create the context for each request
  createContext: createTRPCContext,
  // Error handling configuration
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          // Log detailed error information in development mode
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined, // No error logging in production mode
});