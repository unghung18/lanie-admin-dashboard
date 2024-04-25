"use client"
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

type prevPageType = {
    title: string;
    href: string;
}

const Breadcumb = ({
    prevPage,
    currentPage
}: {
    prevPage: prevPageType[],
    currentPage: string
}) => {
    return (
        <Breadcrumb className='mt-4'>
            <BreadcrumbList>
                {
                    prevPage.map((item, index) => (
                        <>
                            <BreadcrumbItem key={item.title}>
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>
                                        {item.title}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator key={index} />
                        </>
                    ))
                }
                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb >
    )
}

export default Breadcumb