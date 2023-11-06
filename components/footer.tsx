import {
  ArrowUpRight,
  Copyright,
  Facebook,
  Instagram,
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

export default function Footer() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="space-y-8">
          <Link href="/">
            <Image
              src="/logos/3.png"
              height={100}
              width={100}
              alt="Haddon Institute Logo"
              className="mx-auto"
            />
          </Link>
          <div className="flex justify-center gap-4 font-semibold">
            <Link
              href="/courses"
              className="hover:text-muted-foreground transition"
            >
              Courses
            </Link>
            <Link
              href="/resources"
              className="hover:text-muted-foreground transition"
            >
              Resources
            </Link>
            <Link
              href="/about-us"
              className="hover:text-muted-foreground transition"
            >
              About Us
            </Link>
            <Link
              href="/our-beliefs"
              className="hover:text-muted-foreground transition"
            >
              Our Beliefs
            </Link>
          </div>
          <div className="flex justify-center gap-8">
            <a
              href="https://facebook.com"
              className="hover:text-muted-foreground transition"
            >
              <Facebook />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-muted-foreground transition"
            >
              <Instagram />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-muted-foreground transition"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              className="hover:text-muted-foreground transition"
            >
              <Youtube />
            </a>
          </div>
          <div className="text-muted-foreground text-sm text-center">
            <div className="flex justify-center gap-2">
              <Copyright className="w-3 h-3 my-auto" />
              2023 Haddon Institute. All rights reserved.
            </div>
            <p>
              Part of the{" "}
              <HoverCard>
                <HoverCardTrigger className="font-medium hover:underline underline-offset-4 cursor-pointer">
                  61 Oaks Group
                </HoverCardTrigger>
                <HoverCardContent className="text-left">
                  <div className="space-y-1">
                    <p className="text-sm">
                      A collection of initiatives, projects and business that
                      are aimed at reforming their sectors to build up ruins,
                      raise up former devastations, repair ruined cities and
                      provide discipleship for the future generation of leaders.
                    </p>
                    <div className="flex items-center pt-2">
                      <a
                        href="https://61oaksgroup.com.au/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-accent-foreground flex"
                      >
                        Website <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              href="/terms-of-service"
              className="hover:text-muted-foreground transition text-xs"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy-policy"
              className="hover:text-muted-foreground transition text-xs"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex justify-center">
            <ModeToggle />
          </div>
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="hover:text-muted-foreground transition text-xs"
            >
              Administrator Dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-4 py-4">
        <div className="text-sm text-muted-foreground">
          P.O. Box 0000, Address Here
        </div>
        <div className="text-sm text-muted-foreground">+61 000 000 000</div>
      </div>
    </div>
  );
}
