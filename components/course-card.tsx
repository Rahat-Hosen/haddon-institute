"use client";

import { CheckoutSubscriptionBody } from "@/app/api/checkout/route";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseCard({
  userId,
  userEmail,
  courseId,
  courseName,
  courseDescription,
  coursePrice,
  courseCategories,
  courseThumbnail,
  couseLessons,
}: {
  userId: any;
  userEmail: any;
  courseId: any;
  courseName: any;
  courseDescription: any;
  coursePrice: any;
  courseCategories: any;
  courseThumbnail: any;
  couseLessons: any;
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
    <div className="px-24">
      <div>
        <Image
          src={courseThumbnail || "/haddon-institute-logo.jpeg"}
          alt={courseName}
          height={1000}
          width={1000}
          className="rounded-2xl brightness-75 shadow-2xl w-full h-[500px] object-cover"
        />
      </div>
      <div>
        <Link
          href="/courses"
          className={(cn(buttonVariants()), "flex gap-2 py-4")}
        >
          <ArrowLeft /> All Courses
        </Link>
        <div className="flex justify-between w-full">
          <h1 className="text-4xl font-bold">{courseName}</h1>
          <div className="my-auto">
            {(isUserAuthenticated && (
              <Button onClick={() => handleClick()} className="flex gap-2">
                <CreditCard /> Purchase
              </Button>
            )) || (
              <Link href="/sign-in" className={buttonVariants()}>
                Sign in to purchase
              </Link>
            )}
          </div>
        </div>
        <div className="flex gap-4 py-4">
          <div className="border px-4 py-1 rounded-2xl">
            {couseLessons.filter((lesson: any) => lesson.published).length}{" "}
            Lessons
          </div>
          <div className="border px-4 py-1 rounded-2xl">7 Hours</div>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-1/2">
          <h2 className="font-bold text-xl mt-10">Overview</h2>
          <p>{courseDescription}</p>
          <h2 className="font-bold text-xl mt-10">Categories</h2>
          <div className="flex gap-4 py-4">
            {courseCategories.split(",").map((category: any, index: any) => (
              <div key={index} className="border px-4 py-1 rounded-2xl">
                {category.trim()}{" "}
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <Accordion type="single" collapsible className="w-full">
            {couseLessons
              .filter((lesson: any) => lesson.published === true)
              .map((lesson: any) => (
                <AccordionItem key={lesson.id} value={`item-${lesson.id}`}>
                  <AccordionTrigger>{lesson.title}</AccordionTrigger>
                  <AccordionContent>{lesson.description}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

// NEED TO CONFIRM USER IS LOGGED IN BEFORE FORWARDING TO STRIPE
// NEED TO PASS USERID/USEREMAIL TO ROUTE SO IT CAN UPDATE PRISMA DB ON SUCCESSFUL PURCHASE
