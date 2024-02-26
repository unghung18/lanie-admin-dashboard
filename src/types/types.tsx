export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
    title: string;
    menuList: SideNavItem[]
}

export type Sales = {
    _id: string
    title: string
    price: number

    quantity: number
    images: string[]
}

export type Collections = {
    _id: string
    title: string
    description: string
    banner_img: string
}

export type Colors = {
    _id: string
    name: string
    color: number
}

export type addColorProps = {
    name: string;
    color: string;
}

export type addProductProps = {
    title: string;
    description: string;
    sizes: any;
    price: number;
    quantity: number;
    colors: any;
    tags: string[];
    sale: number;
    images: string[];

}

export type loginProps = {
    email: string;
    password: string;
}

export type addCollectionProps = {
    title: string;
    description: string;
    products: any;
    banner_img: string;
    images: string[];

}
