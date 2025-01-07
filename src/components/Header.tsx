"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggle } from "@/redux/slices/toggleCollapseSlice";
import { BsList } from "react-icons/bs";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserNav } from "./UserNav";

export default function Header() {
  const { toggleCollapse } = useAppSelector((state) => state.toggleCollapse);
  const dispatch = useAppDispatch();
  return (
    <header
      className={`bg-sidebar fixed w-full !z-[99997] px-4 shadow-sm shadow-slate-500/40 ${
        toggleCollapse ? "sm:pl-[5.6rem]" : "sm:pl-[20rem]"
      }`}
    >
      <div className="h-16 flex items-center justify-between">
        <button
          onClick={() => dispatch(toggle())}
          className="order-2 sm:order-1 shrink-btn float-right bg-sidebar-muted text-sidebar-muted-foreground hover:bg-foreground hover:text-background ml-3 rounded-md w-[30px] h-[30px] flex items-center justify-center shadow-md shadow-black/10  transition duration-300 ease-in-out"
        >
          <BsList />
        </button>

        <div className="flex items-center justify-between sm:order-2 order-1">
          <div className="p-2">
            <ThemeSwitcher />
          </div>
          <div className="h-10 w-10 rounded-full bg-bg-sidebar-muted flex items-center justify-center text-center">
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
