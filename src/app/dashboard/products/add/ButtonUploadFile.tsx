"use client"
import React, { useState, useEffect } from 'react'
import { CldUploadWidget } from "next-cloudinary"
import { Button } from '@/components/ui/button'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CardContent, Card } from '@/components/ui/card';

interface ImagesDataProps {
    filename: string;
    image: string;
}

const ButtonUploadFile = () => {

    const [imagesData, setImagesData] = useState<Array<ImagesDataProps>>([]);

    const onupload = (result: any) => {

        console.log(result)

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

    useEffect(() => {
        console.log(imagesData);
    }, [imagesData]);

    return (
        <Card>
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
    )
}

export default ButtonUploadFile