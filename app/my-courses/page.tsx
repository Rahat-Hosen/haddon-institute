import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EyeIcon, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-8 px-4 my-10 max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl flex gap-4 font-semibold">My Courses</h2>
          <p className="text-black">
            View your purchased courses and their progress.
          </p>
        </div>

        <Separator />
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
              <div key={course.id} className="relative w-full h-[300px]">
                <Link href={`/my-courses/${course.slug}`}>
                  <Badge className="absolute top-8 left-8 z-10">
                    {course.code}
                  </Badge>
                  <Badge className="absolute top-8 right-8 z-10">
                    {new Date(course.startDate).getFullYear()} -{" "}
                    {new Date(course.endDate).getFullYear()}
                  </Badge>
                  <div className="absolute inset-0 rounded-[48px]">
                    <Image
                      src={
                        course.thumbnail || "/logos/haddon-institute-logo.jpeg"
                      }
                      alt={course.title}
                      fill
                      className="rounded-2xl brightness-50 shadow-2xl w-full object-cover"
                    />
                  </div>
                  <div className="absolute z-10 space-y-4 bottom-8 left-8 right-8">
                    <h1 className="text-2xl tracking-tighter font-semibold leading-none text-white">
                      {course.title}
                    </h1>
                    <p className="text-gray-200">{course.description}</p>

                    <Button className="flex gap-2">
                      <EyeIcon className="w-4 h-4" /> View Course
                    </Button>
                  </div>
                  <Badge className="absolute bottom-8 right-8 z-10">
                    Taught by {course.lecturer}
                  </Badge>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
