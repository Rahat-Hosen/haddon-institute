import Player from "@/components/player";
import prisma from "@/lib/prisma";
import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";

export default async function Lessons({
  params,
}: {
  params: { lesson: string };
}) {
  const slug = params.lesson;

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
  });

  if (!lesson) {
    redirect("/404");
  }

  return (
    <div className="w-full">
      <Player playbackId={lesson.video} />
      <article className="prose prose-muted dark:prose-invert w-full mx-auto prose-img:shadow-2xl prose-img:rounded-md prose-img:mx-auto dark:prose-p:text-white prose-p:text-black">
        <MDXRemote source={lesson.content} />
      </article>
    </div>
  );
}
