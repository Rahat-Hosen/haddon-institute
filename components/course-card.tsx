"use client";

import { CheckoutSubscriptionBody } from "@/app/api/checkout/route";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import {
  BadgeDollarSign,
  Calendar,
  Clock,
  CreditCard,
  Dumbbell,
  FileDigit,
  Library,
  MapPin,
  MoveLeft,
  MoveRight,
  ScrollText,
} from "lucide-react";
import Image from "next/image";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "./ui/separator";
import Player from "./player";
import AnimatedText from "./animated-text";

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
    <div className="px-4 my-10 max-w-7xl mx-auto">
      <div>
        <Player playbackId={course.video} />
      </div>
      <div>
        <Link href="/courses" className={`flex gap-2 my-4 ${buttonVariants()}`}>
          <MoveLeft /> All Courses
        </Link>
        <div className="space-y-8">
          <div className="xl:flex justify-between w-full">
            <div>
              <AnimatedText
                text={course.title}
                className="text-2xl xl:text-4xl font-bold tracking-tighter"
              />
              <div className="flex gap-4 pt-4">
                {Array.isArray(course.categories) &&
                  course.categories.map((data: any, index: any) => (
                    <p key={index} className="border px-4 py-1 rounded-2xl">
                      {data.value}
                    </p>
                  ))}
              </div>
            </div>
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

          <p className="whitespace-pre-line">{course.description}</p>

          <h2 className="font-bold text-2xl">Course Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <FileDigit className="w-5 h-5 my-auto" />
                Code
              </h3>
              <p>{course.code}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <BadgeDollarSign className="w-5 h-5 my-auto" /> Fees
              </h3>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "AUD",
                  minimumFractionDigits: 2,
                }).format(parseFloat(course.price) / 100)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <Calendar className="w-5 h-5 my-auto" />
                Period
              </h3>
              <p>{course.season}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <Clock className="w-5 h-5 my-auto" />
                Duration
              </h3>
              <p className="flex gap-2">
                {courseStart}
                <MoveRight />
                {courseEnd}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <Library className="w-5 h-5 my-auto" />
                Lessons
              </h3>
              <p className="flex gap-2">{course.Lesson.length}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <Dumbbell className="w-5 h-5 my-auto" />
                Workload
              </h3>
              <p className="flex gap-2">
                {course.workloadHours} hours per week
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <ScrollText className="w-5 h-5 my-auto" />
                Lectures
              </h3>
              {Array.isArray(course.lectures) &&
                course.lectures.map((data: any, index: any) => (
                  <p key={index}>{data.value}</p>
                ))}
            </div>
            <div>
              <h3 className="font-semibold text-lg flex gap-2">
                <MapPin className="w-5 h-5 my-auto" />
                Location
              </h3>
              <p className="flex gap-2">{course.campus}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-2xl">People</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-xl">Course Lecturer</h3>
                <div className="flex gap-4">
                  {/* <Image
                    src={
                      course.lecturerImage ||
                      "/logos/haddon-institute-logo.jpeg"
                    }
                    width={150}
                    height={150}
                    alt={course.lecturer}
                  /> */}
                  <div>
                    <h4 className="font-semibold text-lg">{course.lecturer}</h4>
                    <p>{course.lecturerEmail || "No email provided."}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl">Course Coordinator</h3>
                <div className="flex gap-4">
                  {/* <Image
                    src={
                      course.coordImage || "/logos/haddon-institute-logo.jpeg"
                    }
                    width={150}
                    height={150}
                    alt={course.coord}
                  /> */}
                  <div>
                    <h4 className="font-semibold text-lg">{course.coord}</h4>
                    <p>{course.coordEmail || "No email provided."}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl">Course Administrator</h3>
                <div className="flex gap-4">
                  {/* <Image
                    src={
                      course.adminImage || "/logos/haddon-institute-logo.jpeg"
                    }
                    width={150}
                    height={150}
                    alt={course.admin}
                  /> */}
                  <div>
                    <h4 className="font-semibold text-lg">{course.admin}</h4>
                    <p>{course.adminEmail || "No email provided."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <div className="w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-bold text-xl">Content Overview</h2>
            <p className="whitespace-pre-line">{course.overview}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-xl">Objectives</h2>
            <p>Students who are successful in this course should be able to:</p>
            <ol className="list-decimal ml-8">
              {Array.isArray(course.objectives) &&
                course.objectives.map((data: any, index: any) => (
                  <li key={index}>{data.value}</li>
                ))}
            </ol>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-xl">Teaching Format</h2>
            <p className="whitespace-pre-line">{course.format}</p>
          </div>

          <div className="md:flex justify-between gap-8 space-y-6 md:space-y-0">
            <div className="space-y-2">
              <h2 className="font-bold text-xl">
                Required Text{course.requiredTexts.length === 1 ? "" : "s"}
              </h2>
              <p>
                In order to achieve the learning outcomes of this course,
                students must obtain the following text
                {course.requiredTexts.length === 1 ? "" : "s"}:
              </p>

              <ul className="list-disc ml-8">
                {Array.isArray(course.requiredTexts) &&
                  course.requiredTexts.map((data: any, index: any) => (
                    <li key={index}>{data.value}</li>
                  ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-xl">
                Optional Text{course.optionalTexts.length === 1 ? "" : "s"}
              </h2>
              <p>
                Students are encouraged to explore the following supplementary
                text{course.optionalTexts.length === 1 ? "" : "s"} to enhance
                their learning:
              </p>

              <ul className="list-disc ml-8">
                {Array.isArray(course.optionalTexts) &&
                  course.optionalTexts.map((data: any, index: any) => (
                    <li key={index}>{data.value}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-xl">Workload</h2>
            <p className="whitespace-pre-line">{course.workload}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold text-xl">Assessment</h2>
            <p className="whitespace-pre-line">{course.assessment}</p>
          </div>
          <div className="w-full space-y-2">
            <h2 className="font-bold text-xl">Lessons</h2>
            <p>
              Explore the lesson overviews to get an idea of what the course
              will cover.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-2">
              {course.Lesson.map((lesson: any) => (
                <AccordionItem
                  key={lesson.id}
                  value={`item-${lesson.id}`}
                  className="border py-2 px-6 hover:bg-muted rounded-md transition"
                >
                  <AccordionTrigger className="font-semibold">
                    {lesson.title}
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line">
                    {lesson.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
