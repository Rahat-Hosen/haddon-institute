import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { enrollee, email, courseId } = json;

    console.log(courseId);

    // Create the lesson and associate it with the course using `connect`
    const addEnrollee = await prisma.user.create({
      data: {
        name: enrollee,
        email: email,
        courses: {
          connect: {
            id: Number(courseId),
          },
        },
      },
    });

    return NextResponse.json({ status: 201, addEnrollee });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
