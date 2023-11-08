import AttendEventForm from "@/components/events/attend-event-form";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EventPage({ params }: any) {
  const slug = params;

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!course) {
    redirect("/not-found");
  }

  return (
    <div>
      <AttendEventForm />
    </div>
  );
}
