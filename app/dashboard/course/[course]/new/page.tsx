import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewLesson({ params }: any) {
  const { slug } = params;

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

  return (
    <div>
      <Link href={`/dashboard/course/${slug}`} className={buttonVariants()}>
        Back to Course
      </Link>
    </div>
  );
}
