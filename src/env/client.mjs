// @ts-check
import { clientEnv, clientSchema } from "./schema.mjs";

// Validate the client environment variables using the schema
const _clientEnv = clientSchema.safeParse(clientEnv);

// Function to format errors from the Zod validation
export const formatErrors = (
  /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

// Check if the environment variables validation was successful
if (!_clientEnv.success) {
  // Log the formatted errors to the console
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_clientEnv.error.format()),
  );
  // Throw an error to stop the application if validation fails
  throw new Error("Invalid environment variables");
}

// Ensure all environment variable names start with "NEXT_PUBLIC_"
for (let key of Object.keys(_clientEnv.data)) {
  if (!key.startsWith("NEXT_PUBLIC_")) {
    // Log a warning if an invalid public environment variable name is found
    console.warn(
      `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
    );
    // Throw an error to stop the application if an invalid name is found
    throw new Error("Invalid public environment variable name");
  }
}

// Export the validated environment variables
export const env = _clientEnv.data;