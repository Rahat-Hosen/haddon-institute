import AnimatedText from "@/components/animated-text";
import type { Metadata } from "next";
import Image from "next/image";
import { FaMoneyBill } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Giving | Haddon Institute",
  description: "Learn how you can support the Haddon Institute.",
};

export default function Giving() {
  return (
    <div className="space-y-8 px-4 my-20">
      <AnimatedText
        text="Giving"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto">
        Haddon Institute is a registered charity with the ACNC; as such we
        depend on the generosity of people who believe in the mission of
        organisation. If you would like to donate please find our bank details
        below.
      </p>
      <div className="relative">
        <Image
          src="/jesse-collins-kfqZbKHV8dQ-unsplash.jpg"
          height={2000}
          width={2000}
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
      <div className="grid grid-cols-1 gap-2 px-4 max-w-2xl mx-auto">
        <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
          <FaMoneyBill
            strokeWidth={1}
            width={40}
            height={40}
            className="text-muted-foreground"
          />
          <h2 className="font-semibold text-xl">Bank Details</h2>
          <p className="text-muted-foreground">
            <span className="font-semibold">NAB</span>
            <br />
            <span className="font-semibold">BSB:</span> 084-961
            <br />
            <span className="font-semibold">Account Number:</span> 719 221 664
          </p>
        </div>
      </div>
    </div>
  );
}
