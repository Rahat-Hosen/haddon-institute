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
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { CalendarIcon, MoveLeft, Save } from "lucide-react";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string(),
  slug: z.string(),
  code: z.string(),
  description: z.string(),
  overview: z.string(),
  format: z.string(),
  objectives: z.string(),
  texts: z.string(),
  workload: z.string(),
  assessment: z.string(),
  passingReq: z.string(),
  season: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  lecturer: z.string(),
  coordinator: z.string(),
  administrator: z.string(),
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
      overview: "",
      format: "",
      objectives: "",
      texts: "",
      workload: "",
      assessment: "",
      passingReq: "",
      season: "",
      lecturer: "",
      coordinator: "",
      administrator: "",
      categories: "",
      price: "",
      capstone: false,
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
              <FormLabel>
                Title<span className="text-red-500">*</span>
              </FormLabel>
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
              <FormLabel>
                Slug<span className="text-red-500">*</span>
              </FormLabel>
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input placeholder="THEO 101S" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="overview"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Overview<span className="text-red-500">*</span>
              </FormLabel>
              <FormDescription>
                Include all course relevant information and information that
                does not fit into the other fields.
              </FormDescription>
              <FormControl>
                <Textarea placeholder="Long description" {...field} />
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
              <FormLabel>
                Description<span className="text-red-500">*</span>
              </FormLabel>
              <FormDescription>
                One to two sentences to describe the course.
              </FormDescription>
              <FormControl>
                <Input placeholder="Short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Teaching Format & Location
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormDescription>
                Provide information on how the course will be delivered.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="This course will be delivered in person..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Course Learning Objectives
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Students that are successful in this course should be able to..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="texts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Texts</FormLabel>
              <FormDescription>
                Provide optional and required reading texts.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Students should purchase the following..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assessment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assessments</FormLabel>
              <FormDescription>
                Describe what assessments will be conducted.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="To pass this course, students will take..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passingReq"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Passing Requirements<span className="text-red-500">*</span>
              </FormLabel>
              <FormDescription>
                Describe what is required for a pass.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="To pass this course, students will need to pass 50% of..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Course Season<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Autumn">Autumn</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Course Start Date<span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Course End Date<span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="workload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workload</FormLabel>
              <FormDescription>
                Desribe the estimated workload per week in hours.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Students are expected to work for 6 hours per week..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="lecturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Lecturer<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Lecturer Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coordinator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Coordinator</FormLabel>
                <FormControl>
                  <Input placeholder="Course Coordinator Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="administrator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Administrator</FormLabel>
                <FormControl>
                  <Input placeholder="Course Administrator Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Categories<span className="text-red-500">*</span>
              </FormLabel>
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
              <FormLabel>
                Price<span className="text-red-500">*</span>
              </FormLabel>
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
