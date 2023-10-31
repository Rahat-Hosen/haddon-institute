import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const {
      title,
      slug,
      code,
      description,
      overview,
      format,
      objectives,
      texts,
      workload,
      assessment,
      passingReq,
      season,
      startDate,
      endDate,
      lecturer,
      coordinator,
      administrator,
      categories,
      price,
      capstone,
    } = json;

    await prisma.course.create({
      data: {
        title: title,
        slug: slug,
        code: code,
        description: description,
        overview: overview,
        format: format,
        objectives: objectives,
        texts: texts,
        workload: workload,
        assessment: assessment,
        passingReq: passingReq,
        season: season,
        startDate: startDate,
        endDate: endDate,
        lecturer: lecturer,
        courseCoord: coordinator,
        courseAdmin: administrator,
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
