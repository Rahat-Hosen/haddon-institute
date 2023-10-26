import NewCourseForm from "@/components/admin/new-course-form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function NewCourse() {
  const ADMIN_IDS = process.env.ADMIN_IDS?.split(",");

  const { userId } = auth();

  if (userId && !ADMIN_IDS?.includes(userId)) {
    redirect("/unauthorised");
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <NewCourseForm />
    </div>
  );
}
