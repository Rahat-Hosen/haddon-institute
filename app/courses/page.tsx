import AnimatedText from "@/components/animated-text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { EyeIcon, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Courses | Haddon Institute",
  description: "View our catalogue of courses.",
};

export default async function Courses() {
  const courses = await prisma.course.findMany({
    where: {
      published: true,
    },
    include: {
      users: true,
    },
  });

  return (
    <div className="space-y-8 px-4 my-10 xl:px-24 xl:my-20 max-w-7xl mx-auto">
      <AnimatedText
        text="Our Courses"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl flex gap-4 font-semibold">
            Capstone Courses <GraduationCap className="w-8 h-8 my-auto" />
          </h2>
          <p className="text-muted-foreground">
            Our capstone courses are our most comprehensive courses and allow
            students to demonstrate their acquired knowledge.
          </p>
        </div>

        <Separator />
      </div>

      {courses
        .filter((course) => course.capstone)
        .map((course) => (
          <div key={course.id} className="relative w-full h-[300px]">
            <Link href={`/course/${course.slug}`}>
              <Badge className="absolute top-8 left-8 z-10">
                {course.code}
              </Badge>
              <Badge className="absolute top-8 right-8 z-10">
                {new Date(course.startDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(course.endDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Badge>
              <div className="absolute inset-0 rounded-[48px]">
                <Image
                  src={course.thumbnail || "/logos/haddon-institute-logo.jpeg"}
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

      {/* <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl flex gap-4 font-semibold">
            Trending Courses <Zap className="w-7 h-7 my-auto" />
          </h2>
          <p className="text-muted-foreground">
            Our 10 most purchased courses.
          </p>
        </div>

        <Separator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {courses
          .sort((a, b) => b.users.length - a.users.length)
          .slice(0, 10)
          .map((course) => (
            <div
              key={course.id}
              className="relative w-full h-[400px] transform scale-100 hover:scale-95 transition-transform duration-300 ease-in-out"
            >
              <Link href={`/course/${course.slug}`}>
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
                <div className="absolute z-10 space-y-1 bottom-4 left-4 right-4">
                  <h1 className="text-lg tracking-tighter font-semibold leading-none text-white">
                    {course.title}
                  </h1>
                  <p className="text-sm text-gray-200">by {course.lecturer}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl flex gap-4 font-semibold">
            Latest Additions <BadgePlus className="w-7 h-7 my-auto" />
          </h2>
          <p className="text-muted-foreground">
            Our most recently added courses.
          </p>
        </div>

        <Separator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {courses
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 10)
          .map((course) => (
            <div
              key={course.id}
              className="relative w-full h-[150px] transform scale-100 hover:scale-95 transition-transform duration-300 ease-in-out"
            >
              <Link href={`/course/${course.slug}`}>
                <div className="absolute inset-0 rounded-[48px]">
                  <Image
                    src={
                      course.thumbnail || "/logos/haddon-institute-logo.jpeg"
                    }
                    alt={course.title}
                    fill
                    className="rounded-md brightness-50 shadow-2xl w-full object-cover"
                  />
                </div>
                <div className="absolute z-10 space-y-1 bottom-4 left-4 right-4">
                  <h1 className="text-lg tracking-tighter font-semibold leading-none text-white">
                    {course.title}
                  </h1>
                  <p className="text-sm text-gray-200">by {course.lecturer}</p>
                </div>
              </Link>
            </div>
          ))}
      </div> */}
    </div>
  );
}

// EACH CATEGORY SHOULD BE DISPLAYED BELOW THE ABOVE WITH RELEVANT COURSES
