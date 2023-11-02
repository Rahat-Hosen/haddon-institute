"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Authentication } from "./authentication";
import Image from "next/image";
import { ArrowRight, X, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";

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
        className={`xl:hidden flex justify-between px-4 backdrop-blur-3xl transition-all duration-300 fixed bottom-0 w-full z-10`}
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
        className={`hidden xl:flex px-24 py-3 w-full sticky top-0 z-10  ${
          hasShadow
            ? "shadow-2xl backdrop-blur-3xl transition-all duration-300"
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
          <div className="flex gap-8 my-auto">
            <Link
              href="/courses"
              className={`${buttonVariants({ variant: "ghost" })}`}
            >
              Courses
            </Link>
            <Link
              href="/resources"
              className={`${buttonVariants({ variant: "ghost" })}`}
            >
              Resources
            </Link>
            <Link
              href="/about-us"
              className={`${buttonVariants({ variant: "ghost" })}`}
            >
              About Us
            </Link>
            <Link
              href="/our-beliefs"
              className={`${buttonVariants({ variant: "ghost" })}`}
            >
              Our Beliefs
            </Link>
            <Link
              href="/scholarships"
              className={`${buttonVariants({ variant: "ghost" })}`}
            >
              Scholarships
            </Link>
          </div>
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
            className="xl:hidden fixed w-full bottom-16 z-10 backdrop-blur-3xl rounded-t-[24px]"
          >
            <Link
              href="/courses"
              className="block py-4 hover:bg-accent transition rounded-t-[24px]"
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
              href="/about-us"
              className="block py-4 hover:bg-accent transition"
              onClick={toggleMobileMenu}
            >
              <div className="flex justify-between px-6">
                About Us <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/our-beliefs"
              className="block py-4 hover:bg-accent transition"
              onClick={toggleMobileMenu}
            >
              <div className="flex justify-between px-6">
                Our Beliefs <ArrowRight />
              </div>
            </Link>
            <div className="flex justify-between px-6 py-4">
              <Authentication />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
