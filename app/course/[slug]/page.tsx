import CourseCard from "@/components/course-card";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Course({ params }: any) {
  const { slug } = params;

  if (!slug) {
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
    include: { Lesson: true, users: true },
  });

  if (!course) {
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  if (user && course.users.find((u) => u.id === user.id)) {
    return (
      <div className="my-10 text-center">
        <h1 className="font-semibold text-xl">You already own this course.</h1>
        <p className="text-muted-foreground">
          View the course on your{" "}
          <Link
            href="/my-courses"
            className="underline hover:no-underline text-white hover:text-muted-foreground"
          >
            My Courses
          </Link>{" "}
          page.
        </p>
      </div>
    );
  }

  return (
    <>
      <CourseCard
        userId={user?.id}
        userEmail={user?.emailAddresses[0].emailAddress}
        course={course}
      />
    </>
  );
}
