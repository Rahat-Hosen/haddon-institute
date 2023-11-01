"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Authentication } from "./authentication";
import Image from "next/image";
import { ArrowRight, X, Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./mode-toggle";

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
        className={`xl:hidden flex justify-between px-4 ${
          hasShadow
            ? "shadow-2xl bg-muted transition-all duration-300"
            : "shadow-none bg-none transition-all duration-300"
        } sticky top-0 z-10`}
      >
        <div className="my-auto">
          <button onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="w-8 h-8 my-auto" />
            ) : (
              <Menu className="w-8 h-8 my-auto" />
            )}
          </button>
        </div>
        <Link href="/">
          <Image
            src="/logos/3.png"
            height={50}
            width={50}
            alt="Haddon Institute Logo"
          />
        </Link>
      </div>

      <div
        className={`hidden xl:flex px-24 py-6 w-full sticky top-0 z-10  ${
          hasShadow
            ? "shadow-2xl bg-muted transition-all duration-300"
            : "shadow-none bg-none transition-all duration-300"
        }`}
      >
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
            <div className="flex gap-4">
              <ModeToggle />
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
            className="xl:hidden sticky top-16 z-10 bg-muted rounded-2xl"
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
              className="block hover-bg-accent transition py-4"
            >
              <div className="flex justify-between px-6">
                Resources <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/about-us"
              className="block hover-bg-accent transition py-4"
            >
              <div className="flex justify-between px-6">
                About Us <ArrowRight />
              </div>
            </Link>
            <Separator />
            <Link
              href="/our-beliefs"
              className="block py-4 hover-bg-accent transition rounded-b-2xl"
            >
              <div className="flex justify-between px-6">
                Our Beliefs <ArrowRight />
              </div>
            </Link>
            <div className="flex justify-between px-6 py-4">
              <ModeToggle />
              <Authentication />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
