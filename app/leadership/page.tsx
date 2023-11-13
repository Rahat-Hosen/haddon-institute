import AnimatedText from "@/components/animated-text";
import prisma from "@/lib/prisma";
import { Globe2, GraduationCap, Linkedin, Mail } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Leadership | Haddon Institute",
  description: "Get to know our leadership team.",
};

export default async function Leadership() {
  const people = await prisma.people.findMany();

  return (
    <div className="space-y-12 my-20">
      <div className="px-4 space-y-8">
        <AnimatedText
          text="Leadership"
          className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
        />
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto">
          Our mission at the Haddon institute is to provide a Christ-centered
          education grounded in the Reformed tradition.
        </p>
      </div>
      <div className="relative">
        <Image
          src="/kikki-starr-dmEIzFnuzLs-unsplash.jpg"
          height={2000}
          width={2000}
          alt="Ocean Header Image"
          className="h-[600px] object-cover w-full brightness-75"
        />
        <div className="absolute place-items-center inset-0 flex justify-center px-4">
          <p className="text-2xl font-bold tracking-tight text-white">
            The Haddon team are gospel-centered, Bible-guided, and
            Christ-focused.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 px-4 max-w-7xl mx-auto">
        {people.map((person) => (
          <Link
            key={person.id}
            href={`/person/${person.slug}`}
            className="flex flex-col justify-center items-center space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative w-64 h-64 rounded-md overflow-hidden">
              <Image
                src={person.image || "/logos/4.png"}
                alt={person.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-2xl font-bold tracking-tight">{person.name}</p>
              <p className="text-lg text-muted-foreground">{person.position}</p>
            </div>
            <div className="flex space-x-4">
              {person.x && (
                <a
                  href={person.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-muted-foreground transition-colors duration-300 hover:text-white"
                >
                  <FaXTwitter className="w-6 h-6" />
                </a>
              )}
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-muted-foreground transition-colors duration-300 hover:text-white"
                >
                  <Linkedin />
                </a>
              )}
              {person.website && (
                <a
                  href={person.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-muted-foreground transition-colors duration-300 hover:text-white"
                >
                  <Globe2 />
                </a>
              )}
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-muted-foreground transition-colors duration-300 hover:text-white"
                >
                  <Mail />
                </a>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
