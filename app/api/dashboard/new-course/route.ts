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
      campus,
      format,
      lectures,
      objectives,
      requiredTexts,
      optionalTexts,
      workload,
      workloadHours,
      weeks,
      assessment,
      passingReq,
      season,
      startDate,
      endDate,
      lecturer,
      lecturerEmail,
      coord,
      coordEmail,
      admin,
      adminEmail,
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
        campus: campus,
        format: format,
        lectures: lectures,
        objectives: objectives,
        requiredTexts: requiredTexts,
        optionalTexts: optionalTexts,
        workload: workload,
        workloadHours: workloadHours,
        weeks: weeks,
        assessment: assessment,
        passingReq: passingReq,
        season: season,
        startDate: startDate,
        endDate: endDate,
        lecturer: lecturer,
        lecturerEmail: lecturerEmail,
        coord: coord,
        coordEmail: coordEmail,
        admin: admin,
        adminEmail: adminEmail,
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
