import CourseCard from "@/components/course-card";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

async function retrieveCourse(slug: string) {
  const data = await prisma.course.findUnique({
    where: {
      slug: slug,
      published: true,
    },
    include: { Lesson: true, users: true },
  });

  if (!data) {
    redirect("/not-found");
  }

  return data;
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  const course = await retrieveCourse(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${course.title} | Haddon Institute`,
    description: course.description,
    openGraph: {
      images: [course.thumbnail || "/logos/5.jpeg", ...previousImages],
    },
  };
}

export default async function Course({ params }: any) {
  const { slug } = params;

  if (!slug) {
    redirect("/not-found");
  }

  const user = await currentUser();

  const course = await retrieveCourse(slug);

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
