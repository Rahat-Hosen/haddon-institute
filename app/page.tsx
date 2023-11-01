import AnimatedText from "@/components/animated-text";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 xl:px-24">
      <div className="md:flex my-auto">
        <div className="md:w-1/2">
          <Image
            src="/logos/3.png"
            width={750}
            height={750}
            alt="Haddon Institute Logo"
          />
        </div>
        <div className="md:w-1/2 my-auto space-y-6">
          <Link
            href="/course/theology-for-today-s-world"
            className="flex text-sm text-muted-foreground hover:text-black dark:hover:text-white transition"
          >
            <div className="rounded-l-full px-4 py-2 bg-muted">
              Check out our first course!
            </div>
            <div className="rounded-r-full border-l px-4 py-2 bg-muted font-semibold">
              Explore
            </div>
          </Link>

          <div>
            <AnimatedText
              text="Haddon Institute"
              className="text-3xl lg:text-4xl xl:text-6xl tracking-tighter font-bold"
            />
            <p className="font-semibold text-2xl">
              It&apos;s time to take Christian education seriously.
            </p>
          </div>
          <div>
            <Link href="/sign-up" className={`flex gap-2 ${buttonVariants()}`}>
              Join Now
            </Link>
          </div>
          <div space-y-6>
            <div>
              <h2 className="font-semibold text-2xl">Our Partners</h2>
            </div>
            <div className="flex gap-12 bg-[#0a0a0a] rounded-2xl p-4">
              <div>
                <Image
                  src="/logos/61-oaks-group-logo-white.png"
                  width={140}
                  height={140}
                  alt="61 Oaks Group Logo"
                />
              </div>
              <div className="my-auto">
                <Image
                  src="/logos/the-armoury-bookshop-logo-white.png"
                  width={75}
                  height={75}
                  alt="The Armoury Bookshop Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="space-y-4 rounded-2xl p-12 bg-muted shadow-2xl">
          <Book className="rounded-full mx-auto bg-muted-foreground p-8" />
          <h2 className="text-center font-semibold text-xl">Feature 1</h2>
          <p className="text-center text-muted-foreground">
            Feature description...
          </p>
        </div>
        <div className="space-y-4 rounded-2xl p-12 bg-muted shadow-2xl">
          <Book className="rounded-full mx-auto bg-muted-foreground p-8" />
          <h2 className="text-center font-semibold text-xl">Feature 1</h2>
          <p className="text-center text-muted-foreground">
            Feature description...
          </p>
        </div>
        <div className="space-y-4 rounded-2xl p-12 bg-muted shadow-2xl">
          <Book className="rounded-full mx-auto bg-muted-foreground p-8" />
          <h2 className="text-center font-semibold text-xl">Feature 1</h2>
          <p className="text-center text-muted-foreground">
            Feature description...
          </p>
        </div>
        <div className="space-y-4 rounded-2xl p-12 bg-muted shadow-2xl">
          <Book className="rounded-full mx-auto bg-muted-foreground p-8" />
          <h2 className="text-center font-semibold text-xl">Feature 1</h2>
          <p className="text-center text-muted-foreground">
            Feature description...
          </p>
        </div>
      </div>
    </main>
  );
}
