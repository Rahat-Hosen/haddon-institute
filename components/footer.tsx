import { Copyright, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="my-20 flex justify-center">
      <div className="space-y-8">
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
        <div className="flex justify-center gap-4">
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
            <Twitter />
          </a>
        </div>
        <div className="flex justify-center gap-2 text-muted-foreground text-sm">
          <Copyright className="w-4 h-4 my-auto" />
          2023 Haddon Institute. All rights reserved.
        </div>
      </div>
    </div>
  );
}
