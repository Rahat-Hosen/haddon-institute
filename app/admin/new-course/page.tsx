import NewCourseForm from "@/components/admin/new-course-form";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function NewCourse() {
  const { userId } = auth();

  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <NewCourseForm />
    </div>
  );
}
