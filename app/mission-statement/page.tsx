import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission Statement | Haddon Institute",
  description: "Learn more about Haddon's mission, vision and values.",
};

export default function MissionStatement() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Mission Statement"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
