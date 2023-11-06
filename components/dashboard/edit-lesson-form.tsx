import { Edit, UploadCloud } from "lucide-react";
import dynamic from "next/dynamic";
import UploadVideo from "../upload-video";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function EditLessonForm({
  blocks,
  slug,
  title,
}: {
  blocks: any;
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
            <UploadVideo slug={slug} />
          </div>
        </div>
      </div>

      <Editor defaultBlocks={blocks} slug={slug} />
    </div>
  );
}
