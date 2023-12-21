import AnimatedText from "@/components/animated-text";
import WeeklyPaymentsForm from "@/components/weekly-payments/weekly-payments-form";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function retrieveCourse() {
  const data = await prisma.course.findMany({
    where: {
      published: true,
    },
    include: { Lesson: true, users: true },
  });

  if (!data) {
    redirect("/not-found");
  }

  return data;
}

export default async function WeeklyPayments() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const courses = await retrieveCourse();

  return (
    <div className="space-y-8 px-4 my-20 max-w-7xl mx-auto">
      <AnimatedText
        text="Weekly Payments"
        className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />

      <p className="text-center text-black text-lg max-w-3xl mx-auto">
        Haddon Institute is glad to offer a weekly payment plan. Please click
        the button below and we will be in touch within 1-2 days to formally
        arrange payments.
      </p>

      <WeeklyPaymentsForm
        email={user.emailAddresses[0].emailAddress}
        name={user.firstName + " " + user.lastName}
        courses={courses}
      />
    </div>
  );
}
