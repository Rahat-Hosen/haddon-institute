import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  // Check for existing user data
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!data) {
    console.log(`User does not exist, adding ${userId} to database.`);

    await prisma.user.create({
      data: {
        id: userId,
      },
    });

    console.log(
      `User ${userId} added to database. Redirecting to user dashboard.`,
    );

    redirect("/dashboard");
  } else {
    console.log(
      `User ${userId} already exists in database. Redirecting to user dashboard.`,
    );

    redirect("/dashboard");
  }
}
