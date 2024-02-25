import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

import { columns } from './columns';
import { Sales } from "@/types/types";
import { ProductDataTable } from './ProductDataTable';
import { getProducts } from '@/api/lanieApi';

async function getData(): Promise<Sales[]> {

    const res = await getProducts("")
    return res.data

}

const Page = async () => {
    const data = await getData();
    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight my-4">Products</h2>
            <Card>
                <CardContent className='py-6 w-full'>
                    <ProductDataTable data={data} columns={columns} filterBy='title' inputPlaceholder='Filter Product' />
                </CardContent>
            </Card>
        </>
    )
}

export default Page