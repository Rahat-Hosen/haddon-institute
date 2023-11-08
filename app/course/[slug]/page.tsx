import CourseCard from "@/components/course-card";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Course({ params }: any) {
  const { slug } = params;

  if (!slug) {
    redirect("/not-found");
  }

  const user = await currentUser();

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
      published: true,
    },
    include: { Lesson: true, users: true },
  });

  if (!course) {
    redirect("/not-found");
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
