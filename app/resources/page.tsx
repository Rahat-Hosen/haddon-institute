import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Haddon Institute",
  description:
    "Access Haddon's wide array of blogs posts, articles and studies.",
};

export default function Resources() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Resources"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
