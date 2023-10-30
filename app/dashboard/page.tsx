import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {
  const user = await currentUser();

  const data = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      courses: true,
    },
  });

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-2xl font-medium">My Courses</h3>
        <p className="text-sm text-muted-foreground">
          View your purchased courses and their progress.
        </p>
      </div>
      <Separator />
      <div>
        <div className="mx-auto grid grid-cols-2 gap-4">
          {data?.courses.map((course) => (
            <div key={course.id} className="relative h-[200px]">
              <Link href={`/lessons/${course.slug}`}>
                <div className="absolute inset-0 rounded-[48px] ">
                  <Image
                    src={course.thumbnail || "/haddon-institute-logo.jpeg"}
                    alt={course.title}
                    fill
                    className="rounded-2xl brightness-75 shadow-2xl object-cover"
                  />
                </div>
                <div className="absolute z-10 space-y-2 bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                  <h2 className="text-2xl font-bold">{course.title}</h2>
                  <p>{course.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
