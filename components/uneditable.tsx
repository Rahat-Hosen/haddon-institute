"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

export default function Uneditable({ blocks }: { blocks: any }) {
  const editor: BlockNoteEditor | null = useBlockNote({
    editable: false,
    initialContent: blocks,
  });

  return <BlockNoteView editor={editor} theme="dark" />;
}

// SHOULD BE REPLACED WITH CONVERTED MARKDOWN ONCE ISSUES ARE FIXED
