import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Courses() {
  const courses = await prisma.course.findMany();

  return (
    <>
      <div className="space-y-2 max-w-md mx-auto">
        {courses.map((course: any) => (
          <div
            key={course.id}
            className="border rounded-md p-8 flex flex-col gap-2 items-start max-w-md mx-auto"
          >
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p>{course.description}</p>
            <Link href={`/course/${course.id}`}>View Course</Link>
          </div>
        ))}
      </div>
    </>
  );
}

// BUILD NICE COURSE LIST PAGE
