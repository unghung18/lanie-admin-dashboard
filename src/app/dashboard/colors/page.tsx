import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

import { columns } from './columns';
import { Colors } from "@/types/types";
import { ColorDataTable } from './ColorDataTable';
import { getColors } from '@/api/lanieApi';
import Breadcumb from '@/components/Breadcumb';

async function getData(): Promise<Colors[]> {
    // Fetch data from your API here.

    const res = await getColors("");
    return res.data
}

const prevPage = [
    {
        title: "Home",
        href: "/dashboard"
    }
]

const Page = async () => {
    const data = await getData();
    return (
        <>
            <Breadcumb prevPage={prevPage} currentPage='Color' />
            <h2 className="text-3xl font-bold tracking-tight my-4">Colors</h2>
            <Card>
                <CardContent className='py-6 w-full'>
                    <ColorDataTable data={data} columns={columns} filterBy='name' inputPlaceholder='Filter Color' />
                </CardContent>
            </Card>
        </>
    )
}

export default Page