"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function PublishCourse({
  published,
  course,
}: {
  published: boolean;
  course: any;
}) {
  const router = useRouter();

  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);

  async function onSubmit() {
    const response = await fetch("/api/dashboard/publish-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course: course }),
    });

    if (response.ok) {
      toast({
        title: "Course Published 🎉",
        description: "Course was successfully published!",
      });

      router.refresh();
    } else {
      toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      {published ? (
        <>
          <Button className="flex gap-2 mx-auto" disabled>
            Published
          </Button>
        </>
      ) : (
        <>
          <Button
            className="flex gap-2 mx-auto"
            variant="destructive"
            onClick={() => setShowCreateDialog(true)}
          >
            Unpublished
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Click to publish the course!
          </p>
        </>
      )}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Publish Course</DialogTitle>
            <DialogDescription>
              Are you ready to publish this course? This will allow enrolled
              users to view the course content.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setShowCreateDialog(false); // Close the dialog
                onSubmit(); // Call the onSubmit function
              }}
            >
              Publish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
