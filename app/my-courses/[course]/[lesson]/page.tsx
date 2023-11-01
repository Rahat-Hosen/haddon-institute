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
    <div className="space-y-8">
      {lesson.video ? <Player playbackId={lesson.video} /> : null}
      {lesson.blocks ? <Uneditable blocks={lesson.blocks} /> : null}
    </div>
  );
}
