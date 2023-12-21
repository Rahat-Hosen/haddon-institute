import AnimatedText from "@/components/animated-text";
import AttendEventForm from "@/components/events/attend-event-form";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { FileText, MapPin, MoveLeft, MoveRight } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function retrieveEvent(slug: string) {
  const data = await prisma.events.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!data) {
    redirect("/not-found");
  }

  return data;
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  if (!slug) {
    redirect("/not-found");
  }

  const event = await retrieveEvent(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${event.title} | Haddon Institute`,
    description: event.description,
    openGraph: {
      images: ["/logos/5.jpeg", ...previousImages],
    },
  };
}

export default async function EventPage({ params }: any) {
  const slug = params.slug;

  if (!slug) {
    redirect("/not-found");
  }

  const event = await retrieveEvent(slug);

  return (
    <div className="space-y-8 px-4 my-20">
      <AnimatedText
        text={event.title}
        className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex gap-2">
            <FileText className="w-5 h-5 my-auto" />
            Overview
          </h3>
          <p>
            Join us on Monday the 20th of November to learn more about our very
            first course - Theology for Today&apos;s World.
          </p>
          <p>
            This 6-week course aims to provide students with a comprehensive
            overview of the theology of the Christian worldview, and its
            relevance in today&apos;s world. This 6-week course is delivered
            fully in-person in a lecture format, with the sixth lecture
            incorporating an interactive Q&A session.
          </p>
          <p>
            From 6:45pm join us in person at the Garden City Library to meet our
            course staff, enjoy light refreshments and learn what&apos;s on
            offer in this course.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex gap-2 mb-2">
            <MapPin className="w-5 h-5 my-auto" />
            Location
          </h3>
          <a
            href="https://maps.app.goo.gl/GofDmFbEyQ8ibCHm6"
            target="_blank"
            className="hover:text-black underline hover:no-underline"
          >
            Garden City Library - Level R4, Corner Logan and Kessels Road, Upper
            Mount Gravatt QLD 4122 (access via top-level yellow carpark).
          </a>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="font-bold text-2xl">Attend Event</h2>

          <AttendEventForm id={event.id} />
        </div>
        <div className="flex justify-between gap-4">
          <Link
            href="/events"
            className={`flex gap-2 my-4 ${buttonVariants()}`}
          >
            <MoveLeft /> Events
          </Link>
          <Link
            href="/course/theology-for-today-s-world"
            className={`flex gap-2 my-4 ${buttonVariants()}`}
          >
            View Course
            <MoveRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full sm:max-w-full">
          <Image
            src="/400432987_122110604636094160_4219764007611338982_n.jpg"
            width={750}
            height={750}
            alt="Info Night"
            className="w-full h-auto rounded-2xl"
          />
        </div>
        <div className="w-full sm:max-w-full">
          <Image
            src="/400539316_122110604618094160_7120956564591306414_n.jpg"
            width={750}
            height={750}
            alt="Info Night"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
