import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import AnimatedText from "@/components/animated-text";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import NewEnrollee from "@/components/dashboard/new-enrollee";

export default async function Enrollees({ params }: any) {
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
    include: { users: true },
  });

  if (!data) {
    redirect("/not-found");
  }

  const tableData = data.users.map((user: any) => {
    return {
      enrollee: user.name,
      email: user.email,
    };
  });

  return (
    <div className="px-4 space-y-8 mb-10 max-w-7xl mx-auto">
      <AnimatedText
        text="Course Enrollees"
        className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <Link
        href={`/dashboard/course/${course}`}
        className={`flex gap-2 ${buttonVariants()}`}
      >
        <MoveLeft className="w-4 h-4" /> Back to Course
      </Link>
      <NewEnrollee courseId={data.id} course={course} />
      <DataTable columns={columns} data={tableData} />
    </div>
  );
}
