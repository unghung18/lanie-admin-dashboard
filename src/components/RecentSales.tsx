"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "./ui/custom/DataTable";

const data: Sales[] = [
  {
    id: "1",
    product: "Đầm Hông Cổ Bè",
    quantity: 1,
    amount: 700000,
    status: "SUCCESS",
  },
  {
    id: "2",
    product: "Sơ Mi Hoa",
    quantity: 1,
    amount: 399000,
    status: "SUCCESS",
  },
  {
    id: "3",
    product: "Áo dài nhung đáp hoa sen",
    quantity: 2,
    amount: 75000,
    status: "SUCCESS",
  },
  {
    id: "4",
    product: "Đầm nhung đen",
    quantity: 2,
    amount: 155000,
    status: "SUCCESS",
  },
  {
    id: "5",
    product: "Chân váy xếp li",
    quantity: 2,
    amount: 55000,
    status: "SUCCESS",
  },
  {
    id: "6",
    product: "Đầm xuông cổ ngọc",
    quantity: 4,
    amount: 55000,
    status: "SUCCESS",
  },
  {
    id: "7",
    product: "Măng tô kèm đai",
    quantity: 5,
    amount: 45000,
    status: "SUCCESS",
  },
  {
    id: "8",
    product: "Áo len cộc tay",
    quantity: 2,
    amount: 55000,
    status: "SUCCESS",
  },
  {
    id: "9",
    product: "Áo len cổ bè",
    quantity: 2,
    amount: 10000,
    status: "SUCCESS",
  },
  {
    id: "10",
    product: "Áo khoác nơ",
    quantity: 2,
    amount: 15000,
    status: "SUCCESS",
  },
];

export type Sales = {
  id: string;
  product: string;
  amount: number;
  quantity: number;
  status: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED";
};

export const columns: ColumnDef<Sales>[] = [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (row) => row.row.original.amount.toLocaleString() + "₫",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

const tableSetting = {};

export function RecentSales() {
  return (
    <div className="w-full">
      <DataTable
        data={data}
        columns={columns}
        pageSize={2}
        filterBy="product"
        inputPlaceholder="Filter product"
      ></DataTable>
    </div>
  );
}
