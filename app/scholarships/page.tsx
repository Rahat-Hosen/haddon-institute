import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholarships | Haddon Institute",
  description: "Learn about the scholarships Haddon offers.",
};

export default function Scholarships() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Scholarships"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
