"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./actions";
import { Check, X } from "lucide-react";

export type Data = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "title",
    header: "Lesson",
  },

  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => {
      const published = row.original.published;

      if (published) {
        return <Check className="w-4 h-4" />;
      } else {
        return <X className="w-4 h-4" />;
      }
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const title = row.original.title;
      const slug = row.original.slug;

      return <Actions id={id} title={title} slug={slug} />;
    },
  },
];
