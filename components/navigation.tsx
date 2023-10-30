"use client";

import Link from "next/link";
import { Authentication } from "./authentication";
import Image from "next/image";
import { useState } from "react"; // Import useState from React
import { ArrowRight, X, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="xl:hidden flex px-4">
        <div className="flex-1 my-auto">
          <button onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="w-8 h-8 my-auto" />
            ) : (
              <Menu className="w-8 h-8 my-auto" />
            )}
          </button>
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
          <div className="flex gap-8 justify-end">
            <Authentication />
          </div>
        </div>
      </div>

      <div className="hidden xl:flex px-24 py-6 w-full">
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-muted rounded-2xl"
          >
            <Link
              href="/courses"
              className="block py-4 hover:bg-accent transition rounded-t-2xl"
            >
              <div className="flex justify-between px-6">
                Courses <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/resources"
              className="block hover:bg-accent transition py-4"
            >
              <div className="flex justify-between px-6">
                Resources <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/about-us"
              className="block hover:bg-accent transition py-4"
            >
              <div className="flex justify-between px-6">
                About Us <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/our-beliefs"
              className="block py-4 hover:bg-accent transition rounded-b-2xl"
            >
              <div className="flex justify-between px-6">
                Our Beliefs <ArrowRight />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
