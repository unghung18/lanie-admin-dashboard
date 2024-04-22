import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

import { columns } from './columns';
import { Sales } from "@/types/types";
import { ProductDataTable } from './ProductDataTable';
import { getProducts } from '@/api/lanieApi';
import Breadcumb from '@/components/Breadcumb';

async function getData(): Promise<Sales[]> {

    const res = await getProducts("")
    return res.data
}

const prevPage = [
    {
        title: "Dashboard",
        href: "/dashboard"
    }
]

const Page = async () => {
    const data = await getData();
    return (
        <>
            <Breadcumb prevPage={prevPage} currentPage='Product' />

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