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
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Administrator Dashboard | Haddon Institute",
  description: "Administrator Dashboard for Haddon Institute.",
};

export default async function AdministratorDashboard() {
  const user = await currentUser();

  const isAdmin =
    user &&
    (
      await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
      })
    )?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

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
    <div className="mx-auto w-full max-w-7xl px-4 py-20">
      <div className="space-y-8">
        <div className="space-y-4 w-full">
          <div>
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">Courses</h2>
              <Link
                href={`/dashboard/new-course`}
                className={`flex gap-2 ${buttonVariants()}`}
              >
                <PlusIcon className="w-5 h-5" /> New Course
              </Link>
            </div>
            <CourseDataTable columns={courseColumns} data={courseData} />
          </div>

          <div>
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">Events</h2>
              <Link
                href={`/dashboard/new-event`}
                className={`flex gap-2 ${buttonVariants()}`}
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
