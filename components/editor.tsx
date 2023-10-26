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
  defaultMarkdown: string;
  slug: string;
}

export default function Editor({
  defaultBlocks,
  defaultMarkdown,
  slug,
}: EditorProps) {
  const [blocks, setBlocks] = useState(defaultBlocks);
  const [markdown, setMarkdown] = useState<string>(defaultMarkdown);
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
          markdown,
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
    onEditorContentChange: (editor) => {
      const saveBlocksAsMarkdown = async () => {
        const newMarkdown: string = await editor.blocksToMarkdown(
          editor.topLevelBlocks,
        );
        setMarkdown(newMarkdown);
      };

      const saveBlocksAsJSON = async () => {
        setBlocks(editor.topLevelBlocks);
      };

      saveBlocksAsMarkdown();
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
