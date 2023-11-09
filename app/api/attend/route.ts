import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { name, email, phone, eventId } = json;

    await prisma.eventSignup.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        events: { connect: { id: eventId } },
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error subscribing email:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
