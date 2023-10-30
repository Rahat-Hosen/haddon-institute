import Link from "next/link";
import { Authentication } from "./authentication";
import Image from "next/image";

export default async function Navigation() {
  return (
    <div className="flex px-24 py-6">
      <div className="flex-1 my-auto">
        <div className="flex justify-start gap-8">
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
      </div>
      <div className="shrink-0">
        <Link href="/">
          <Image
            src="/logos/3.png"
            height={50}
            width={50}
            alt="Haddon Institute Logo"
          />
        </Link>
      </div>
      <div className="flex-1 my-auto">
        <div className="flex justify-end">
          <div className="flex gap-8">
            <Authentication />
          </div>
        </div>
      </div>
    </div>
  );
}
