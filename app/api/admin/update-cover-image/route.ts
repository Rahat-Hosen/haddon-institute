import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { course, thumbnail } = json;

    await prisma.course.update({
      where: {
        slug: course,
      },
      data: {
        thumbnail: thumbnail,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
