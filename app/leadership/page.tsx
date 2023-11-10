import AnimatedText from "@/components/animated-text";
import { Globe2, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Leadership | Haddon Institute",
  description: "Get to know our leadership team.",
};

export default function Leadership() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4"></div>
    </div>
  );
}
