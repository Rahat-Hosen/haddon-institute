import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";
import prisma from "@/lib/prisma";

const { Video } = new Mux();

export async function POST(req: NextRequest) {
  try {
    const { uploadId, slug } = await req.json();

    const uploadData = await Video.Uploads.get(uploadId);
    const assetId = uploadData?.asset_id;

    const videoData = await Video.Assets.get(assetId as string);
    const playbackId = videoData?.playback_ids?.[0].id;

    await prisma.lesson.update({
      where: { slug: slug },
      data: { video: playbackId },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error adding playback_id:", error);
    return NextResponse.json("Something went wrong.", { status: 500 });
  }
}
