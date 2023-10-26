import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { slug, title, description, courseId } = json;

    console.log(courseId);

    // Create the lesson and associate it with the course using `connect`
    const lesson = await prisma.lesson.create({
      data: {
        slug: slug,
        title: title,
        description: description,
        course: {
          connect: {
            id: Number(courseId),
          },
        },
      },
    });

    return NextResponse.json({ status: 201, lesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
