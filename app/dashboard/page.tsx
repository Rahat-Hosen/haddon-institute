import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Haddon Institute",
  description: "Administrator Dashboard for Haddon Institute.",
};

export default async function Admin() {
  const { userId } = auth();

  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  const courses = await prisma.course.findMany();

  const tableData = courses.map((course: any) => {
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      published: course.published,
      capstone: course.capstone,
    };
  });

  return (
    <div className="px-24">
      <div className="my-10">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">Courses</h2>
          <Link href="/dashboard/new-course" className={buttonVariants()}>
            New Course
          </Link>
        </div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
