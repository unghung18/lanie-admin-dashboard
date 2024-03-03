"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CardContent, Card } from '@/components/ui/card';
import { addCollection, } from "@/app/actions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ProductSelect from "./ProductSelect"

const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    products: z.any(),
    banner_img: z.string(),
})

interface ImagesDataProps {
    filename: string;
    image: string;
}


export function FormCollection() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            products: [],
            banner_img: "",
        },
    })

    const [isMounted, setIsMounted] = useState(false);
    const [imagesData, setImagesData] = useState<Array<ImagesDataProps>>([]);
    const [loading, setLoading] = useState<Boolean>(false);

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        const collectionImages = imagesData.map((item: any) => (
            `${item.image}`
        ))

        const productData = values.products.map((item: any) => (
            `${item._id}`
        ))

        const newData = {
            title: values?.title,
            description: values?.description,
            banner_img: values.banner_img,
            products: productData,
            images: collectionImages
        }

        const res = await addCollection(newData)
        if (res.error) {
            toast.error(res.error.message, {
                theme: "colored"
            })

        }
        else {
            toast.success(res.message, {
                theme: "colored"
            })
            router.push("/dashboard/collections")
            form.reset();
        }
        setLoading(false);
    }
    const onupload = (result: any) => {
        const image = imagesData
        image.push({
            filename: result.info.original_filename + "." + result.info.format,
            image: result.info.secure_url
        })
        setImagesData([...image])
    }

    const handleDeleteFile = (i: ImagesDataProps) => {
        const image = imagesData
        const filteredItems = image.filter(item => item !== i)
        setImagesData([...filteredItems])
    }

    useEffect(() => setIsMounted(true), []);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg: WINTER MEMORIES" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg: Cơn gió lạnh bất chợt về ..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="products"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Products</FormLabel>
                                    <FormControl>
                                        {isMounted && <ProductSelect field={field} />}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="banner_img"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Banner</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg: http:// ..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Card>
                        <FormLabel className="ml-4">Images</FormLabel>
                        <CardContent className='py-6 w-full'>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                                <CldUploadWidget uploadPreset='ze0kziqp' onUpload={onupload}>
                                    {({ open }: { open: any }) => {
                                        function handleOnclick(e: React.MouseEvent<HTMLElement>) {
                                            e.preventDefault()
                                            open()
                                        }
                                        return (
                                            <div className='flex items-center justify-center border-[2px] border-gray-400 border-dashed w-full h-full min-h-[100px]'>
                                                <Button variant={"destructive"} onClick={handleOnclick} className='max-w-[200px]'>
                                                    <FaCloudUploadAlt size={20} className='mr-1' /><span>Upload file</span>
                                                </Button>
                                            </div>
                                        )
                                    }}
                                </CldUploadWidget>
                                <div className="h-[300px] overflow-auto space-y-4">
                                    {imagesData?.map((image: any, i: number) => (
                                        <div key={i} className="grid grid-cols-3 items-center gap-2 rounded-[5px] overflow-hidden border-[1px] border-gray-300">
                                            <img src={image.image} alt="product image" className='w-[50px] md:w-[70px]' />
                                            <span className='flex-1'>{image.filename.charAt(0).toUpperCase() + image.filename.slice(1)}</span>
                                            <div className='w-[30px] h-[30px] flex justify-center items-center border-[2px] border-gray-400 mr-2 rounded-sm' onClick={() => handleDeleteFile(image)}>
                                                <MdDelete size={20} color='' className='cursor-pointer text-red-500' />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    {
                        loading ?
                            <Button disabled={true}><span className="loader"></span></Button>
                            :
                            <Button type="submit">Submit</Button>
                    }
                </form>
            </Form>
        </>
    )
}