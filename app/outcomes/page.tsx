import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outcomes | Haddon Institute",
  description: "Learn more about what we hope you will get out of our courses.",
};

export default function Outcomes() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Outcomes"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
