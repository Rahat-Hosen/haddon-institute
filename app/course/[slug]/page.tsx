import CourseCard from "@/components/course-card";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function Course({ params }: any) {
  const { slug } = params;

  if (!slug) {
    // Handle the case where `slug` is undefined or empty, possibly by returning an error or a default page.
    // You can return an error page, a 404, or handle it according to your application's logic.
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  const user = await currentUser();

  const course = await prisma.course.findUnique({
    where: {
      slug: slug, // Assuming that the slug is a unique identifier for courses
    },
  });

  if (!course) {
    // Handle the case where no course with the specified slug is found, possibly by returning an error or a default page.
    // You can return an error page, a 404, or handle it according to your application's logic.
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  return (
    <>
      <CourseCard
        userId={user?.id}
        userEmail={user?.emailAddresses[0].emailAddress}
        courseId={course.id}
        courseName={course.title}
        courseDescription={course.description}
        coursePrice={course.price}
      />
    </>
  );
}
