import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function GET() {
  const userData = await currentUser();

  if (!userData) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  // Check for existing user data
  const data = await prisma.user.findUnique({
    where: {
      email: userData.emailAddresses[0].emailAddress,
    },
  });

  if (!data) {
    console.log(`User does not exist, adding ${userData.id} to database.`);

    await prisma.user.create({
      data: {
        name: userData.firstName + " " + userData.lastName,
        email: userData.emailAddresses[0].emailAddress,
      },
    });

    console.log(
      `User ${userData.id} added to database. Redirecting to user /my-courses.`,
    );

    redirect("/my-courses");
  } else {
    console.log(
      `User ${userData.id} already exists in database. Redirecting to /my-courses.`,
    );

    redirect("/my-courses");
  }
}
