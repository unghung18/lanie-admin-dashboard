import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-full h-full'>
            <div className='pt-5'>
                <div className='w-100 text-center flex flex-col items-center justify-center'>
                    <h2 className='mb-1 font-medium text-xl'>Under Maintenance 🛠</h2>
                    <p className='mb-3 font-medium '>Sorry for the inconvenience but we're performing some maintenance at the moment</p>
                    <img className='max-w-[500px]' src="https://images-products.s3.us-east-1.amazonaws.com/images/under-maintenance.svg" alt='Under maintenance page' />
                </div>
            </div>
        </div>
    )
}