import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CourseLessons({ params }: any) {
  const slug = params.course;

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!course) {
    redirect("/error");
  }

  const lessons = await prisma.lesson.findMany({
    where: {
      course: {
        slug: slug,
      },
      published: true,
    },
  });

  if (!lessons) {
    redirect("/error");
  }

  return (
    <div className="space-y-8 px-4 my-10 xl:px-24 xl:my-20">
      <div>
        <h3 className="text-2xl font-bold">{course.title}</h3>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold">Lessons</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lessons.length > 0 ? (
            lessons.map((lesson: any) => (
              <div key={lesson.id} className="border rounded-md p-4 w-full">
                <Link
                  href={`/my-courses/${slug}/${lesson.slug}`}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-semibold leading-snug">
                    {lesson.title}
                  </h2>
                  <p className="whitespace-pre-line">
                    {lesson.description.replace(/-/g, "•")}
                  </p>
                  <div>
                    <Button className="flex gap-2">
                      View Lesson <MoveRight className="w-5 h-5" />
                    </Button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-lg">
              No lessons have been been made available yet, check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
