import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Events | Haddon Institute",
  description: "Learn more about Haddon's upcoming events.",
};

export default function Events() {
  return (
    <div className="space-y-8 px-4 my-20">
      <AnimatedText
        text="Events"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
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
