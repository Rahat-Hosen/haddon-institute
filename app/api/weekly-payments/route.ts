import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { name, email, course } = json;

    await prisma.weeklyPaymentsInterest.create({
      data: {
        name: name,
        email: email,
        course: course,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error registering weeklyPaymentsInterest:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
