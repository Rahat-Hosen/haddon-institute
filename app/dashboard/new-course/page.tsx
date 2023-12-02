import NewCourseForm from "@/components/dashboard/new-course-form";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function NewCourse() {
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

  return (
    <div className="max-w-2xl mx-auto w-full">
      <NewCourseForm />
    </div>
  );
}
