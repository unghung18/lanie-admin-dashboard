import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

import { columns } from './columns';
import { Collections } from "@/types/types";
import { CollectionDataTable } from './CollectionDataTable';
import { getCollections } from '@/api/lanieApi';

async function getData(): Promise<Collections[]> {

    const res = await getCollections();
    return res.data
}

const Page = async () => {
    const data = await getData();
    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight my-4">Collection</h2>
            <Card>
                <CardContent className='py-6 w-full'>
                    <CollectionDataTable data={data} columns={columns} filterBy='title' inputPlaceholder='Filter Collection' />
                </CardContent>
            </Card>
        </>
    )
}

export default Page