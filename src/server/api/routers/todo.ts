import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { todoInput } from "../../../types";

// Define the todoRouter using createTRPCRouter
export const todoRouter = createTRPCRouter({
  // Define a query to get all todos for the current user
  all: protectedProcedure.query(async ({ ctx }) => {
    // Fetch todos from the database where the userId matches the current user's ID
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    // Map the todos to return only the id, text, and done properties
    return todos.map(({ id, text, done }) => ({ id, text, done }));
  }),
  
  // Define a mutation to create a new todo
  create: protectedProcedure.input(todoInput).mutation(({ ctx, input }) => {
    // Create a new todo in the database with the provided text and associate it with the current user
    return ctx.prisma.todo.create({
      data: {
        text: input,
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),

  // Define a mutation to delete a todo by its ID
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    // Delete the todo from the database where the ID matches the provided input
    return ctx.prisma.todo.delete({
      where: {
        id: input,
      },
    });
  }),

  // Define a mutation to toggle the done status of a todo
  toggle: protectedProcedure
    .input(
      z.object({
        id: z.string(), // The ID of the todo to update
        done: z.boolean(), // The new done status
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      // Update the todo in the database with the new done status
      return ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),
});