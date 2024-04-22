import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { FormAddColor } from './FormAddColor';
import Breadcumb from '@/components/Breadcumb';

const prevPage = [
    {
        title: "Home",
        href: "/dashboard"
    },
    {
        title: "Color",
        href: "/dashboard/colors"
    }
]

const Page = () => {
    return (
        <>
            <Breadcumb prevPage={prevPage} currentPage='Add Color' />
            <h2 className="text-3xl font-bold tracking-tight my-4">Add a color</h2>
            <Card>
                <CardContent className='py-6 w-full'>
                    <FormAddColor />
                </CardContent>
            </Card>
        </>
    )
}

export default Page