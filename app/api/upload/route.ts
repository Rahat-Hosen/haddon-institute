import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

export async function POST() {
  const { Video } = new Mux();

  try {
    const upload = await Video.Uploads.create({
      new_asset_settings: {
        playback_policy: "public",
      },
      cors_origin: "*",
    });

    return NextResponse.json({ url: upload.url, upload_id: upload.id });
  } catch (e) {
    return NextResponse.json({ message: `Error creating upload.` });
  }
}
