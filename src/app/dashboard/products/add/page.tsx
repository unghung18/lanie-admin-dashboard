import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { FormAddProduct } from './FormAddProduct';


const Page = () => {
    return (
        <>
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