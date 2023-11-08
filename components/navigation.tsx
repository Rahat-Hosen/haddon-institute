"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Authentication } from "./authentication";
import Image from "next/image";
import { ArrowRight, X, Menu, BookOpen, DollarSign } from "lucide-react";
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasShadow(true);
    } else {
      setHasShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`lg:hidden flex justify-between px-4 backdrop-blur-3xl bg-muted/50 transition-all duration-300 fixed bottom-0 w-full z-50`}
      >
        <Link href="/">
          <Image
            src="/logos/3.png"
            height={50}
            width={50}
            alt="Haddon Institute Logo"
          />
        </Link>
        <div className="my-auto">
          <button onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="w-8 h-8 my-auto" />
            ) : (
              <Menu className="w-8 h-8 my-auto" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`hidden lg:flex px-24 py-3 w-full sticky top-0 z-50  ${
          hasShadow
            ? "shadow-2xl backdrop-blur-3xl bg-muted/50 transition-all duration-300"
            : "shadow-none bg-none transition-all duration-300"
        }`}
      >
        <div className="flex-1 my-auto">
          <Link href="/">
            <Image
              src="/logos/3.png"
              height={50}
              width={50}
              alt="Haddon Institute Logo"
            />
          </Link>
        </div>
        <div className="shrink-0 my-auto">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3 mr-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/mission-statement"
                        >
                          <BookOpen className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Mission Statement
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Our vision is to provide a Christ-centered education
                            grounded in Reformed theology.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/our-beliefs" title="Our Beliefs">
                      What we believe and teach.
                    </ListItem>
                    <ListItem href="/leadership" title="Our Leadership">
                      Meet our leadership team.
                    </ListItem>
                    <ListItem href="/partners" title="Our Partners">
                      Our partners and affiliates.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Admissions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3 mr-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/scholarships"
                        >
                          <DollarSign className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Scholarships
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Receive financial aid for your learning.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href="/application-requirements"
                      title="Application Requirements"
                    >
                      What you need to apply to the Haddon Institute.
                    </ListItem>
                    <ListItem href="/tuition" title="Tuition & Fees">
                      Understand the costs and fees associated with our courses.
                    </ListItem>
                    <ListItem href="/outcomes" title="Outcomes">
                      Learn more about what we hope you will get out of our
                      courses.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/courses" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Courses
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resources" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Resources
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/events" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/giving" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Giving
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Separator className="max-w-sm mx-auto my-2" />
          <div className="flex justify-center">
            <Link
              href="/course/theology-for-today-s-world"
              className={`flex gap-2 ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              <Badge>NEW</Badge> Theology for Today&apos;s World
            </Link>
          </div>
        </div>
        <div className="flex-1 my-auto">
          <div className="flex justify-end">
            <div className="flex gap-4">
              <Authentication />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed w-full bottom-16 z-50 backdrop-blur-3xl bg-muted/50 rounded-t-[24px]"
          >
            <div className="block py-4 hover:bg-accent transition rounded-t-[24px] px-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>About</AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/mission-statement"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Mission Statement <ArrowRight />
                      </div>
                    </Link>
                    <Separator />
                    <Link
                      href="/our-beliefs"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Our Beliefs <ArrowRight />
                      </div>
                    </Link>
                    <Separator />
                    <Link
                      href="/leadership"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Our Leadership <ArrowRight />
                      </div>
                    </Link>
                    <Separator />
                    <Link
                      href="/partners"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Our Partners <ArrowRight />
                      </div>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Separator />
            <div className="block py-4 hover:bg-accent transition rounded-t-[24px] px-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Admissions</AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/scholarships"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Scholarships <ArrowRight />
                      </div>
                    </Link>
                    <Separator />
                    <Link
                      href="/application-requirements"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Application Requirements <ArrowRight />
                      </div>
                    </Link>
                    <Separator />
                    <Link
                      href="/tuition"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Tuition & Fees <ArrowRight />
                      </div>
                    </Link>
                    <Separator />
                    <Link
                      href="/outcomes"
                      className="block py-4 hover:bg-accent transition "
                      onClick={toggleMobileMenu}
                    >
                      <div className="flex justify-between px-6">
                        Outcomes <ArrowRight />
                      </div>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Separator />
            <Link
              href="/courses"
              className="block py-4 hover:bg-accent transition "
              onClick={toggleMobileMenu}
            >
              <div className="flex justify-between px-6">
                Courses <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/resources"
              className="block py-4 hover:bg-accent transition"
              onClick={toggleMobileMenu}
            >
              <div className="flex justify-between px-6">
                Resources <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/giving"
              className="block py-4 hover:bg-accent transition"
              onClick={toggleMobileMenu}
            >
              <div className="flex justify-between px-6">
                Giving <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/events"
              className="block py-4 hover:bg-accent transition"
              onClick={toggleMobileMenu}
            >
              <div className="flex justify-between px-6">
                Events <ArrowRight />
              </div>
            </Link>
            <Separator />
            <div className="flex justify-between px-6 py-4">
              <Authentication />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md py-2 px-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
