import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ManageEvent({ params }: any) {
  const { userId } = auth();

  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  if (!isAdmin) {
    redirect("/unauthorised");
  }

  const { event } = params;

  if (!event) {
    redirect("/not-found");
  }

  const data = await prisma.events.findUnique({
    where: {
      slug: event,
    },
  });

  if (!data) {
    redirect("/not-found");
  }

  return (
    <div className="px-24 space-y-8 mb-10">
      <Link href={`/dashboard`} className={`flex gap-2 ${buttonVariants()}`}>
        <MoveLeft className="w-4 h-4" /> Event List
      </Link>
    </div>
  );
}
