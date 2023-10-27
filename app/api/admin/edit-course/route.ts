import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const {
      id,
      slug,
      title,
      description,
      author,
      categories,
      price,
      capstone,
    } = json;

    await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        slug: slug,
        title: title,
        description: description,
        author: author,
        categories: categories,
        price: price,
        capstone: capstone,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error creating posts:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
