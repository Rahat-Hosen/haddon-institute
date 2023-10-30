import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Haddon Institute",
  description:
    "Sign in to Haddon Institute to access your courses and account settings.",
};

export default function SignInPage() {
  return (
    <main className="flex flex-col my-20 items-center justify-center">
      <SignIn
        appearance={{ variables: { colorPrimary: "#000" } }}
        afterSignInUrl="/"
      />
    </main>
  );
}
