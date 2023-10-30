"use client";

import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";

export default function CoverImage({
  thumbnail,
  title,
  course,
}: {
  thumbnail: string;
  title: string;
  course: string;
}) {
  const router = useRouter();

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "haddon"); // Replace with your Cloudinary upload preset

      setUploading(true);

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/denivusi1/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUploadedImageUrl(data.secure_url);

        try {
          const response = await fetch("/api/admin/update-cover-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              course: course,
              thumbnail: data.secure_url,
            }),
          });

          if (response.ok) {
            toast({
              title: "Cover Image Updated",
              description: "Cover Image was successfully updated.",
            });

            setUploading(false);

            router.refresh();
          } else {
            toast({
              title: "Something went wrong.",
              description: "Please try again.",
              variant: "destructive",
            });
            setUploading(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Cover Image</h1>
          <p className="text-sm text-muted-foreground">
            A cover image goes a long way to making your course stand out.
          </p>
        </div>
        <Label
          className={`flex gap-2 ${buttonVariants()} relative overflow-hidden`}
        >
          {uploading ? (
            <Loader2 className="animate-spin" /> // Render your loading component here
          ) : (
            <>
              <ImagePlus className="w-5 h-5" /> Replace Image
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </Label>
      </div>
      {uploadedImageUrl ? (
        <Image
          src={uploadedImageUrl}
          height={350}
          width={350}
          alt={title}
          className="rounded-md"
        />
      ) : (
        <Image
          src={thumbnail || "/logos/haddon-institute-logo.jpeg"}
          height={350}
          width={350}
          alt={title}
          className="rounded-md"
        />
      )}
    </div>
  );
}
