"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { createTodo } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  text: z.string().min(1),
});

const AddTodo = () => {
  const router = useRouter();
  const { execute, status } = useAction(createTodo, {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.fetchError);
    },
    onSettled: () => {
      router.refresh();
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Add your todo..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="shrink-0"
          size="icon"
          type="submit"
          disabled={status === "executing"}
        >
          {status === "executing" ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <Plus size={20} />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddTodo;
