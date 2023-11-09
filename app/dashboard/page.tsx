import AnimatedText from "@/components/animated-text";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { columns as courseColumns } from "./course-columns";
import { columns as eventColumns } from "./event-columns";
import { DataTable as CourseDataTable } from "./course-data-table";
import { DataTable as EventDataTable } from "./event-data-table";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Administrator Dashboard | Haddon Institute",
  description: "Administrator Dashboard for Haddon Institute.",
};

export default async function AdministratorDashboard() {
  const courses = await prisma.course.findMany();

  const courseData = courses.map((course: any) => {
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      published: course.published,
      capstone: course.capstone,
    };
  });

  const events = await prisma.events.findMany();

  const eventData = events.map((event: any) => {
    return {
      id: event.id,
      slug: event.slug,
      title: event.title,
      published: event.published,
    };
  });

  return (
    <div className="flex justify-center items-center h-[80vh] w-full">
      <div className="space-y-8">
        <AnimatedText
          text="Administrator Dashboard"
          className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
        />
        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">Courses</h2>
              <Link
                href={`/dashboard/new-course`}
                className={`flex gap-2 ${buttonVariants({ size: "sm" })}`}
              >
                <PlusIcon className="w-5 h-5" /> New Course
              </Link>
            </div>
            <CourseDataTable columns={courseColumns} data={courseData} />
          </div>
          <Separator />
          <div>
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">Events</h2>
              <Link
                href={`/dashboard/new-event`}
                className={`flex gap-2 ${buttonVariants({ size: "sm" })}`}
              >
                <PlusIcon className="w-5 h-5" /> New Event
              </Link>
            </div>
            <EventDataTable columns={eventColumns} data={eventData} />
          </div>
        </div>
      </div>
    </div>
  );
}
