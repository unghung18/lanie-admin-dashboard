'use client'
import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {

    const { toggleCollapse } = useAppSelector((state) => state.toggleCollapse)

    return (
        <div className={`bg-background flex-grow mt-16 px-4 ${toggleCollapse ? "sm:pl-[6.4rem]" : "md:pl-[21rem]"}`}>
            {children}
        </div>
    );
}