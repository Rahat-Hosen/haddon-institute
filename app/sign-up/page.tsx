import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join | Haddon Institute",
  description: "Join Haddon Institute to purchase courses today!",
};

export default function SignInPage() {
  return (
    <main className="flex flex-col my-20 items-center justify-center">
      <SignUp
        afterSignUpUrl="/api/auth"
        appearance={{ variables: { colorPrimary: "#000" } }}
      />
    </main>
  );
}
