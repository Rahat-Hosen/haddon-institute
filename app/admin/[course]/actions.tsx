"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MoreHorizontal, Trash, Loader2, Edit, Smile } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function Actions({
  id,
  title,
  slug,
  course,
}: {
  id: string;
  title: string;
  slug: string;
  course: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const isMutating = isLoading || isPending;
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  async function deleteLesson(id: string) {
    const res = await fetch(`/api/missions/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });

    if (!res?.ok) {
      toast({
        title: "Something went wrong.",
        description: `${title} was not deleted. Please try again.`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem>
            <Link
              href={`/admin/edit/${course}/${slug}`}
              className="flex cursor-pointer items-center"
            >
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this lesson?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are deleting {title}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                const deleted = await deleteLesson(id);

                if (deleted) {
                  startTransition(() => {
                    if (pathname.includes(id)) {
                      router.push(`/`);
                    }
                    // Force a cache invalidation.
                    router.refresh();
                  });
                  toast({
                    title: "Lesson deleted.",
                    description: `${title} was successfully deleted.`,
                    variant: "default",
                  });
                }
                setIsLoading(false);
                setShowDeleteAlert(false);
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              {isMutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
