import EditCourseForm from "@/components/dashboard/edit-course-form";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function EditCourse({ params }: any) {
  const { userId } = auth();

  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  const { course } = params;

  if (!course) {
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  const data = await prisma.course.findUnique({
    where: {
      slug: course,
    },
    include: { Lesson: true },
  });

  if (!data) {
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <EditCourseForm course={data} />
    </div>
  );
}

// FIX CATEGORIES AND PRICE ISSUES
