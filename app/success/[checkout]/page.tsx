import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Link from "next/link";

export default async function Success({ params }: any) {
  const session_id = params.checkout as string;
  const session = await stripe.checkout.sessions.retrieve(session_id);

  // These are stored in the session metadata with Stripe
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;
  const courseName = session?.metadata?.courseName;
  const userEmail = session?.customer_email;

  // The database will only update if the payment was successful
  if (session.payment_status === "paid") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: { courses: true },
      });

      if (user) {
        await prisma.user.update({
          where: {
            id: userId,
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
            id: userId as string,
            email: userEmail as string,
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
        <Link href="/dashboard" className="underline hover:no-underline">
          dashboard
        </Link>
        .
      </p>
    </div>
  );
}
