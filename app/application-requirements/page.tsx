import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Requirements | Haddon Institute",
  description: "What you need to know when applying to the Haddon Institute.",
};

export default function ApplicationRequirements() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Application Requirements"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
