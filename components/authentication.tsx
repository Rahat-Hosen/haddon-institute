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
import { AtSign, KeyRound } from "lucide-react";

export function Authentication() {
  return (
    <>
      <SignedIn>
        <Link
          href="/my-courses"
          className="hover:text-muted-foreground transition my-auto"
        >
          My Courses
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
        <Link href="/sign-in" className={`flex gap-2 ${buttonVariants()}`}>
          <KeyRound className="w-4 h-4" /> Sign In
        </Link>

        <Link
          href="/sign-up"
          className={`gap-2 hidden xl:flex ${buttonVariants()}`}
        >
          <AtSign className="w-4 h-4" /> Join
        </Link>
      </SignedOut>
    </>
  );
}
