import { PrismaClient } from "@prisma/client";

import { env } from "../env/server.mjs";

// Type assertion to ensure globalThis has a prisma property of type PrismaClient
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Create a singleton instance of PrismaClient
// If globalForPrisma.prisma already exists, use it; otherwise, create a new PrismaClient instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Configure logging based on the environment
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// In non-production environments, assign the prisma instance to globalForPrisma.prisma
// This ensures that the same PrismaClient instance is reused across the application
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;