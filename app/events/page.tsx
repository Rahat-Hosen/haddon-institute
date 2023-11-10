import AnimatedText from "@/components/animated-text";
import EventCalendar from "@/components/events/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { EyeIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | Haddon Institute",
  description: "Learn more about Haddon's upcoming events.",
};

export default async function Events() {
  const events = await prisma.events.findMany({
    where: {
      published: true,
    },
  });

  const timezone = "Australia/Brisbane";

  return (
    <div className="space-y-8 px-4 my-20 max-w-7xl mx-auto">
      <AnimatedText
        text="Events"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <p className="text-center">View our upcoming events and info nights!</p>

      {events.map((event) => (
        <div key={event.id} className="relative w-full h-[300px]">
          <Link href={`/event/${event.slug}`}>
            <Badge className="absolute top-8 right-8 z-10">
              {format(
                utcToZonedTime(new Date(event.date), timezone),
                "cccc MMMM d yyyy, h:mm bbb",
              )}
            </Badge>
            <div className="absolute inset-0 rounded-[48px]">
              <Image
                src={"/logos/5.jpeg"}
                alt={event.title}
                fill
                className="rounded-2xl brightness-50 shadow-2xl w-full object-cover"
              />
            </div>
            <div className="absolute z-10 space-y-12 bottom-8 left-8 right-8">
              <h1 className="text-2xl tracking-tighter font-semibold leading-none text-white">
                {event.title}
              </h1>
              <Button className="flex gap-2">
                <EyeIcon className="w-4 h-4" /> View Event
              </Button>
            </div>
          </Link>
        </div>
      ))}

      {/* <div className="max-w-7xl mx-auto rounded-2xl bg-muted p-8">
        <EventCalendar />
      </div> */}
    </div>
  );
}
