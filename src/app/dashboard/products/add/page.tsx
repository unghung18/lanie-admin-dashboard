import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { FormAddProduct } from './FormAddProduct';
import Breadcumb from '@/components/Breadcumb';

const prevPage = [
    {
        title: "Home",
        href: "/dashboard"
    },
    {
        title: "Product",
        href: "/dashboard/products"
    }
]

const Page = () => {
    return (
        <>
            <Breadcumb prevPage={prevPage} currentPage='Add Product' />
            <h2 className="text-3xl font-bold tracking-tight my-4">Product Form</h2>
            <Card>
                <CardContent className='py-6 w-full'>
                    <FormAddProduct />
                </CardContent>
            </Card>
        </>
    )
}

export default Page