import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { EditIcon, MoveLeft } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import NewLesson from "@/components/dashboard/new-lesson";
import PublishCourse from "@/components/dashboard/publish-course";
import CoverImage from "@/components/dashboard/cover-image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default async function AdminCoursePage({ params }: any) {
  const { userId } = auth();

  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  const { course } = params;

  if (!course) {
    redirect("/not-found");
  }

  const data = await prisma.course.findUnique({
    where: {
      slug: course,
    },
    include: { Lesson: true, users: true },
  });

  if (!data) {
    redirect("/not-found");
  }

  const tableData = data.Lesson.map((lesson: any) => {
    return {
      id: lesson.id,
      course: course,
      title: lesson.title,
      video: lesson.video,
      published: lesson.published,
      lesson: lesson.slug,
    };
  });

  return (
    <div className="px-4 space-y-8 mb-10 max-w-7xl mx-auto">
      <Link href={`/dashboard`} className={`flex gap-2 ${buttonVariants()}`}>
        <MoveLeft className="w-4 h-4" /> Course List
      </Link>
      <div className="flex justify-between">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl">{data.title}</h1>
          <div>
            <h2 className="font-bold text-xl">Description</h2>
            <p>{data.description}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Overview</h2>
            <p className="whitespace-pre-line">{data.overview}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Format</h2>
            <p className="whitespace-pre-line">{data.format}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Lecture Dates</h2>

            {Array.isArray(data.lectures) &&
              data.lectures.map((data: any, index) => (
                <p key={index}>{data.value}</p>
              ))}
          </div>
          <div>
            <h2 className="font-bold text-xl">Objectives</h2>
            <p>Students who are successful in this course should be able to:</p>
            <ul className="space-y-2">
              {Array.isArray(data.objectives) &&
                data.objectives.map((data: any, index) => (
                  <li key={index}>
                    {index + 1}. {data.value}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">Required Texts</h2>

            {Array.isArray(data.requiredTexts) &&
              data.requiredTexts.map((data: any, index) => (
                <p key={index}>{data.value}</p>
              ))}
          </div>
          <div>
            <h2 className="font-bold text-xl">Optional Texts</h2>

            {Array.isArray(data.optionalTexts) &&
              data.optionalTexts.map((data: any, index) => (
                <p key={index}>{data.value}</p>
              ))}
          </div>
          <div>
            <h2 className="font-bold text-xl">Workload</h2>
            <p className="whitespace-pre-line">{data.workload}</p>
          </div>
          <div>
            <h2 className="font-bold text-xl">Assessment</h2>
            <p className="whitespace-pre-line">{data.assessment}</p>
          </div>
          <h2 className="font-bold text-xl mt-10">People</h2>
          <div className="flex gap-8">
            <div>
              <h3 className="font-semibold">Course Coordinator</h3>
              <p>{data.coord}</p>
              <p>{data.coordEmail}</p>
            </div>
            <div>
              <h3 className="font-semibold">Course Administrator</h3>
              <p>{data.admin}</p>
              <p>{data.adminEmail}</p>
            </div>
            <div>
              <h3 className="font-semibold">Course Lecturer</h3>
              <p>{data.lecturer}</p>
              <p>{data.lecturerEmail}</p>
            </div>
          </div>
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
            {Array.isArray(data.categories) &&
              data.categories.map((data: any, index) => (
                <p key={index} className="border px-4 py-1 rounded-2xl">
                  {data.value}
                </p>
              ))}
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <PublishCourse published={data.published} course={course} />
          </div>

          <Link
            href={`/dashboard/course/${course}/edit`}
            className={`flex gap-2 ${buttonVariants()}`}
          >
            <EditIcon className="w-5 h-5" /> Edit
          </Link>
        </div>
      </div>

      <CoverImage
        course={course}
        title={data.title}
        thumbnail={data.thumbnail || "/logos/haddon-institute-logo.jpeg"}
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
