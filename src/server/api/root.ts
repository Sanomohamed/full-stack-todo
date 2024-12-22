import { createTRPCRouter } from "./trpc";
import { todoRouter } from "./routers/todo";
import { userRouter } from "./routers/user";
/**
 * This is the primary router for the server.
 *
 * All routers added in /api/routers
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter,
  user: userRouter,
});



// export type definition of API
export type AppRouter = typeof appRouter;
