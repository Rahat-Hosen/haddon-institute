import AnimatedText from "@/components/animated-text";
import { Globe2, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Mission Statement | Haddon Institute",
  description: "Learn more about Haddon's mission, vision and values.",
};

export default function MissionStatement() {
  return (
    <div className="space-y-12 my-20">
      <div className="px-4 space-y-8">
        <AnimatedText
          text="Mission Statement and Vision"
          className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
        />
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto">
          Our vision is to see the Australian Church fear and behold the majesty
          of the Lord Jesus Christ; in all of His offices, through all of His
          means, to the end of His Glory from generation to generation.
        </p>
      </div>
      <div className="relative">
        <Image
          src="/christoffer-engstrom-wc9avd2RaN0-unsplash.jpg"
          height={2000}
          width={2000}
          alt="Ocean Header Image"
          className="h-[600px] object-cover w-full brightness-75"
        />
        <div className="absolute place-items-center inset-0 flex justify-center px-4">
          <p className="text-2xl font-bold tracking-tight text-white">
            Christ-centered education grounded in Reformed theology.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 max-w-7xl mx-auto">
        <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
          <GraduationCap
            strokeWidth={1}
            width={40}
            height={40}
            className="text-muted-foreground"
          />
          <h2 className="font-semibold text-xl">Our Mission</h2>
          <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
            Our mission is to enlist, equip, and disciple God’s people by
            providing robust time-tested academic pathways for effective gospel
            mobilization; through the local church for fruitful vocation and
            family life.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
          <Globe2
            strokeWidth={1}
            width={40}
            height={40}
            className="text-muted-foreground"
          />
          <h2 className="font-semibold text-xl">Gospel Impact</h2>
          <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
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
