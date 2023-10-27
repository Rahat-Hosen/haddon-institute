import prisma from "@/lib/prisma";
import { BadgePlus, GraduationCap, Heart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Courses() {
  const courses = await prisma.course.findMany({
    include: {
      users: true,
    },
  });

  return (
    <div className="space-y-8 px-24">
      <h1 className="text-6xl text-center">Our Courses</h1>

      {/* Our top-tier courses, vetted and designed from the ground up */}
      <h2 className="text-4xl text-muted-foreground flex gap-2">
        Capstone Courses <GraduationCap className="w-8 h-8 my-auto" />
      </h2>
      <div className="space-y-8">
        {/* only display capstone course */}
        {courses
          .filter((course) => course.capstone)
          .map((course) => (
            <div key={course.id} className="relative w-full h-[500px]">
              <Link href={`/course/${course.slug}`}>
                <div className="absolute inset-0 rounded-[48px]">
                  <Image
                    src={course.thumbnail || "/haddon-institute-logo.jpeg"}
                    alt={course.title}
                    fill
                    className="rounded-2xl brightness-75 shadow-2xl w-full object-cover"
                  />
                </div>
                <div className="absolute z-10 space-y-4 bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12">
                  <Heart className="w-10 h-10" />
                  <h1 className="text-2xl md:text-4xl lg:text-[3rem] tracking-tighter font-semibold leading-none">
                    {course.title}
                  </h1>
                  <p className="text-sm md:text-base">{course.description}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>

      {/* Top 10 most purchased */}
      <h2 className="text-4xl text-muted-foreground flex gap-2">
        Trending <Zap className="w-8 h-8 my-auto" />
      </h2>
      {courses
        .sort((a, b) => b.users.length - a.users.length)
        .slice(0, 10)
        .map((course) => (
          <div key={course.id} className="relative w-full h-[500px]">
            <Link href={`/course/${course.slug}`}>
              <div className="absolute inset-0 rounded-[48px]">
                <Image
                  src={course.thumbnail || "/haddon-institute-logo.jpeg"}
                  alt={course.title}
                  fill
                  className="rounded-2xl brightness-75 shadow-2xl w-full object-cover"
                />
              </div>
              <div className="absolute z-10 space-y-4 bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12">
                <Heart className="w-10 h-10" />
                <h1 className="text-2xl md:text-4xl lg:text-[3rem] tracking-tighter font-semibold leading-none">
                  {course.title}
                </h1>
                <p className="text-sm md:text-base">{course.description}</p>
              </div>
            </Link>
          </div>
        ))}

      {/* 10 Latest Courses */}
      <h2 className="text-4xl text-muted-foreground flex gap-2">
        New Additions <BadgePlus className="w-8 h-8 my-auto" />
      </h2>
      {courses
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 10)
        .map((course) => (
          <div key={course.id} className="relative w-full h-[500px]">
            <Link href={`/course/${course.slug}`}>
              <div className="absolute inset-0 rounded-[48px]">
                <Image
                  src={course.thumbnail || "/haddon-institute-logo.jpeg"}
                  alt={course.title}
                  fill
                  className="rounded-2xl brightness-75 shadow-2xl w-full object-cover"
                />
              </div>
              <div className="absolute z-10 space-y-4 bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12">
                <Heart className="w-10 h-10" />
                <h1 className="text-2xl md:text-4xl lg:text-[3rem] tracking-tighter font-semibold leading-none">
                  {course.title}
                </h1>
                <p className="text-sm md:text-base">{course.description}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
