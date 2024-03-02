"use server";
import { action } from "@/lib/safe-actions";
import { z } from "zod";
import prisma from "@/lib/prisma";

const createTodoSchema = z.object({
  text: z.string().min(1, { message: "Text is required!" }),
});

export const createTodo = action(createTodoSchema, async ({ text }) => {
  const todo = await prisma.todo.create({ data: { text } });

  return todo;
});

export const getTodos = async () => {
  const todos = await prisma.todo.findMany();

  return todos;
};
