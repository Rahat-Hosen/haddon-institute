import { Edit, UploadCloud } from "lucide-react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function EditLessonForm({
  blocks,
  markdown,
  slug,
  title,
}: {
  blocks: any;
  markdown: any;
  slug: any;
  title: any;
}) {
  return (
    <div className="w-full space-y-8">
      <h1 className="font-bold text-2xl flex gap-2">
        <Edit className="my-auto" />
        {title}
      </h1>
      <div className="w-full border aspect-video">
        <div className="flex items-center justify-center h-full">
          <div>
            <h1 className="font-bold text-lg flex gap-2">
              <UploadCloud className="my-auto" /> Upload Video
            </h1>
            <p className="text-center text-sm text-muted-foreground">
              This is optional.
            </p>
          </div>
        </div>
      </div>

      <Editor defaultBlocks={blocks} defaultMarkdown={markdown} slug={slug} />
    </div>
  );
}
