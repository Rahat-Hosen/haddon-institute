import AnimatedText from "@/components/animated-text";
import { CardHover } from "@/components/card-hover";
import { CustomBadge } from "@/components/custom-badge";
import Informational from "@/components/informational";
import Newsletter from "@/components/newsletter";
import Player from "@/components/player";
import { HeroScroll } from "@/components/scroll-up-in";
import { TextGenerateEffect } from "@/components/text-generate";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
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
      <div className="relative lg:mb-[650px] md:mb-[500px] sm:mb-[350px] mb-[250px]">
        <Image
          src="/henry-be-lc7xcWebECc-unsplash.jpg"
          height={2000}
          width={2000}
          alt="Background Image"
          className="object-cover h-[80vh] w-full brightness-50 border border-b-2"
        />

        <div className="absolute place-items-center inset-0 flex justify-center">
          <div className="md:flex px-4 max-w-7xl mx-auto">
            <div className="hidden md:flex md:w-1/2 my-auto">
              <Image
                src="/logos/3.png"
                width={750}
                height={750}
                alt="Haddon Institute Logo"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="md:w-1/2 my-auto space-y-6">
              <Link href="/course/theology-for-today-s-world">
                <CustomBadge text="Theology for Today's World" />
              </Link>

              <div>
                <AnimatedText
                  text="Haddon Institute"
                  className="text-3xl lg:text-4xl xl:text-6xl tracking-tighter font-bold text-white"
                />
                <div className="text-stone-300 max-w-lg font-semibold">
                  <TextGenerateEffect
                    words="Our mission at the Haddon institute is to provide a
                  Christ-centered education grounded in the Reformed tradition."
                  />
                </div>
              </div>
              <div>
                <Link
                  href="/sign-up"
                  className={`flex gap-2 ${buttonVariants({
                    size: "lg",
                    variant: "secondary",
                  })}`}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full flex items-center justify-center -mt-20 lg:px-8 px-4">
          <div className="hidden lg:flex w-full h-full">
            <HeroScroll />
          </div>
          <div className="lg:hidden flex w-full h-full">
            <Player playbackId="5ta2qsCFRlUy01ruxgcfAP6009UlUQVXUj3MOcosx00wjQ" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-4 my-10">
          <h2 className="text-center uppercase font-semibold text-xl text-black dark:text-transparent bg-clip-text bg-gradient-to-t dark:from-muted-foreground from-50% dark:to-muted">
            Theology for Today&apos;s World
          </h2>
          <Separator className="max-w-sm mx-auto bg-gradient-to-l dark:from-muted-foreground from-30% dark:to-muted" />
        </div>

        <h3 className="text-center font-semibold text-lg my-4">
          Course starting 4th of December 2023
        </h3>
        <div className="space-y-2">
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            This 6-week course aims to provide students with a comprehensive
            overview of the theology of the Christian worldview, and its
            relevance in today&apos;s world.
          </p>
        </div>

        <div className="flex justify-center mt-20 gap-4">
          <Link
            href="/course/theology-for-today-s-world"
            className={`flex gap-2 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Learn More <MoveRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20">
        <div className="my-10 px-4">
          <div className="flex justify-center">
            <div className="space-y-20">
              <div>
                <Informational />
                <div className="flex justify-center mt-20">
                  <Link
                    href="/mission-statement"
                    className={`flex gap-2 ${buttonVariants({
                      variant: "outline",
                    })}`}
                  >
                    Our Vision <MoveRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-20">
          <CardHover />
        </div>

        <div className="px-4">
          <div className="mx-auto text-center my-20 py-28 px-4 bg-gradient-to-br from-[#11271f] from-50% to-black rounded-2xl">
            <div className="text-2xl italic font-semibold md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-white md:from-40% md:dark:to-muted md:to-100%">
              <TextGenerateEffect
                words='"Wisdom gives strength to the wise man more than ten rulers
              who are in a city."'
              />
            </div>
            <div className="flex justify-center items-center mt-6 space-x-3">
              <div className="flex items-center text-white">
                <cite>— Ecclesiastes 7:19 ESV</cite>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 xl:px-24 my-20">
          <div className="flex justify-center gap-8 md:gap-20 rounded-2xl p-4">
            <a
              href="https://61oaksgroup.com.au"
              target="_blank"
              className="my-auto"
            >
              <Image
                src="/logos/61-oaks-group-logo-white.png"
                width={140}
                height={140}
                alt="61 Oaks Group Logo"
                className="hidden dark:flex my-auto"
              />

              <Image
                src="/logos/61-oaks-group-logo.png"
                width={140}
                height={140}
                alt="61 Oaks Group Logo"
                className="dark:hidden flex my-auto"
              />
            </a>
            <a
              href="https://thearmourybookshop.com.au"
              target="_blank"
              className="my-auto"
            >
              <Image
                src="/logos/the-armoury-bookshop-logo-white.png"
                width={75}
                height={75}
                alt="The Armoury Bookshop Logo"
                className="hidden dark:flex my-auto"
              />

              <Image
                src="/logos/the-armoury-bookshop-logo.png"
                width={75}
                height={75}
                alt="The Armoury Bookshop Logo"
                className="dark:hidden flex my-auto"
              />
            </a>
            <a
              href="https://starcompass.com.au"
              target="_blank"
              className="my-auto"
            >
              <Image
                src="/logos/star-compass.png"
                width={80}
                height={80}
                alt="Star Compass Logo"
                className="grayscale invert hidden dark:flex my-auto"
              />

              <Image
                src="/logos/star-compass.png"
                width={80}
                height={80}
                alt="Star Compass Logo"
                className="dark:hidden flex my-auto"
              />
            </a>
            <a
              href="https://lbnuconsulting.com.au"
              target="_blank"
              className="my-auto"
            >
              <Image
                src="/logos/lbnu-consulting.png"
                width={80}
                height={80}
                alt="LBNU Consulting Logo"
                className="rounded-md hidden dark:flex my-auto"
              />

              <Image
                src="/logos/lbnu-consulting.png"
                width={80}
                height={80}
                alt="LBNU Consulting Logo"
                className="rounded-md dark:hidden flex my-auto"
              />
            </a>
          </div>
          <div className="flex justify-center mt-20">
            <Link
              href="/partners"
              className={`flex gap-2 ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Our Oaks <MoveRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* <div className="px-4 md:flex md:justify-between my-20 space-y-6 md:space-y-0">
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
        </div> */}

        <Newsletter />
      </div>
    </main>
  );
}
