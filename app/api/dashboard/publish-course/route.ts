import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { course } = json;

    await prisma.course.update({
      where: {
        slug: course,
      },
      data: {
        published: true,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
