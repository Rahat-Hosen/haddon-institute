// components/MonthlySubscriptionCard.tsx
"use client";

import { CheckoutSubscriptionBody } from "@/app/checkout-sessions/route";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { Button } from "./ui/button";

export default function CourseCard({
  userId,
  name,
  description,
  price,
}: {
  userId: any;
  name: any;
  description: any;
  price: any;
}) {
  const handleClick = async () => {
    // step 1: load stripe
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    // step 2: define the data for monthly subscription
    const body: CheckoutSubscriptionBody = {
      price: price,
      name: name,
      description: description,
    };

    // step 3: make a post fetch api call to /checkout-session handler
    const result = await fetch("/checkout-sessions", {
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

  // render a simple card
  return (
    <div className="border rounded-md p-8 flex flex-col gap-2 items-start max-w-md mx-auto">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{description}</p>
      <Button onClick={() => handleClick()}>Purchase</Button>
    </div>
  );
}

// NEED TO CONFIRM USER IS LOGGED IN BEFORE FORWARDING TO STRIPE
// NEED TO PASS USERID/USEREMAIL TO ROUTE SO IT CAN UPDATE PRISMA DB ON SUCCESSFUL PURCHASE
