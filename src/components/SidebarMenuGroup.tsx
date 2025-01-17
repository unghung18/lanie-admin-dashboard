"use client";
import { useAppSelector } from "@/redux/hooks";
import { SideNavItemGroup } from "../types/types";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuGroup = ({ menuGroup }: { menuGroup: SideNavItemGroup }) => {
  const { toggleCollapse } = useAppSelector((state) => state.toggleCollapse);

  return (
    <>
      <>
        <h3
          className={`py-4 tracking-[.1rem] font-medium uppercase text-sm text-[hsl] ${
            toggleCollapse && "text-center"
          } `}
        >
          {!toggleCollapse ? menuGroup.title : "..."}
        </h3>
        {menuGroup.menuList?.map((item, index) => {
          return <SidebarMenuItem key={index} item={item} />;
        })}
      </>
    </>
  );
};

export default SidebarMenuGroup;
