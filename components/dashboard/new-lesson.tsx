"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusSquare } from "lucide-react";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
});

export default function NewLesson({
  courseId,
  course,
}: {
  courseId: any;
  course: any;
}) {
  const router = useRouter();

  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [generatedSlug, setGeneratedSlug] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
    },
  });

  const generateSlug = (title: any) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
  };

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value;
    const newSlug = generateSlug(newTitle);
    setGeneratedSlug(newSlug); // Update the generated slug in the state
    form.setValue("slug", newSlug); // Update the slug field in the form
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      courseId,
    };

    const response = await fetch("/api/dashboard/new-lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast({
        title: "Lesson Created",
        description: "Lesson was successfully created!",
      });

      router.push(`/dashboard/edit/${course}/${values.slug}`);
    } else {
      toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Button onClick={() => setShowCreateDialog(true)}>
        <PlusSquare className="mr-2 h-4 w-4" />
        New Lesson
      </Button>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Lesson</DialogTitle>
            <DialogDescription>
              Give your lesson a title, slug and outline.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lesson Title"
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
                      This will reflect as the lesson URL.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="lesson-slug"
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
                    <FormLabel>Outline</FormLabel>
                    <FormDescription>
                      This will appear on the public facing course preview page.
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="An outline of what content to expect..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
