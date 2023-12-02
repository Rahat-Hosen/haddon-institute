"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Data = {
  enrollee: string;
  email: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "enrollee",
    header: "Enrollee",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  // {
  //   accessorKey: "purchaseMethod",
  //   header: "Purchase Method",
  // },
];
