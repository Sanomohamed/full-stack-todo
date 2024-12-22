// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported.
 */
import { serverSchema, serverEnv } from "./schema.mjs";
import { env as clientEnv, formatErrors } from "./client.mjs";

// Validate the server environment variables using the schema
const _serverEnv = serverSchema.safeParse(serverEnv);

// Check if the environment variables validation was successful
if (!_serverEnv.success) {
  // Log the formatted errors to the console
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format()),
  );
  // Throw an error to stop the application if validation fails
  throw new Error("Invalid environment variables");
}

// Ensure no server-side environment variables start with "NEXT_PUBLIC_"
for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    // Log a warning if a server-side environment variable is exposed
    console.warn("❌ You are exposing a server-side env-variable:", key);
    // Throw an error to stop the application if an invalid name is found
    throw new Error("You are exposing a server-side env-variable");
  }
}

// Export the validated environment variables, combining server and client env variables
export const env = { ..._serverEnv.data, ...clientEnv };
