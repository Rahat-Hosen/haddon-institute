"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WeeklyPaymentsForm({
  email,
  name,
  courses,
}: {
  email: string;
  name: string;
  courses: any;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  async function onSubmit() {
    if (!selectedCourse) {
      // If selectedCourse is empty, display an error message or perform any action
      toast({
        title: "Course Not Selected",
        description: "Please select a course before submitting.",
        variant: "destructive",
      });
      return; // Prevent further execution of onSubmit
    }

    setIsSubmitting(true);

    const response = await fetch("/api/weekly-payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        course: selectedCourse,
      }),
    });

    if (response.ok) {
      setIsSubmitting(false);

      toast({
        title: "Interest Noted! 🎉",
        description:
          "You will be contacted within 1-2 days to discuss formal payment.",
      });
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
    <div className="flex justify-center">
      <div className="space-y-4">
        <Select
          onValueChange={(value: string) => {
            setSelectedCourse(value);
          }}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course: any, index: any) => (
              <SelectItem key={index} value={course.title}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isSubmitting ? (
          <Button className="w-full" disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button className="w-full" onClick={onSubmit}>
            Register Interest
          </Button>
        )}
      </div>
    </div>
  );
}
