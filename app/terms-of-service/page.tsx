import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Haddon Institute",
  description: "Understand the implicit terms of service when using Haddon.",
};

export default function TermsOfService() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Terms of Service"
        className="text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
