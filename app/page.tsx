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
          className="object-cover h-[60vh] rounded-2xl w-full brightness-50 border-b"
        />
        <div
          className="absolute place-items-center inset-0 flex justify-center
        
        "
        >
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
                className="flex text-sm text-muted-foreground hover:text-black dark:hover:text-white transition"
              >
                <div className="rounded-l-md px-4 py-2 bg-muted flex gap-4">
                  <Badge>NEW</Badge> Theology for Today&apos;s World
                </div>
                <div className="rounded-r-md border-l px-4 py-2 bg-muted font-semibold">
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
                <p className="text-muted-foreground max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima alias fuga et ab magnam aliquam commodi ratione vel
                  fugit nesciunt voluptatibus.
                </p>
              </div>
              <div>
                <Link
                  href="/sign-up"
                  className={`flex gap-2 ${buttonVariants()}`}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="my-20">
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
                <div className="flex justify-center my-10">
                  <Button className="flex gap-2" variant="outline">
                    Our Vision <MoveRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="space-y-4 rounded-2xl p-12 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <BookOpen
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Feature 1</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                alias fuga et ab magnam aliquam commodi ratione vel fugit
                nesciunt voluptatibus.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl p-12 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <Globe2
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Feature 1</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                alias fuga et ab magnam aliquam commodi ratione vel fugit
                nesciunt voluptatibus.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl p-12 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <GraduationCap
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Feature 1</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                alias fuga et ab magnam aliquam commodi ratione vel fugit
                nesciunt voluptatibus.
              </p>
            </div>
            <div className="space-y-4 rounded-2xl p-12 hover:bg-muted hover:shadow-2xl transition-all duration-300">
              <Stars
                strokeWidth={1}
                width={40}
                height={40}
                className="text-muted-foreground"
              />
              <h2 className="font-semibold text-xl">Feature 1</h2>
              <p className="text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                alias fuga et ab magnam aliquam commodi ratione vel fugit
                nesciunt voluptatibus.
              </p>
            </div>
          </div>
          <div className="flex justify-center my-10">
            <Button className="flex gap-2" variant="outline">
              Our Goals <MoveRight />
            </Button>
          </div>
        </div>
        <div className="px-4 xl:px-24">
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
          <div className="flex justify-center my-10">
            <Button className="flex gap-2" variant="outline">
              Our Oaks <MoveRight />
            </Button>
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
        <div className="px-4 xl:px-24 my-20">
          <div className="space-y-4">
            <Separator className="max-w-sm mx-auto bg-gradient-to-r dark:from-muted-foreground from-30% dark:to-muted" />
            <h2 className="text-center text-muted-foreground uppercase font-semibold tracking-wider text-xl text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-muted-foreground from-40% dark:to-muted">
              Building Legacy & empowering leaders
            </h2>
            <Separator className="max-w-sm mx-auto bg-gradient-to-l dark:from-muted-foreground from-30% dark:to-muted" />
          </div>
          <div className="flex justify-center">
            <div className="space-y-20">
              <div className="lg:flex gap-8 justify-between max-w-[90rem] space-y-8 lg:space-y-0">
                <div className="space-y-4 my-auto">
                  <h3 className="font-semibold text-4xl xl:text-6xl ">
                    Heading Title Goes Here
                  </h3>
                  <ul className="space-y-4 text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                  </ul>
                </div>
                <Image
                  src="/priscilla-du-preez-ANJS-bw1Sgo-unsplash.jpg"
                  height={500}
                  width={500}
                  alt="Image"
                  className="rounded-2xl hover:shadow-2xl transition-all duration-300 h-250 lg:h-500"
                />
              </div>
              <div className="lg:flex gap-8 justify-between max-w-[90rem] space-y-8 lg:space-y-0">
                <Image
                  src="/sixteen-miles-out-KSaLhgex8F0-unsplash.jpg"
                  height={500}
                  width={500}
                  alt="Image"
                  className="rounded-2xl hover:shadow-2xl transition-all duration-300 h-250 lg:h-500"
                />
                <div className="space-y-4 my-auto">
                  <h3 className="font-semibold text-4xl xl:text-6xl">
                    Heading Title Goes Here
                  </h3>
                  <ul className="space-y-4 text-black dark:text-transparent bg-clip-text bg-gradient-to-bl dark:from-muted-foreground from-40% dark:to-muted ">
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>{" "}
                    <li className="flex gap-4 xl:text-2xl">
                      <CheckCircle className="w-4 h-4 xl:w-6 xl:h-6 text-green-500 my-auto" />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-10">
            <Button className="flex gap-2" variant="outline">
              Learn More <MoveRight />
            </Button>
          </div>
        </div>
        <Separator className="my-10" />
        <div className="pb-20 pt-10 px-4 xl:px-24 flex">
          <div className="w-1/5">
            <h1 className="font-semibold text-2xl">Trusted by</h1>
          </div>
          <div className="w-4/5">
            <div>hrbc</div>
            <div>hrbc gold coast</div>
            <div>Ascension Church</div>
            <div>others</div>
          </div>
        </div>
        <Newsletter />
      </div>
    </main>
  );
}
