import Player from "@/components/player";
import dynamic from "next/dynamic";

const Uneditable = dynamic(() => import("@/components/uneditable"), {
  ssr: false,
});

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Lessons({
  params,
}: {
  params: { lesson: string };
}) {
  const slug = params.lesson;

  const lesson = await prisma.lesson.findUnique({
    where: {
      slug: slug,
      published: true,
    },
  });

  if (!lesson) {
    redirect("/404");
  }

  return (
    <div className="space-y-8 w-full">
      <div className="rounded-2xl h-full w-full">
        {lesson.video ? (
          <div className="w-full h-full rounded-2xl gap-4 overflow-hidden aspect-video shadow-2xl">
            <div className="rounded-2xl">
              <Player playbackId={lesson.video} />
            </div>
          </div>
        ) : null}
      </div>

      {lesson.blocks && lesson.blocks.length > 0 ? (
        <Uneditable blocks={lesson.blocks} />
      ) : (
        <div>
          <h1 className="font-semibold text-xl text-center">
            No Content Available
          </h1>
          <p className="text-center text-muted-foreground">
            No content here yet! Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
