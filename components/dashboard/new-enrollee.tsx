"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Loader2, PlusSquare } from "lucide-react";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  enrollee: z.string(),
  email: z.string().email({ message: "Please enter a valid email." }),
});

export default function NewEnrollee({
  courseId,
  course,
}: {
  courseId: any;
  course: any;
}) {
  const router = useRouter();

  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enrollee: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const formData = {
      ...values,
      courseId,
    };

    const response = await fetch("/api/dashboard/new-enrollee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitting(false);

      toast({
        title: "Enrollee Created",
        description: "Enrollee was successfully created!",
      });

      router.push(`/dashboard/course/${course}/enrollees`);
    } else {
      setIsSubmitting(false);

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
        New Enrollee
      </Button>
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Enrollee</DialogTitle>
            <DialogDescription>
              Provide a name, email and select the course they are interested
              in.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="enrollee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enrollee Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isSubmitting ? (
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
