"use client"

import * as React from "react"
import {
    ColumnDef
} from "@tanstack/react-table"

import { DataTable } from "./ui/custom/DataTable"

const data: Sales[] = [
    {
        id: "1",
        product: "Măng tô đỏ",
        quantity: 2,
        amount: 55000,
        status: "success",
    },
    {
        id: "2",
        product: "Áo khoác kẻ",
        quantity: 5,
        amount: 35000,
        status: "processing",
    },
    {
        id: "3",
        product: "Áo dài nhung đáp hoa sen",
        quantity: 2,
        amount: 75000,
        status: "success",
    },
    {
        id: "4",
        product: "Đầm nhung đen",
        quantity: 2,
        amount: 155000,
        status: "success",
    },
    {
        id: "5",
        product: "Chân váy xếp li",
        quantity: 2,
        amount: 55000,
        status: "failed",
    },
    {
        id: "6",
        product: "Đầm xuông cổ ngọc",
        quantity: 4,
        amount: 55000,
        status: "success",
    },
    {
        id: "7",
        product: "Măng tô kèm đai",
        quantity: 5,
        amount: 45000,
        status: "processing",
    },
    {
        id: "8",
        product: "Áo len cộc tay",
        quantity: 2,
        amount: 55000,
        status: "success",
    },
    {
        id: "9",
        product: "Áo len cổ bè",
        quantity: 2,
        amount: 10000,
        status: "success",
    },
    {
        id: "10",
        product: "Áo khoác nơ",
        quantity: 2,
        amount: 15000,
        status: "failed",
    }
]

export type Sales = {
    id: string
    product: string
    amount: number
    quantity: number,
    status: "pending" | "processing" | "success" | "failed"

}

export const columns: ColumnDef<Sales>[] = [
    {
        accessorKey: "product",
        header: "Product"
    },
    {
        accessorKey: "amount",
        header: "Amount"
    },
    {
        accessorKey: "quantity",
        header: "Quantity"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
]

const tableSetting = {

}

export function RecentSales() {
    return (
        <div className="w-full">
            <DataTable data={data} columns={columns} pageSize={2} filterBy='product' inputPlaceholder="Filter product" ></DataTable>
        </div>
    )
}
