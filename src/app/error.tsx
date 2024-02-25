'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='w-full h-full'>
            <div className='pt-5'>
                <div className='w-100 text-center flex flex-col items-center justify-center'>
                    <h2 className='mb-1 font-medium text-xl'>Under Maintenance 🛠</h2>
                    <p className='mb-3 font-medium '>Sorry for the inconvenience but we're performing some maintenance at the moment</p>
                    <img className='max-w-[500px]' src="https://images-products.s3.us-east-1.amazonaws.com/images/under-maintenance.svg" alt='Under maintenance page' />
                    <Button
                        onClick={
                            () => reset()
                        }
                    >
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    )
}