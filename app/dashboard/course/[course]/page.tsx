import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { EditIcon, Eye, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import NewLesson from "@/components/dashboard/new-lesson";
import PublishCourse from "@/components/dashboard/publish-course";
import CoverImage from "@/components/dashboard/cover-image";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

export default async function AdminCoursePage({ params }: any) {
  const user = await currentUser();

  const isAdmin =
    user &&
    (
      await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
      })
    )?.admin;

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
    <div className="px-4 space-y-8 py-10 max-w-7xl mx-auto">
      <div className="sm:flex justify-between space-y-2 sm:space-y-0 gap-8">
        <Link href={`/dashboard`} className={`flex gap-2 ${buttonVariants()}`}>
          <MoveLeft className="w-4 h-4" /> Course List
        </Link>

        <div className="flex gap-2">
          <div>
            <PublishCourse published={data.published} course={course} />
          </div>

          <Link
            href={`/dashboard/course/${course}/edit`}
            className={`flex gap-2 ${buttonVariants()}`}
          >
            <EditIcon className="w-5 h-5" /> Edit
          </Link>
          <Link
            href={`/course/${course}`}
            className={`flex gap-2 ${buttonVariants()}`}
          >
            <Eye className="w-5 h-5" /> View
          </Link>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="space-y-4">
          <h1 className="font-bold text-2xl">{data.title}</h1>
          {/* <div>
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
          </div> */}
          <div className="sm:flex space-y-2 sm:space-y-0 gap-2">
            <div className="border dark:bg-neutral-900 bg-muted dark:text-white rounded-md px-2 py-1">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              }).format(parseFloat(data.price) / 100)}
            </div>
            <div className="border dark:bg-neutral-900 bg-muted dark:text-white rounded-md px-2 py-1">
              {data.Lesson.length} Lessons
            </div>

            <div className="flex gap-2">
              <div className="border dark:bg-neutral-900 bg-muted dark:text-white rounded-md px-2 py-1">
                {data.users.length} User/s Enrolled
              </div>
              <Link
                href={`/dashboard/course/${course}/enrollees`}
                className={`flex gap-2 my-auto border px-2 py-1`}
              >
                View All <MoveRight className="w-4 h-4 my-auto" />
              </Link>
            </div>
          </div>
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
            <p className="text-sm text-black">
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
