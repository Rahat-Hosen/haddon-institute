import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MoveRight } from "lucide-react";

export const metadata: Metadata = {
  title: "My Courses | Haddon Institute",
  description: "Access your purchased courses.",
};

export default async function MyCourses() {
  const user = await currentUser();

  const data = await prisma.user.findUnique({
    where: {
      email: user?.emailAddresses[0].emailAddress,
    },
    include: {
      courses: true,
    },
  });

  return (
    <div className="space-y-8 px-4 my-10 xl:px-24 xl:my-20">
      <div>
        <h3 className="text-2xl font-bold">My Courses</h3>
        <p className="text-sm text-muted-foreground">
          View your purchased courses and their progress.
        </p>
      </div>

      <div>
        {data?.courses.length === 0 ? (
          <div className="space-y-4">
            <p>
              You do not own any courses at this time. Please feel free to
              browse our available options.
            </p>
            <Link href="/courses" className={`flex gap-2 ${buttonVariants()}`}>
              Courses <MoveRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="mx-auto w-full">
            {data?.courses.map((course) => (
              <div key={course.id} className="relative h-[200px]">
                <Link href={`/my-courses/${course.slug}`}>
                  <div className="absolute inset-0 rounded-[48px] ">
                    <Image
                      src={
                        course.thumbnail || "/logos/haddon-institute-logo.jpeg"
                      }
                      alt={course.title}
                      fill
                      className="rounded-2xl brightness-50 shadow-2xl object-cover"
                    />
                  </div>
                  <div className="absolute z-10 space-y-2 bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                    <h2 className="text-2xl tracking-tighter font-semibold leading-none text-white">
                      {course.title}
                    </h2>
                    <p className="text-gray-200 hidden md:flex">
                      {course.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
