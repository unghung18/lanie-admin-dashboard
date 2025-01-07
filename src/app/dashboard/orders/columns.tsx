"use client";

import { ColumnDef } from "@tanstack/react-table";

const colorText = (text: string) => {
  if (text === "PENDING") {
    return (
      <div className="text-[#F89E19] font-semibold px-4 py-2 rounded-lg bg-[#f7e5cb] min-w-[80px] text-center">
        Pending
      </div>
    );
  } else if (text === "PROCESSING") {
    return (
      <div className="text-[#0078D4] font-semibold px-4 py-2 rounded-lg bg-[#95d1ff] min-w-[80px] text-center">
        Processing
      </div>
    );
  } else if (text === "COMPLETED") {
    return (
      <div className="text-[#00CC6A] font-semibold px-4 py-2 rounded-lg bg-[#a1ffd2] min-w-[80px] text-center">
        Completed
      </div>
    );
  } else if (text === "CANCELLED") {
    return (
      <div className="text-[#FF0000] font-semibold px-4 py-2 rounded-lg bg-[#ffa7a7] min-w-[80px] text-center">
        Cancelled
      </div>
    );
  } else {
    return null;
  }
};

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
    accessorKey: "_id",
    header: "Order ID",
  },
  {
    accessorKey: "shipping_address",
    header: "Address",
  },
  {
    accessorKey: "order_date",
    header: "Order Date",
  },
  {
    accessorKey: "total_amount",
    header: "Price",
    cell: (row) => `${row.row.original.total_amount.toLocaleString()}₫`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => colorText(row.row.original.status),
  },
];
