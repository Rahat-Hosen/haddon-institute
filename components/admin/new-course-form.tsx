"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { MoveLeft, Save } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  author: z.string(),
  categories: z.string(),
  price: z.string(),
  capstone: z.boolean(),
});

export default function NewCourseForm() {
  const router = useRouter();

  const [generatedSlug, setGeneratedSlug] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      author: "",
      categories: "",
      price: "",
    },
  });

  const generateSlug = (title: any) => {
    return title.toLowerCase().replace(/ /g, "-");
  };

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value;
    const newSlug = generateSlug(newTitle);
    setGeneratedSlug(newSlug); // Update the generated slug in the state
    form.setValue("slug", newSlug); // Update the slug field in the form
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const priceInCents = parseFloat(values.price.replace(/[^\d.]/g, "")) * 100;

    const formData = {
      ...values,
      price: `${priceInCents}`,
    };

    const response = await fetch("/api/admin/new-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast({
        title: "Course Created",
        description: "Course was successfully created!",
      });

      router.push(`/admin/${values.slug}`);
    } else {
      toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Course Title"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // Trigger form field change event
                    handleTitleChange(e); // Call custom handler for title change
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormDescription>
                This will reflect as the course URL.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="course-slug"
                  {...field}
                  value={generatedSlug}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Course Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormDescription>
                Separate additional categories with a comma.
              </FormDescription>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Category 1,Category 2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormDescription>Use a format like $X.YY</FormDescription>
              <FormControl>
                <Input
                  type="text"
                  placeholder="$0.00"
                  {...field}
                  onChange={(e) => {
                    // Remove non-numeric characters and convert to cents
                    const value = e.target.value;

                    // Set the numeric value in cents to the form field
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capstone"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is this a capstone course?</FormLabel>
                <FormDescription>
                  A capstone course typically includes an exam or paper to be
                  completed as a requirement for graduation.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Link href={`/admin`} className={`flex gap-2 ${buttonVariants()}`}>
            <MoveLeft className="w-4 h-4" /> Course List
          </Link>

          <Button type="submit" className="flex gap-2">
            <Save className="w-4 h-4" /> Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
