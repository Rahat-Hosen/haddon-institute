import EditCourseForm from "@/components/admin/edit-course-form";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function EditCourse({ params }: any) {
  const ADMIN_IDS = process.env.ADMIN_IDS?.split(",");

  const { userId } = auth();

  if (userId && !ADMIN_IDS?.includes(userId)) {
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
      <EditCourseForm
        courseId={data.id}
        courseTitle={data.title}
        courseSlug={data.slug}
        courseDescription={data.description}
        courseAuthor={data.author}
        courseCategories={data.categories}
        coursePrice={data.price}
        courseCaptsone={data.capstone}
      />
    </div>
  );
}

// FIX CATEGORIES AND PRICE ISSUES
