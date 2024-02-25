'use client'
import { SIDENAV_ITEMS } from '../../constants';
import React, { useEffect, useState } from 'react'
import SidebarMenuGroup from './SidebarMenuGroup';
import { useAppSelector } from '@/redux/hooks';
import { SidebarLogo } from './SidebarLogo';

export const Sidebar = () => {
    const [mounted, setMounted] = useState(false);

    const { toggleCollapse } = useAppSelector((state) => state.toggleCollapse)

    useEffect(() => setMounted(true), []);

    return (
        <aside className={`sidebar !z-[99999] overflow-y-auto overflow-x-auto fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition-all duration-[300] ease-in-out ${toggleCollapse ? "sm:w-[5.4rem] sm:left-0 left-[-100%]" : "w-[20rem]"}`}>
            <div className="sidebar-top relative flex items-center px-3.5 py-5">
                {mounted && <SidebarLogo />}
                <h3 className={`pl-2 font-extrabold text-3xl min-w-max text-sidebar-foreground ${toggleCollapse && "hidden"}`}>
                    Lanie</h3>
            </div>
            <nav className="flex flex-col gap-2 transition-all duration-300 ease-in-out">
                <div className="flex flex-col gap-2 px-4">
                    {SIDENAV_ITEMS.map((item, idx) => {
                        return <SidebarMenuGroup key={idx} menuGroup={item} />;
                    })}
                </div>
            </nav>
        </aside>
    )
}
