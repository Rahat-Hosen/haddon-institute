import Link from "next/link";
import { Authentication } from "./authentication";
import Image from "next/image";

export default function Navigation() {
  return (
    <div className="flex justify-between p-12 px-24 text-xl">
      <div className="flex gap-8">
        <Link
          href="/"
          className="hover:underline underline-offset-8 transition font-semibold flex gap-2"
        >
          Haddon Institute
        </Link>
        <Link
          href="/courses"
          className="hover:underline underline-offset-8 transition"
        >
          Courses
        </Link>
        <Link
          href="/resources"
          className="hover:underline underline-offset-8 transition"
        >
          Resources
        </Link>
        <Link
          href="/about-us"
          className="hover:underline underline-offset-8 transition"
        >
          About Us
        </Link>
        <Link
          href="/our-beliefs"
          className="hover:underline underline-offset-8 transition"
        >
          Our Beliefs
        </Link>
      </div>
      <div>
        <Image
          src="/haddon-institute-logo.jpeg"
          width={50}
          height={50}
          alt="Haddon Institute Logo"
          className="aspect-square my-auto"
        />
      </div>
      <div className="flex gap-8">
        <Authentication />
      </div>
    </div>
  );
}
