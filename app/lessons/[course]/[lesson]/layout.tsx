import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const course = params.course; // this is grabbing the param set by [course], we don't need the [lesson] param in this case

  const lessons = await prisma.lesson.findMany({
    where: {
      course: {
        slug: course,
      },
    },
  });

  const sidebarNavItems = lessons.map((lesson) => {
    return {
      title: lesson.title,
      href: `/lessons/${course}/${lesson.slug}`,
    };
  });

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 px-24">
      <aside className="-mx-4 lg:w-1/5 space-y-4">
        <Link
          href={`/lessons/${course}`}
          className={`flex gap-2 w-full ${buttonVariants()}`}
        >
          <ArrowLeft /> Course Overview
        </Link>
        <SidebarNav items={sidebarNavItems} />
      </aside>
      {children}
    </div>
  );
}
