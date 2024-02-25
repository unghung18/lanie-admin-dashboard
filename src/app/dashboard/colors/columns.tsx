"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Colors } from "@/types/types";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { deleteColor } from "@/app/actions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { toast } from "react-toastify";

async function handleDelete(row: any) {
    const res = await deleteColor(row.row.original._id)
    console.log(res)
    if (res.error) {
        toast.error(res.error.message, {
            theme: "colored"
        })

    }
    else {
        toast.success(res.message, {
            theme: "colored"
        })
    }
}

export const columns: ColumnDef<Colors>[] = [
    {
        accessorKey: "#",
        header: "#",
        cell: ({ row, table }) =>
            (table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "color",
        header: "Color"
    },
    {
        accessorKey: "delete",
        header: "Action",
        cell: (row) => (
            < Dialog >
                <DialogTrigger>
                    <div className="flex items-center space-x-1 h-9 rounded-md px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                        <MdDelete color="#ff7851" />
                        <span>Delete</span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your color
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit" onClick={() => handleDelete(row)}>Confirm</Button >
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        )
    }
]