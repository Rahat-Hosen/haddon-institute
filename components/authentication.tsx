"use client";

import {
  UserButton,
  SignedIn,
  SignedOut,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import Link from "next/link";

export function Authentication() {
  return (
    <>
      <SignedIn>
        <Link
          href="/dashboard"
          className="hover:underline underline-offset-8 transition"
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
        <Link
          href="/sign-in"
          className="hover:underline underline-offset-8 transition"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="hover:underline underline-offset-8 transition"
        >
          Join
        </Link>
      </SignedOut>
    </>
  );
}
