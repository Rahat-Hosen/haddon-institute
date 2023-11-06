import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuition | Haddon Institute",
  description: "Understand the costs and fees associated with out courses.",
};

export default function Tuition() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Tuition"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
