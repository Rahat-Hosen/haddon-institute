"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { format } from "date-fns";

const formSchema = z.object({
  title: z.string(),
  slug: z.string(),
  code: z.string(),
  description: z.string(),
  overview: z.string(),
  campus: z.string(),
  format: z.string(),
  lectures: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  objectives: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  requiredTexts: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  optionalTexts: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  workload: z.string(),
  workloadHours: z.string(),
  weeks: z.string(),
  assessment: z.string(),
  passingReq: z.string(),
  season: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  lecturer: z.string(),
  lecturerEmail: z.string().email("This is not a valid email address."),
  coord: z.string(),
  coordEmail: z.string().email("This is not a valid email address."),
  admin: z.string(),
  adminEmail: z.string().email("This is not a valid email address."),
  categories: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  price: z.string(),
  capstone: z.boolean(),
});

export default function EditCourseForm({ course }: { course: any }) {
  const router = useRouter();

  const [generatedSlug, setGeneratedSlug] = useState(course.slug || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      code: course.code,
      description: course.description,
      overview: course.overview,
      format: course.format,
      lectures: course.lectures,
      objectives: course.objectives,
      requiredTexts: course.requiredTexts,
      optionalTexts: course.optionalTexts,
      workload: course.workload,
      workloadHours: course.workloadHours,
      weeks: course.weeks,
      campus: course.campus,
      assessment: course.assessment,
      passingReq: course.passingReq,
      season: course.season,
      startDate: course.startDate,
      endDate: course.endDate,
      lecturer: course.lecturer,
      lecturerEmail: course.lecturerEmail,
      coord: course.coord,
      coordEmail: course.coordEmail,
      admin: course.admin,
      adminEmail: course.adminEmail,
      categories: course.categories,
      price: course.price,
      capstone: course.capstone,
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

  const {
    fields: lectureFields,
    append: addLecture,
    remove: removeLecture,
  } = useFieldArray({
    name: "lectures",
    control: form.control,
  });

  const {
    fields: objectivesFields,
    append: addObjective,
    remove: removeObject,
  } = useFieldArray({
    name: "objectives",
    control: form.control,
  });

  const {
    fields: requiredTextsFields,
    append: addRequiredText,
    remove: removeRequiredText,
  } = useFieldArray({
    name: "requiredTexts",
    control: form.control,
  });

  const {
    fields: optionalTextsFields,
    append: addOptionalText,
    remove: removeOptionalText,
  } = useFieldArray({
    name: "optionalTexts",
    control: form.control,
  });

  const {
    fields: categoryFields,
    append: addCategory,
    remove: removeCategory,
  } = useFieldArray({
    name: "categories",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const priceInCents = parseFloat(values.price.replace(/[^\d.]/g, "")) * 100;

    const formData = {
      ...values,
      id: course.id,
      price: `${priceInCents}`,
    };

    const response = await fetch("/api/admin/edit-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast({
        title: "Course Updated",
        description: "Course was successfully updated.",
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
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Season</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
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
                <FormLabel>Start Date</FormLabel>
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
                <FormLabel>End Date</FormLabel>
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
              <FormLabel>Overview</FormLabel>
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
              <FormLabel>Description</FormLabel>
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
          name="campus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campus</FormLabel>
              <FormDescription>
                Add where the course will be taught.
              </FormDescription>
              <FormControl>
                <Input placeholder="The Armoury Bookshop..." {...field} />
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
              <FormLabel>Teaching Format</FormLabel>
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
        <div>
          {objectivesFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`objectives.${index}.value`}
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Objectives
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add course objectives.
                    </FormDescription>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        {index !== 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="my-auto"
                            onClick={() => removeObject(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => addObjective({ value: "" })}
          >
            Add Objective
          </Button>
        </div>
        <div>
          {lectureFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`lectures.${index}.value`}
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Lectures
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add day and times for in-person lectures.
                    </FormDescription>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        {index !== 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="my-auto"
                            onClick={() => removeLecture(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => addLecture({ value: "" })}
          >
            Add Lecture
          </Button>
        </div>
        <div>
          {requiredTextsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`requiredTexts.${index}.value`}
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Required Texts
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Provide required reading texts.
                    </FormDescription>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        {index !== 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="my-auto"
                            onClick={() => removeRequiredText(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => addRequiredText({ value: "" })}
          >
            Add Text
          </Button>
        </div>
        <div>
          {optionalTextsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`optionalTexts.${index}.value`}
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Optional Texts
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Provide optional reading texts.
                    </FormDescription>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        {index !== 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="my-auto"
                            onClick={() => removeOptionalText(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => addOptionalText({ value: "" })}
          >
            Add Text
          </Button>
        </div>
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
              <FormLabel>Passing Requirements</FormLabel>
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
        <FormField
          control={form.control}
          name="workloadHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workload Hours</FormLabel>
              <FormDescription>
                Estimate of hours per week required.
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weeks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weeks</FormLabel>
              <FormDescription>
                How many weeks will the course take place over?
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="lecturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer</FormLabel>
                  <FormControl>
                    <Input placeholder="Lecturer Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lecturerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Lecturer Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="coord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinator</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Coordinator Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coordEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coordinator Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Coordinator Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="admin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Administrator</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Administrator Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adminEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Administrator Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Administrator Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          {categoryFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`categories.${index}.value`}
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Categories
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add relevant categories to help users find this course.
                    </FormDescription>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        {index !== 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            className="my-auto"
                            onClick={() => removeCategory(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => addCategory({ value: "" })}
          >
            Add Category
          </Button>
        </div>
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
          <Link
            href={`/admin/${course.slug}`}
            className={`flex gap-2 ${buttonVariants()}`}
          >
            <MoveLeft className="w-4 h-4" /> Back to Course
          </Link>

          <Button type="submit" className="flex gap-2">
            <Save className="w-4 h-4" /> Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
