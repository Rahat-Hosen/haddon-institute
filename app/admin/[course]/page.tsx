import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { EditIcon, MoveLeft } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import NewLesson from "@/components/admin/new-lesson";
import PublishCourse from "@/components/admin/publish-course";
import CoverImage from "@/components/admin/cover-image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default async function AdminCoursePage({ params }: any) {
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
    include: { Lesson: true, users: true },
  });

  if (!data) {
    return (
      <>
        <p>Course not found</p>
      </>
    );
  }

  const tableData = data.Lesson.map((lesson: any) => {
    return {
      id: lesson.id,
      slug: lesson.slug,
      title: lesson.title,
      video: lesson.video,
      published: lesson.published,
      course: course,
    };
  });

  return (
    <div className="px-24 space-y-8 mb-10">
      <Link href={`/admin`} className={`flex gap-2 ${buttonVariants()}`}>
        <MoveLeft className="w-4 h-4" /> Course List
      </Link>
      <div className="flex justify-between">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl">{data.title}</h1>
          <div>
            <h2 className="font-semibold">Overview</h2>
            <p>{data.description}</p>
          </div>
          <p>Instructed by {data.author}</p>
          <div className="flex gap-4">
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              }).format(parseFloat(data.price) / 100)}
            </p>
            <p>{data.Lesson.length} lessons</p>
            <p>{data.users.length} user/s enrolled</p>
          </div>
          <div className="flex gap-4">
            {data.categories.split(",").map((category, index) => (
              <div key={index} className="border px-4 py-1 rounded-2xl">
                {category.trim()}{" "}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <PublishCourse published={data.published} course={course} />
          </div>

          <Link
            href={`/admin/edit/${course}`}
            className={`flex gap-2 ${buttonVariants()}`}
          >
            <EditIcon className="w-5 h-5" /> Edit Course
          </Link>
        </div>
      </div>

      <CoverImage
        course={course}
        title={data.title}
        thumbnail={data.thumbnail || "/haddon-institute-logo.jpeg"}
      />

      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-2xl">Lessons</h1>
            <p className="text-sm text-muted-foreground">
              View and manage the lessons in this course.
            </p>
          </div>
          <NewLesson courseId={data.id} course={course} />
        </div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
