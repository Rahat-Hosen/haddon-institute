import Link from "next/link";
import { Authentication } from "./authentication";

export default function Navigation() {
  return (
    <div className="flex justify-between py-12 px-24">
      <div className="flex gap-8">
        <Link
          href="/"
          className="hover:text-muted-foreground transition font-semibold flex gap-2 text-xl"
        >
          Haddon Institute
        </Link>
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
      <div className="flex gap-8">
        <Authentication />
      </div>
    </div>
  );
}
