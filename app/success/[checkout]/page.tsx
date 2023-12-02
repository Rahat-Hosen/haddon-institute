import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Success({ params }: any) {
  const session_id = params.checkout as string;
  const session = await stripe.checkout.sessions.retrieve(session_id);

  // Retrieve Clerk userData
  const userData = await currentUser();

  if (!userData) {
    redirect("/sign-in");
  }

  // These are stored in the session metadata with Stripe
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;
  const courseName = session?.metadata?.courseName;

  // The database will only update if the payment was successful
  if (session.payment_status === "paid") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userData.emailAddresses[0].emailAddress,
        },
        include: { courses: true },
      });

      if (user) {
        await prisma.user.update({
          where: {
            email: userData.emailAddresses[0].emailAddress,
          },
          select: {
            courses: true,
          },
          data: {
            courses: {
              connect: {
                id: Number(courseId),
              },
            },
          },
        });
      } else {
        await prisma.user.create({
          data: {
            name: userData.firstName + " " + userData.lastName,
            email: userData.emailAddresses[0].emailAddress,
            courses: {
              connect: {
                id: Number(courseId),
              },
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // IF USER HASN'T PAID, REDIRECT TO 404
  // IF SESSION_ID INCORRECT, REDIRECT TO 404

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
      <h1 className="text-5xl font-bold">Thank-you for your puchase!</h1>
      <p>You successfully purchased {courseName}.</p>
      <p className="italics">Soli Deo Gloria</p>
      <p>
        You can access this course from your{" "}
        <Link href="/my-courses" className="underline hover:no-underline">
          My Courses
        </Link>{" "}
        page.
      </p>
    </div>
  );
}

// IF PRISMA FAILS, NEED TO LET USER KNOW TO ASK FOR SUPPORT

// IF USER EMAIL ALREADY EXISTS, ADD TO EXISTING LINE - DO NOT ATTEMPT CREATION AGAIN
