"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Collections } from "@/types/types";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { deleteCollection } from "@/app/actions";
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
    const res = await deleteCollection(row.row.original._id)
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

export const columns: ColumnDef<Collections>[] = [
    {
        accessorKey: "#",
        header: "#",
        cell: ({ row, table }) =>
            (table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
    },
    {
        accessorKey: "banner_img",
        header: "Banner",
        cell: (row) => (
            <div>
                <img src={row.row.original.banner_img} alt="banner collection image" className="max-w-[100px]" />
            </div>
        )
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "description",
        header: "Description"
    },
    {
        accessorKey: "edit",
        header: "Action",
        cell: (row) => (
            <Button size={"sm"} className="flex items-center space-x-1">
                <MdEdit color="#fcba03" />
                <span>Edit</span>
            </Button>
        )
    }
    ,
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
                            This action cannot be undone. This will permanently delete your collection
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" onClick={() => handleDelete(row)}>Confirm</Button >
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        )
    }
]