import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { FormCollection } from './FormCollection';


const Page = () => {
    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight my-4">Collection Form</h2>
            <Card>
                <CardContent className='py-6 w-full'>
                    <FormCollection />
                </CardContent>
            </Card>
        </>
    )
}

export default Page