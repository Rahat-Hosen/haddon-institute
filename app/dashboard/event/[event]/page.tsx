import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AnimatedText from "@/components/animated-text";

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
    include: {
      EventSignup: true,
    },
  });

  if (!data) {
    redirect("/not-found");
  }

  const signups = data.EventSignup; // Get the array of sign-ups

  return (
    <div className="px-24 space-y-8 mb-10">
      <Link href={`/dashboard`} className={`flex gap-2 ${buttonVariants()}`}>
        <MoveLeft className="w-4 h-4" /> Event List
      </Link>
      <AnimatedText
        text={data.title}
        className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />

      <div>
        <h2 className="font-semibold text-lg">
          Attendee Count: {signups.length}
        </h2>
        <DataTable columns={columns} data={signups} />
      </div>
    </div>
  );
}
