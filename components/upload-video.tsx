"use client";

import MuxUploader, { MuxUploaderDrop } from "@mux/mux-uploader-react";

import React, { useEffect, useState } from "react";

export default function UploadVideo({ slug }: { slug: any }) {
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadId, setUploadId] = useState("");

  useEffect(() => {
    async function fetchUploadUrl() {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setUploadUrl(data.url);
          setUploadId(data.upload_id);
        } else {
          console.error("Failed to fetch upload URL");
        }
      } catch (error) {
        console.error("Error fetching upload URL:", error);
      }
    }

    fetchUploadUrl();
  }, []);

  async function getPlaybackId() {
    try {
      const response = await fetch(`/api/playback`, {
        method: "POST",
        body: JSON.stringify({ uploadId: uploadId, slug: slug }),
      });
      if (response.ok) {
        // toast success
      } else {
        console.error("Failed to fetch playback ID");
      }
    } catch (error) {
      console.error("Error fetching playback ID:", error);
    }
  }

  return (
    <MuxUploaderDrop mux-uploader="uploader">
      <MuxUploader
        endpoint={uploadUrl}
        id="uploader"
        onSuccess={getPlaybackId}
      ></MuxUploader>
    </MuxUploaderDrop>
  );
}
