"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addColor } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string(),
  color: z.string(),
});

export function FormAddColor() {
  // 1. Define your form.
  const [loading, setLoading] = useState<Boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#000000",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await addColor(values);

    if (res.error) {
      toast.error(res.error.message, {
        theme: "colored",
      });
    } else {
      toast.success(res.message, {
        theme: "colored",
      });
      router.push("/dashboard/colors");
      form.reset();
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Color name <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter a color name" {...field} />
                </FormControl>
                {/*  <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-[50px]">
                <FormLabel>
                  Color <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter a color" type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loading ? (
          <Button disabled={true}>
            <span className="loader"></span>
          </Button>
        ) : (
          <Button type="submit">Add Color</Button>
        )}
      </form>
    </Form>
  );
}
