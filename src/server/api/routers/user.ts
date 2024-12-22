import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// Define the userRouter using createTRPCRouter
export const userRouter = createTRPCRouter({
  // Define a query to fetch user info
  getUser: protectedProcedure.query(async ({ ctx }) => {
    // Fetch the user from the database where the ID matches the current user's ID
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // Return the user's id, name, email, and image
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  }),

  // Define a mutation to update user info
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(), // Optional name field
        email: z.string().email().optional(), // Optional email field with email validation
        image: z.string().url().optional(), // Optional image field with URL validation
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Update the user in the database with the provided input data
      const updatedUser = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });

      // Return the updated user's id, name, email, and image
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      };
    }),
});