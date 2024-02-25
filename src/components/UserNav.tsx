'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect, useRef } from "react";
import { getProfile, updateUser } from "@/api/lanieApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export function UserNav() {
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState<boolean>(false);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const currentUser = useRef({
        _id: "",
        name: "",
        email: "",
        password: "",
        role: ""
    });

    async function getUserData() {
        const res = await getProfile();
        if (res.error) {
            console.log(res.error.message)
        }
        else {
            currentUser.current = res.data
            setUserData(res.data)
        }
    }
    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleSubmit = async () => {
        const res = await updateUser(currentUser.current._id, userData);
        if (res.error) {
            toast.error(res.error.message, {
                theme: "colored"
            })

        }
        else {
            toast.success(res.message, {
                theme: "colored"
            })
            setIsProfileDialogOpen(false);
        }
    }

    const hanleLogOut = () => {

    }

    useEffect(() => {
        getUserData()
    }, [isProfileDialogOpen]);

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full !border-none">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="/avatars/02.png" alt="" />
                            <AvatarFallback>{currentUser.current?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-[99998]">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{currentUser.current?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {currentUser.current?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href="/" onClick={() => Cookies.remove("token")}>Log out</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                                value={userData?.name}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                className="col-span-3"
                                value={userData?.email}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                className="col-span-3"
                                type="password"
                                disabled
                                value={userData?.password}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    );
}
