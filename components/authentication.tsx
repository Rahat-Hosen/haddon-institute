"use client";

import {
  UserButton,
  SignedIn,
  SignedOut,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  AtSign,
  FileEdit,
  KeyRound,
  LayoutDashboard,
  LogIn,
  LogOut,
} from "lucide-react";

export function Authentication() {
  return (
    <>
      <SignedIn>
        <Link
          href="/my-courses"
          className={`flex gap-2 ${buttonVariants({ variant: "secondary" })}`}
        >
          <LayoutDashboard className="w-4 h-4" /> My Courses
        </Link>
        <div className="relative h-8 w-8">
          <ClerkLoading>
            <div className="absolute inset-0 rounded-full animate-pulse bg-secondary"></div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="absolute inset-0">
              <UserButton />
            </div>
          </ClerkLoaded>
        </div>
      </SignedIn>
      <SignedOut>
        <Link
          href="/sign-in"
          className={`flex gap-2 ${buttonVariants({ variant: "secondary" })}`}
        >
          <LogIn className="w-4 h-4" /> Sign In
        </Link>

        <Link
          href="/sign-up"
          className={`gap-2 hidden xl:flex ${buttonVariants({
            variant: "secondary",
          })}`}
        >
          <FileEdit className="w-4 h-4" /> Sign Up
        </Link>
      </SignedOut>
    </>
  );
}
