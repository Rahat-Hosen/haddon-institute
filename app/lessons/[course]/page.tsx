import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CourseLessons({ params }: any) {
  const slug = params.course;

  const lessons = await prisma.lesson.findMany({
    where: {
      course: {
        slug: slug,
      },
      published: true,
    },
  });

  return (
    <div>
      <h1>Course Overview</h1>
      {lessons.map((lesson: any) => (
        <div
          key={lesson.id}
          className="border rounded-md p-8 flex flex-col gap-2 items-start max-w-md mx-auto"
        >
          <h2 className="text-xl font-bold">{lesson.title}</h2>
          <p>{lesson.description}</p>
          <Link href={`/lessons/${slug}/${lesson.slug}`}>View Lesson</Link>
        </div>
      ))}
    </div>
  );
}
