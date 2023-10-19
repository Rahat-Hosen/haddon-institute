import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center container">
      <div className="space-y-12 mx-auto">
        <div>
          <h1 className="font-bold text-[6rem] font-oswald text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#DFDFDF]">
            Haddon Institute
          </h1>
          <p className="text-center font-semibold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#DFDFDF]">
            It&apos;s time to take higher Christian education seriously.
          </p>
        </div>
        <p className="font-semibold font-inter max-w-5xl text-2xl text-center text-muted-foreground">
          Take your theological edification to the next level. Learn from sound
          scriptural minds. Grow in your understanding of the Bible. Become a
          better leader.
        </p>
        <div className="flex justify-center">
          <div className="space-y-2">
            <Button size="lg" className="font-inter uppercase font-semibold">
              Coming Soon
            </Button>
            <p className="text-center text-muted-foreground">
              Starting at $3.99/mo
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
