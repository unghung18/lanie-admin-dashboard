import React from 'react';
import { Card, CardContent } from '@/components/ui/card'
import { FormAddColor } from './FormAddColor';


const Page = () => {
    return (
        <>
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