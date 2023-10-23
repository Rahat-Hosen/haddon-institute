"use client";

import { CheckoutSubscriptionBody } from "@/app/api/checkout/route";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function CourseCard({
  userId,
  userEmail,
  courseId,
  courseName,
  courseDescription,
  coursePrice,
}: {
  userId: any;
  userEmail: any;
  courseId: any;
  courseName: any;
  courseDescription: any;
  coursePrice: any;
}) {
  const auth = useAuth();

  const handleClick = async () => {
    // step 1: load stripe
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    // step 2: define the data
    const body: CheckoutSubscriptionBody = {
      userId: userId,
      userEmail: userEmail,
      courseId: courseId,
      courseName: courseName,
      courseDescription: courseDescription,
      coursePrice: coursePrice,
    };

    // step 3: make a post fetch API call to /api/checkout handler
    const result = await fetch("/api/checkout", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });

    // step 4: get the data and redirect to checkout using the sessionId
    const data = (await result.json()) as Stripe.Checkout.Session;
    const sessionId = data.id!;
    stripe?.redirectToCheckout({ sessionId });
  };

  // Check if the user is authenticated before rendering the button
  const isUserAuthenticated = auth.isSignedIn;

  return (
    <div className="border rounded-md p-8 flex flex-col gap-2 items-start max-w-md mx-auto">
      <h2 className="text-xl font-bold">{courseName}</h2>
      <p>{courseDescription}</p>
      {(isUserAuthenticated && (
        <Button onClick={() => handleClick()}>Purchase</Button>
      )) || (
        <Link href="/sign-in" className={buttonVariants()}>
          Sign in to purchase
        </Link>
      )}
    </div>
  );
}

// NEED TO CONFIRM USER IS LOGGED IN BEFORE FORWARDING TO STRIPE
// NEED TO PASS USERID/USEREMAIL TO ROUTE SO IT CAN UPDATE PRISMA DB ON SUCCESSFUL PURCHASE
