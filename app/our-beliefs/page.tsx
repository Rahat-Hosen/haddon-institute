import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Beliefs | Haddon Institute",
  description: "Learn more about Haddon's beliefs and values.",
};

export default function OurBeliefs() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Our Beliefs"
        className="text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
