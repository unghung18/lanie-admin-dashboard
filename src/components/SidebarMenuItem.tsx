"use client";
import { useAppSelector } from '@/redux/hooks';
import { SideNavItem } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { BsChevronRight } from 'react-icons/bs';

export const SidebarMenuItem = ({ item }: { item: SideNavItem }) => {

    const { toggleCollapse } = useAppSelector((state) => state.toggleCollapse)
    const pathname = usePathname();

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    return (
        <>
            {item.submenu ? (
                <div className="min-w-[18px]">
                    <a className={`flex items-center min-h-[40px] h-full text-sidebar-foreground py-2 px-4 hover:text-sidebar-muted-foreground  hover:bg-sidebar-muted rounded-md transition duration-200 ${subMenuOpen && "bg-sidebar-muted rounded-b-none"} ${pathname.includes(item.path) ? "active text-sidebar-muted-foreground bg-sidebar-muted" : ''}`}
                        onClick={toggleSubMenu}>
                        {item.icon}
                        {!toggleCollapse && <>
                            <span className='ml-3 text-base leading-6 font-semibold'>{item.title}</span>
                            <BsChevronRight className={`${subMenuOpen ? 'rotate-90' : ''} ml-auto stroke-2 text-xs`} />
                        </>
                        }
                    </a>
                    {subMenuOpen && !toggleCollapse && (
                        <div className='bg-sidebar-muted border-l-4'>
                            <div className='grid gap-y-2 px-10 leading-5 py-3'>
                                {item.subMenuItems?.map((subItem, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={subItem.path}
                                            className={`text-red py-2 px-4 light:hover:text-black hover:text-red-400 transition-all duration-200 rounded-md font-medium ${subItem.path === pathname ? 'text-red-500' : 'text-sidebar-foreground'}`}
                                        >
                                            <span>{subItem.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>)
                    }
                </div>
            ) :
                (<Link href={item.path} className={`flex items-center min-h-[40px] h-full text-sidebar-foreground py-2 px-4 hover:text-sidebar-muted-foreground  hover:bg-sidebar-muted rounded-md transition duration-200 ${item.path === pathname ? "active text-sidebar-muted-foreground bg-sidebar-muted" : ''}`}>
                    {item.icon}
                    {!toggleCollapse && (<span className="ml-3 leading-6 font-semibold">{item.title}</span>)}
                </Link>)}
        </>
    );
};