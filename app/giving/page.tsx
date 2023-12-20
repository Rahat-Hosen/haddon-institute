import AnimatedText from "@/components/animated-text";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Giving | Haddon Institute",
  description: "Learn how you can support the Haddon Institute.",
};

export default function Giving() {
  return (
    <div className="space-y-8  my-20">
      <AnimatedText
        text="Giving"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto px-4">
        Haddon Institute is a registered charity with the ACNC; as such we
        depend on the generosity of people who believe in the mission of
        organisation. If you would like to donate please find our bank details
        below.
      </p>
      <a href="https://donate.stripe.com/3csaH8c700zL49y145">
        <Button className="w-full px-4 max-w-3xl mx-auto flex justify-center mt-8">
          Donate Now
        </Button>
      </a>
      <div className="relative">
        <Image
          src="/jesse-collins-kfqZbKHV8dQ-unsplash.jpg"
          height={2000}
          width={2000}
          quality={100}
          priority
          alt="Brisbane Header Image"
          className="h-[600px] object-cover w-full brightness-75"
        />
        <div className="absolute place-items-center inset-0 flex justify-center px-4">
          <p className="text-2xl font-bold tracking-tight text-white">
            Your generosity helps us to train and equip the next generation of
            Christian leaders.
          </p>
        </div>
      </div>
    </div>
  );
}
