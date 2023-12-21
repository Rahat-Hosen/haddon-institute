import AnimatedText from "@/components/animated-text";
import { Globe2, GraduationCap, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Heritage | Haddon Institute",
  description: "Learn more about Haddon's reformed beliefs.",
};

export default function OurHeritage() {
  return (
    <div className="space-y-12 my-20">
      <div className="px-4 space-y-8">
        <AnimatedText
          text="Our Heritage"
          className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
        />
        <p className="text-center text-black text-lg max-w-3xl mx-auto">
          Haddon Institute is confessional in it’s academic and lived
          convictions. We hold heritage hostage by the durability of the Second
          London Baptist Confession of Faith (1689) as a faithful summary of
          important biblical teachings & frameworks.
        </p>
      </div>
      <div className="relative">
        <Image
          src="/kate-mclean-9Q6NzzGX3Ls-unsplash.jpg"
          height={2000}
          width={2000}
          quality={100}
          priority
          alt="Ocean Header Image"
          className="h-[600px] object-cover w-full brightness-75"
        />
        <div className="absolute place-items-center inset-0 flex justify-center px-4">
          <p className="text-2xl font-bold tracking-tight text-white">
            Historical convictions for contemporary challenges.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 max-w-7xl mx-auto">
        <div className="space-y-4 rounded-2xl p-8 hover:bg-neutral-200 hover:shadow-2xl transition-all duration-300">
          <ScrollText
            strokeWidth={1}
            width={40}
            height={40}
            className="text-black"
          />
          <h2 className="font-semibold text-xl">Confessional</h2>
          <p className="text-black">
            Haddon Institute is confessional in it’s academic and lived
            convictions. We hold heritage hostage by the durability of the
            Second London Baptist Confession of Faith (1689) as a faithful
            summary of important biblical teachings & frameworks.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl p-8 hover:bg-neutral-200 hover:shadow-2xl transition-all duration-300">
          <Globe2
            strokeWidth={1}
            width={40}
            height={40}
            className="text-black"
          />
          <h2 className="font-semibold text-xl">Gospel Impact</h2>
          <p className="text-black">
            At Haddon we are about strategic mobilisation for greater gospel
            impact by developing men and women who exhibit wisdom, virtue, and a
            deep understanding of their Christian faith, preparing them to make
            a redemptive impact on the world for the glory of God through their
            local church, in vocation and in family life.
          </p>
        </div>
      </div>
    </div>
  );
}
