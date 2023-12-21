import {
  ArrowUpRight,
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const copyrightName = "Haddon Institute" || "Haddon Institute" || "";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <Separator className="my-10" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-10">
          <div>
            <Link href="/">
              <Image
                src="/logos/3.png"
                height={75}
                width={75}
                alt="Haddon Institute Logo"
              />
            </Link>
            <div className="space-y-1">
              <p className="text-sm">Mount Gravatt East</p>
              <p className="text-sm">QLD, Australia</p>
              <p className="text-sm">+61 468 557 200</p>
            </div>
          </div>
          <div className="grid grid-cols-1 text-sm">
            <Link
              href="/mission-statement"
              className="underline-offset-4  hover:underline"
            >
              Mission Statement
            </Link>
            <Link
              href="/our-heritage"
              className="underline-offset-4  hover:underline"
            >
              Our Heritage
            </Link>
            <Link
              href="/leadership"
              className="underline-offset-4  hover:underline"
            >
              Our Leadership
            </Link>
            <Link
              href="/partners"
              className="underline-offset-4  hover:underline"
            >
              Our Partners
            </Link>
            <Link
              href="/courses"
              className="underline-offset-4  hover:underline"
            >
              Courses
            </Link>
            <Link
              href="/research-journal"
              className="underline-offset-4  hover:underline"
            >
              Research Journal
            </Link>
          </div>
          <div className="grid grid-cols-1 text-sm">
            <Link
              href="/giving"
              className="underline-offset-4  hover:underline"
            >
              Giving
            </Link>
            <Link
              href="/events"
              className="underline-offset-4  hover:underline"
            >
              Events
            </Link>
            <Link
              href="/dashboard"
              className="underline-offset-4  hover:underline"
            >
              Staff Dashboard
            </Link>
            <Link
              href="/my-courses"
              className="underline-offset-4  hover:underline"
            >
              My Courses
            </Link>
            <Link
              href="/privacy-policy"
              className="underline-offset-4  hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="underline-offset-4  hover:underline"
            >
              Terms of Service
            </Link>
          </div>
          <div className="space-y-4">
            <p className="font-semibold text-lg">Follow Us</p>
            <div className="flex gap-6">
              <a
                href="https://au.linkedin.com/company/haddon-institute"
                target="_blank"
                className="hover:text-muted-foreground transition"
              >
                <Linkedin />
              </a>
              <a
                href="https://www.facebook.com/people/Haddon-Institute/61552824826527/"
                target="_blank"
                className="hover:text-muted-foreground transition"
              >
                <Facebook />
              </a>
              <a
                href="https://instagram.com/haddoninstitute"
                target="_blank"
                className="hover:text-muted-foreground transition"
              >
                <Instagram />
              </a>
              <a
                href="https://x.com/wearehaddon"
                target="_blank"
                className="hover:text-muted-foreground transition"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@HaddonInstitute"
                target="_blank"
                className="hover:text-muted-foreground transition"
              >
                <Youtube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 py-6 text-sm bg-neutral-900 text-muted-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <p className="md:ml-auto">
            Part of{" "}
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer font-medium underline-offset-4 hover:text-white hover:underline">
                61 Oaks Group
              </HoverCardTrigger>
              <HoverCardContent className="text-left">
                <div className="space-y-1">
                  <p className="text-sm">
                    A collection of initiatives, projects and business that are
                    aimed at reforming their sectors to build up ruins, raise up
                    former devastations, repair ruined cities and provide
                    discipleship for the future generation of leaders.
                  </p>
                  <div className="flex items-center pt-2">
                    <a
                      href="https://61oaksgroup.com.au/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex text-xs text-muted-foreground hover:text-accent-foreground"
                    >
                      Website <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </p>
        </div>
      </div>
    </div>
  );
}
