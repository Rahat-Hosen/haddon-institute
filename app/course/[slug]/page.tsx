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
      type: "video.other",
      siteName: `sdelta.xyz`,
      title: `${course.title} | Haddon Institute`,
      description: course.description,
      url: `https://haddoninstitute.org/course/${course.slug}`,
      countryName: "Australia",
      locale: "en_AU",
      videos: [
        {
          url: `https://stream.mux.com/${course.video}/high.mp4`,
          width: 1920,
          height: 1080,
          type: "video/mp4",
        },
      ],
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
    <CourseCard
      userId={user?.id}
      userEmail={user?.emailAddresses[0].emailAddress}
      course={course}
    />
  );
}
