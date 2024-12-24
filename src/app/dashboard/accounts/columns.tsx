"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "#",
    header: "#",
    cell: ({ row, table }) =>
      (table
        .getSortedRowModel()
        ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (row) => (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-300 font-bold text-[#747475]">
          {row.row.original.name
            .split(" ")
            .map((word: any) => word.charAt(0).toUpperCase())
            .join("")}
        </div>
        <span>{row.row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (row) => (
      <span
        className={`${
          row.row.original.role.toUpperCase() === "CLIENT"
            ? "text-[#F58020]"
            : "text-[#00CC6A]"
        }`}
      >
        {row.row.original.role}
      </span>
    ),
  },
];
