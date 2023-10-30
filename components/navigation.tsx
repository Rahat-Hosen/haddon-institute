import Link from "next/link";
import { Authentication } from "./authentication";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export default async function Navigation() {
  const { userId } = auth();
  const isAdmin =
    userId && (await prisma.user.findUnique({ where: { id: userId } }))?.admin;

  const commonLinks = [
    {
      href: "/",
      text: "Haddon Institute",
      className: "font-semibold flex gap-2 text-xl",
    },
    { href: "/courses", text: "Courses" },
    { href: "/resources", text: "Resources" },
    { href: "/about-us", text: "About Us" },
    { href: "/our-beliefs", text: "Our Beliefs" },
  ];

  const adminLinks = [...commonLinks, { href: "/admin", text: "Admin" }];

  const links = isAdmin ? adminLinks : commonLinks;

  return (
    <div className="flex justify-between py-12 px-24">
      <div className="flex gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-muted-foreground transition"
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className="flex gap-8">
        <Authentication />
      </div>
    </div>
  );
}
