import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { FormEditProduct } from './FormEditProduct';
import { Sales, addProductProps } from "@/types/types";
import { getOneProduct } from '@/api/lanieApi';


const Page = async ({ params }: {
    params: {
        id: string
    }
}) => {

    async function getData(): Promise<addProductProps> {

        const res = await getOneProduct(params.id)
        return res.data
    }

    const data = await getData();

    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight my-4">Edit Product</h2>
            <Card>
                <CardContent className='py-6 w-full'>
                    <FormEditProduct data={data} id={params.id} />
                </CardContent>
            </Card>
        </>
    )
}

export default Page