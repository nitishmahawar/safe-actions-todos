import AddTodo from "@/components/add-todo";
import { getTodos } from "@/lib/actions";
import React from "react";

const Page = async () => {
  const todos = await getTodos();
  return (
    <main className="px-4 py-6 space-y-6">
      <h1 className="text-3xl font-semibold text-center text-primary">
        Safe Actions Todos
      </h1>
      <div className="w-full max-w-xl mx-auto">
        <AddTodo />
      </div>
      <div>
        {todos.map(({ id, text }) => (
          <div key={id}>{text}</div>
        ))}
      </div>
    </main>
  );
};

export default Page;
