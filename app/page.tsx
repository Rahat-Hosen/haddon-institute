import AnimatedText from "@/components/animated-text";
import Informational from "@/components/informational";
import Newsletter from "@/components/newsletter";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  CheckCircle,
  Globe2,
  GraduationCap,
  MoveRight,
  Stars,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Image
          src="/henry-be-lc7xcWebECc-unsplash.jpg"
          height={2000}
          width={2000}
          alt="Background Image"
          className="object-cover h-[60vh] w-full brightness-50 border border-b-2"
        />
        <div className="absolute place-items-center inset-0 flex justify-center">
          <div className="md:flex px-4 max-w-7xl mx-auto">
            <div className="hidden md:flex md:w-1/2 my-auto">
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
                className="flex text-sm text-muted-foreground text-stone-400 hover:text-white transition"
              >
                <div className="rounded-l-md px-4 py-2 flex gap-4 bg-[#171717]">
                  <Badge className="bg-white text-black">NEW</Badge> Theology
                  for Today&apos;s World
                </div>
                <div className="rounded-r-md border-l border-muted-foreground px-4 py-2 font-semibold bg-[#171717]">
                  Explore
                </div>
              </Link>

              <div>
                <AnimatedText
                  text="Haddon Institute"
                  className="text-3xl lg:text-4xl xl:text-6xl tracking-tighter font-bold text-white"
                />
                <p className="font-semibold text-2xl text-white">
                  It&apos;s time to take Christian education seriously.
                </p>
                <p className="text-stone-400 max-w-lg font-semibold">
                  Our mission at the Haddon institute is to provide a
                  Christ-centered education grounded in Reformed theology.
                </p>
              </div>
              <div>
                <Link
                  href="/sign-up"
                  className={`flex gap-2 ${buttonVariants({
                    size: "lg",
                  })}`}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="my-10 px-4">
          <div className="flex justify-center">
            <div className="space-y-20">
              <div className="space-y-4">
                <Separator className="max-w-sm mx-auto bg-gradient-to-r dark:from-muted-foreground from-30% dark:to-muted" />
                <h2 className="text-center text-muted-foreground uppercase font-semibold tracking-wider text-xl text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-muted-foreground from-40% dark:to-muted">
                  Beckoning the future & forging runways
                </h2>
                <Separator className="max-w-sm mx-auto bg-gradient-to-l dark:from-muted-foreground from-30% dark:to-muted" />
              </div>
              <div>
                <Informational />
                <div className="flex justify-center mt-20">
                  <Link
                    href="/mission-statement"
                    className={`flex gap-2 ${buttonVariants({
                      variant: "outline",
                    })}`}
                  >
                    Our Vision <MoveRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-4">
            <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <BookOpen
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Deeper Understanding</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Explore and gain profound insights into the Bible and the
                Christian faith with our in-depth courses.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <Globe2
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Online Access</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Access course content and valuable resources from any corner of
                the world through our online platform.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <GraduationCap
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Expository Teaching</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Benefit from a diverse range of instructors and educators who
                offer a comprehensive and engaging learning experience.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <Stars
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Accreditation</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Stay tuned for upcoming accreditation details, ensuring the
                quality and recognition of our programs in the near future.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-20">
            <Link
              href="/outcomes"
              className={`flex gap-2 ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Our Goals <MoveRight />
            </Link>
          </div>
        </div>
        <div className="px-4 xl:px-24 my-20">
          <div className="flex justify-center gap-12 rounded-2xl p-4">
            <div className="hidden dark:flex my-auto">
              <Image
                src="/logos/61-oaks-group-logo-white.png"
                width={140}
                height={140}
                alt="61 Oaks Group Logo"
              />
            </div>
            <div className="dark:hidden flex my-auto">
              <Image
                src="/logos/61-oaks-group-logo.png"
                width={140}
                height={140}
                alt="61 Oaks Group Logo"
              />
            </div>
            <div className="hidden dark:flex my-auto">
              <Image
                src="/logos/the-armoury-bookshop-logo-white.png"
                width={75}
                height={75}
                alt="The Armoury Bookshop Logo"
              />
            </div>
            <div className="dark:hidden flex my-auto">
              <Image
                src="/logos/the-armoury-bookshop-logo.png"
                width={75}
                height={75}
                alt="61 Oaks Group Logo"
              />
            </div>
          </div>
          <div className="flex justify-center mt-20">
            <Link
              href="/partners"
              className={`flex gap-2 ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Our Oaks <MoveRight />
            </Link>
          </div>
        </div>
        <div className="mx-auto text-center my-20 py-28 px-4 xl:px-24 bg-muted rounded-2xl">
          <p className="text-2xl italic font-semibold text-black dark:text-transparent bg-clip-text bg-gradient-to-r dark:from-white from-40% dark:to-muted to-100%">
            &quot;Wisdom gives strength to the wise man more than ten rulers who
            are in a city.&quot;
          </p>
          <div className="flex justify-center items-center mt-6 space-x-3">
            <div className="flex items-center">
              <cite>— Ecclesiastes 7:19 ESV</cite>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="px-4 md:flex md:justify-between my-20 space-y-6 md:space-y-0">
          <h1 className="font-semibold text-2xl my-auto">Trusted by</h1>

          <div className="md:flex gap-8 space-y-4 md:space-y-0">
            <Image
              src="/logos/hoperb.webp"
              width={100}
              height={100}
              alt="Hope Reformed Baptist Church"
              className="p-1 rounded-md bg-[#b92024] aspect-square"
            />
            <Image
              src="/logos/hope-church.webp"
              width={240}
              height={100}
              alt="Hope Reformed Baptist Church - Gold Coast"
              className="bg-muted-foreground p-1 rounded-md dark:bg-[#0a0a0a]"
            />
            <Image
              src="/logos/reformation.webp"
              width={100}
              height={100}
              alt="Reformation Baptist Church"
              className="rounded-md aspect-square"
            />
            <Image
              src="/logos/ascension-church.webp"
              width={140}
              height={100}
              alt="Ascension Church"
              className="rounded-md"
            />
          </div>
        </div>
        <Newsletter />
      </div>
    </main>
  );
}
