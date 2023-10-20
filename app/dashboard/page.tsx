import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Dashboard() {
  const username = await currentUser();

  const user = await prisma.user.findUnique({
    where: {
      email: username?.emailAddresses[0].emailAddress,
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
          {user?.courses.map((course) => (
            <div key={course.id} className="space-y-2 border rounded-md p-8">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p>{course.description}</p>

              <Link href={`/lessons/${course.slug}`}>View Course</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
