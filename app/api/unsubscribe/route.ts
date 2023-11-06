import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email } = json;

    await prisma.newsletter.update({
      where: {
        email: email,
      },
      data: {
        subscribed: false,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error unsubscribing email:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
