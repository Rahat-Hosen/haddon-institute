"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Data = {
  id: number;
  eventId: number;
  createdAt: Date;
  name: string;
  email: string;
  phone: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "createdAt",
    header: "Registration Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;

      const timezone = "Australia/Brisbane";

      return new Date(date).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: timezone,
      });
    },
  },
];
