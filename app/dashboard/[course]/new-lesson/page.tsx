import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewLesson({ params }: any) {
  const { course } = params;

  const { userId } = auth();

  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  return (
    <div>
      <Link href={`/dashboard/${course}`} className={buttonVariants()}>
        Back to Course
      </Link>
    </div>
  );
}
