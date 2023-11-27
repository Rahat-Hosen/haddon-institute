"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Data = {
  id: string;
  enrollee: string;
  email: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: "User ID",
  },

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
