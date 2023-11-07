import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | Haddon Institute",
  description: "Learn about who Haddon have teamed up with.",
};

export default function Partners() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Partners"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <p className="text-center">Page is currently under construction.</p>
    </div>
  );
}
