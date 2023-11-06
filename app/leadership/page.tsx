import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership | Haddon Institute",
  description: "Get to know our leadership team.",
};

export default function Leadership() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Leadership"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
