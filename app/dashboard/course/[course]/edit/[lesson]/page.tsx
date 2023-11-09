import EditLessonForm from "@/components/dashboard/edit-lesson-form";
import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EditLesson({ params }: any) {
  const { userId } = auth();

  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  const { lesson } = params;

  if (!lesson) {
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  const data = await prisma.lesson.findUnique({
    where: {
      slug: lesson,
    },
    include: { course: true },
  });

  if (!data) {
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  return (
    <div className="px-24 space-y-8">
      <Link
        href={`/dashboard/course/${data.course.slug}`}
        className={`flex gap-2 ${buttonVariants()}`}
      >
        <MoveLeft className="w-4 h-4" />
        Course Overview
      </Link>
      <EditLessonForm blocks={data.blocks} slug={lesson} title={data.title} />
    </div>
  );
}
