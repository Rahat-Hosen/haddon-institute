import { SignIn } from "@clerk/nextjs";

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
