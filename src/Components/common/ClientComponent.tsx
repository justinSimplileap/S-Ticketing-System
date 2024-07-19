'use client';

import Sidebar from "@/Components/common/Sidebar";
import PassSidebar from "@/Components/common/PassSidebar";
import SidebarSuperAdmin from "../common/SidebarSuperAdmin";
import TopBar from "./TopBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientComponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [shouldHideSidebar, setShouldHideSidebar] = useState(false);
  const [shouldShowPassSidebar, setShouldShowPassSidebar] = useState(false);
  const [superSidebar, setSuperSidebar] = useState(false);
  const [shouldHideTopBar, setShouldHideTopBar] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Add state for sidebar expansion

  useEffect(() => {
    const noSidebarRoutes = ["/login", "/reset", "/FirstPassword", "/AccountDetails", "/team/Managerlogin", "/Onboard/ManagerOnboard", "/Onboard/ResetPassword"];
    const passSidebarRoutes = ["/FirstPassword", "/AccountDetails", "/Onboard/ResetPassword", "/Onboard/AccountDetails"];
    const superSidebarRoutes = ["/SuperAdmin", "/SuperAdmin/Settings"];
    const noTopBarRoutes = ["/login", "/reset", "/FirstPassword", "/AccountDetails", "/team/Managerlogin", "/Onboard/ManagerOnboard", "/Onboard/ResetPassword"];

    setShouldHideSidebar(noSidebarRoutes.includes(pathname));
    setShouldShowPassSidebar(passSidebarRoutes.includes(pathname));
    setSuperSidebar(superSidebarRoutes.includes(pathname));
    setShouldHideTopBar(noTopBarRoutes.includes(pathname));
  }, [pathname]);

  return (
    <div className="flex h-screen">
      {superSidebar ? (
        <SidebarSuperAdmin />
      ) : shouldShowPassSidebar ? (
        <PassSidebar />
      ) : !shouldHideSidebar ? (
        <Sidebar isExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} /> // Pass the state and setter
      ) : null}
      <div className=" w-full lg:w-[calc(100%_-_20%)] ml-auto">
        {!shouldHideTopBar && <TopBar setIsSidebarExpanded={setIsSidebarExpanded} isSidebarExpanded={isSidebarExpanded} />} {/* Pass state and setter to TopBar */}
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
