"use client";

import { CheckoutSubscriptionBody } from "@/app/api/checkout/route";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { CreditCard, MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseCard({
  userId,
  userEmail,
  course,
}: {
  userId: any;
  userEmail: any;
  course: any;
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
      courseId: course.id,
      courseName: course.title,
      courseDescription: course.description,
      coursePrice: course.price,
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

  const timezone = "Australia/Brisbane";

  const courseStart = format(
    utcToZonedTime(new Date(course.startDate), timezone),
    "MMMM d, yyyy",
  );
  const courseEnd = format(
    utcToZonedTime(new Date(course.endDate), timezone),
    "MMMM d, yyyy",
  );

  return (
    <div className="px-4 my-10 xl:px-24 xl:my-20">
      <div>
        <Image
          src={course.thumbnail || "/logos/haddon-institute-logo.jpeg"}
          alt={course.title}
          height={1000}
          width={1000}
          className="rounded-2xl brightness-75 shadow-2xl w-full h-[200px] xl:h-[500px] object-cover"
        />
      </div>
      <div>
        <Link href="/courses" className={`flex gap-2 my-4 ${buttonVariants()}`}>
          <MoveLeft /> All Courses
        </Link>
        <div className="xl:flex justify-between w-full">
          <h1 className="text-2xl xl:text-4xl font-bold">{course.title}</h1>
          <div className="my-auto xl:mt-0 mt-4">
            {(isUserAuthenticated && (
              <div className="flex gap-4">
                <p className="my-auto">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "AUD",
                    minimumFractionDigits: 2,
                  }).format(parseFloat(course.price) / 100)}
                </p>
                <Button
                  onClick={() => handleClick()}
                  className="flex gap-2 w-full xl:w-auto"
                >
                  <CreditCard /> Purchase
                </Button>
              </div>
            )) || (
              <div className="flex gap-4">
                <p className="my-auto">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "AUD",
                    minimumFractionDigits: 2,
                  }).format(parseFloat(course.price) / 100)}
                </p>
                <Link
                  href="/sign-in"
                  className={`flex gap-2 w-full xl:w-auto ${buttonVariants()}`}
                >
                  Sign in to purchase
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="xl:flex gap-4 py-4 space-y-2 xl:space-y-0">
          <div className="border px-4 py-1 rounded-2xl">{course.code}</div>
          <div className="border px-4 py-1 rounded-2xl flex gap-2">
            {courseStart}
            <MoveRight />
            {courseEnd}
          </div>
          <div className="border px-4 py-1 rounded-2xl">
            {course.Lesson.length} Lessons
          </div>
          <div className="border px-4 py-1 rounded-2xl">6 hours per week</div>
        </div>
      </div>
      <div className="xl:flex gap-8">
        <div className="w-full xl:w-1/2">
          <div className="space-y-4">
            <div>
              <h2 className="font-bold text-xl">Description</h2>
              <p className="whitespace-pre-line">{course.description}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Overview</h2>
              <p className="whitespace-pre-line">{course.overview}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Format</h2>
              <p className="whitespace-pre-line">{course.format}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Objectives</h2>
              <p className="whitespace-pre-line">{course.objectives}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Texts</h2>
              <p className="whitespace-pre-line">{course.texts}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Workload</h2>
              <p className="whitespace-pre-line">{course.workload}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Assessment</h2>
              <p className="whitespace-pre-line">{course.assessment}</p>
            </div>
          </div>
          <h2 className="font-bold text-xl mt-10">Categories</h2>
          <div className="flex gap-4 py-4">
            {course.categories.split(",").map((category: any, index: any) => (
              <div key={index} className="border px-4 py-1 rounded-2xl">
                {category.trim()}{" "}
              </div>
            ))}
          </div>
          <h2 className="font-bold text-xl mt-10">People</h2>
          <div className="flex gap-4">
            <div>
              <h3 className="font-semibold">Course Coordinator</h3>
              <p>{course.courseCoord}</p>
            </div>
            <div>
              <h3 className="font-semibold">Course Administrator</h3>
              <p>{course.courseAdmin}</p>
            </div>
            <div>
              <h3 className="font-semibold">Course Lecturer</h3>
              <p>{course.lecturer}</p>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <Accordion type="single" collapsible className="w-full">
            {course.Lesson.map((lesson: any) => (
              <AccordionItem key={lesson.id} value={`item-${lesson.id}`}>
                <AccordionTrigger>{lesson.title}</AccordionTrigger>
                <AccordionContent className="whitespace-pre-line">
                  {lesson.description.replace(/-/g, "•")}
                </AccordionContent>
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
