import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Haddon Institute",
  description: "Understand how Haddon uses your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="space-y-8 px-24 my-20">
      <AnimatedText
        text="Privacy Policy"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
    </div>
  );
}
