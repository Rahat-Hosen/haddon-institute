import AnimatedText from "@/components/animated-text";
import AttendEventForm from "@/components/events/attend-event-form";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function EventPage({ params }: any) {
  const slug = params.slug;

  const event = await prisma.events.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    redirect("/not-found");
  }

  return (
    <div className="space-y-8 px-4 my-20">
      <AnimatedText
        text={event.title}
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <div className="max-w-2xl mx-auto space-y-8">
        <p>{event.description}</p>
        <AttendEventForm id={event.id} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full sm:max-w-full">
          <Image
            src="/400432987_122110604636094160_4219764007611338982_n.jpg"
            width={750}
            height={750}
            alt="Informational Evening"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full sm:max-w-full">
          <Image
            src="/400539316_122110604618094160_7120956564591306414_n.jpg"
            width={750}
            height={750}
            alt="Informational Evening"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
