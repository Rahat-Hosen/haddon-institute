"use client";

import React, { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Loader, SaveIcon } from "lucide-react";

interface EditorProps {
  defaultBlocks: any;
  slug: string;
}

export default function Editor({ defaultBlocks, slug }: EditorProps) {
  const [blocks, setBlocks] = useState(defaultBlocks);
  const [isSaving, setIsSaving] = useState(false); // State for tracking save operation

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const response = await fetch("/api/admin/edit-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          blocks,
        }),
      });

      if (response.ok) {
        toast({
          title: "Lesson Saved!",
          description: "Lesson was saved!",
        });
      }
    } catch (e) {
      toast({
        title: "Something went wrong.",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const editor: BlockNoteEditor | null = useBlockNote({
    editable: true,
    initialContent: blocks,
    uploadFile: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "haddon");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/denivusi1/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      return data.url;
    },
    onEditorContentChange: (editor) => {
      const saveBlocksAsJSON = async () => {
        setBlocks(editor.topLevelBlocks);
      };

      saveBlocksAsJSON();
    },
  });

  return (
    <div className="w-full space-y-4">
      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? (
          <Loader className="animate-spin" size={24} />
        ) : (
          <div className="flex gap-2">
            <SaveIcon /> <p className="my-auto">Save Changes</p>
          </div>
        )}
      </Button>
      <BlockNoteView editor={editor} theme="dark" />
    </div>
  );
}
