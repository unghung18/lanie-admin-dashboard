"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from "react"

import { toast } from "react-toastify";
import { login } from "@/app/actions"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password at least 6 characters.",
    }),
})

export function FormLogin() {

    const [loading, setLoading] = useState<Boolean>(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "admin@gmail.com",
            password: "admin123"
        },
    })
    const [visible, setVisible] = useState<Boolean>(true);

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        try {
            const res = await login(values);
            if (res.data) {
                if (res.data.role == 'Admin') {
                    Cookies.set("token", res?.data?.accessKey);
                    router.push("/dashboard")
                }
                else {
                    toast.error("Unauthorized", {
                        theme: "colored"
                    })
                }
            }
            else {
                toast.error(res.error.message, {
                    theme: "colored"
                })
            }
        } catch (error) {
            toast.error("Something gone wrong", {
                theme: "colored"
            })
        }

        setLoading(false);
    }

    return (
        <>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center">
                    <div className="px-8 md:px-14">
                        <p className="text-gray-500 font-bold">Testing account: </p>
                        <p className="mb-2 text-gray-500">admin@gmail.com - admin123</p>
                        <h2 className="font-bold text-2xl text-[#63d7b0]">Login</h2>
                        <p className="text-xs mt-4 text-[#63d7b0] mb-5">If you are already a member, easily log in</p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter a username" className="p-2 rounded-xl border w-full focus:outline-[#63d7b0]" autoComplete="off" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input placeholder="Password" className="p-2 rounded-xl border w-full focus:outline-[#63d7b0]" type={visible ? "password" : "text"} autoComplete="off" {...field} />
                                                    <AiFillEyeInvisible className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 cursor-pointer select-none" onClick={() => setVisible(!visible)} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    loading ?
                                        <Button disabled={true}><span className="loader"></span></Button>
                                        :
                                        <Button type="submit" className="bg-[#63d7b0] rounded-xl text-white py-2 hover:scale-105 duration-300">Submit</Button>
                                }
                            </form>
                        </Form>

                        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-400" />
                        </div>

                        <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]" onClick={() => alert("Coming soon")}>
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Login with Google
                        </button>

                        <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#63d7b0]">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}