import { BsHouseDoor, BsKanban, BsListUl, BsEnvelope, BsGear, BsQuestionCircle } from "react-icons/bs";
import { MdCollections } from "react-icons/md";
import { SideNavItemGroup } from './src/types/types'

export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [{
            title: 'Dashboard',
            path: '/dashboard',
            icon: <BsHouseDoor size={20} />,
        }]
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Products',
                path: '/dashboard/products',
                icon: <BsKanban size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'All', path: '/dashboard/products' },
                    { title: 'Color', path: '/dashboard/colors' },
                ],
            },
            {
                title: 'Collections',
                path: '/dashboard/collections',
                icon: <MdCollections size={20} />,
            },
            {
                title: 'Orders',
                path: '/dashboard/orders',
                icon: <BsListUl size={20} />,
            },
            {
                title: 'Feedbacks',
                path: '/feedbacks',
                icon: <BsEnvelope size={20} />,
            }
        ]
    },
    {
        title: "Others",
        menuList: [
            {
                title: 'Account',
                path: '/account',
                icon: <BsGear size={20} />,
            },
            {
                title: 'Help',
                path: '/help',
                icon: <BsQuestionCircle size={20} />,
            }
        ]
    }
]