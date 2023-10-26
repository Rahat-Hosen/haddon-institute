import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Admin() {
  const ADMIN_IDS = process.env.ADMIN_IDS?.split(",");

  const { userId } = auth();

  if (userId && !ADMIN_IDS?.includes(userId)) {
    redirect("/unauthorised");
  }

  const courses = await prisma.course.findMany();

  const tableData = courses.map((course: any) => {
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      published: course.published,
    };
  });

  return (
    <div className="px-24">
      <div className="my-10">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">Courses</h2>
          <Link href="/admin/new-course" className={buttonVariants()}>
            New Course
          </Link>
        </div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
