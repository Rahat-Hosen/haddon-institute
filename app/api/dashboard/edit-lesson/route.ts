import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { slug, blocks } = json;

    await prisma.lesson.update({
      where: {
        slug: slug,
      },
      data: {
        blocks: blocks,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error creating posts:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
