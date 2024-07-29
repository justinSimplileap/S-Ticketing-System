"use client";

import Sidebar from "@/Components/common/Sidebar";
import PassSidebar from "@/Components/common/PassSidebar";
import SidebarSuperAdmin from "../common/SidebarSuperAdmin";
import TopBar from "./TopBar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [shouldHideSidebar, setShouldHideSidebar] = useState(false);
  const [shouldShowPassSidebar, setShouldShowPassSidebar] = useState(false);
  const [superSidebar, setSuperSidebar] = useState(false);
  const [shouldHideTopBar, setShouldHideTopBar] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Add state for sidebar expansion
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const publicPaths = ["/login"]
    const currentPath = pathname.split('?')[0];

    if (!token && !publicPaths.includes(currentPath)) {
      toast.error("You must be logged in to view this page.");
      router.push('/login');
      return;
    }

    const noSidebarRoutes = [
      "/login",
      "/reset",
      "/FirstPassword",
      "/AccountDetails",
      "/team/Managerlogin",
      "/Onboard/ManagerOnboard",
      "/Onboard/ResetPassword",
    ];
    const passSidebarRoutes = [
      "/FirstPassword",
      "/AccountDetails",
      "/Onboard/ResetPassword",
      "/Onboard/AccountDetails",
    ];
    const superSidebarRoutes = ["/SuperAdmin", "/SuperAdmin/Settings", "/SuperAdmin/TicketManagement"];
    const noTopBarRoutes = [
      "/login",
      "/reset",
      "/FirstPassword",
      "/AccountDetails",
      "/team/Managerlogin",
      "/Onboard/ManagerOnboard",
      "/Onboard/ResetPassword",
    ];

    setShouldHideSidebar(noSidebarRoutes.includes(pathname));
    setShouldShowPassSidebar(passSidebarRoutes.includes(pathname));
    setSuperSidebar(superSidebarRoutes.includes(pathname));
    setShouldHideTopBar(noTopBarRoutes.includes(pathname));
    setIsLoading(false);
  }, [pathname]);

  // return (
  //   <div className="flex h-screen">
  //     {superSidebar ? (
  //       <SidebarSuperAdmin />
  //     ) : shouldShowPassSidebar ? (
  //       <PassSidebar />
  //     ) : !shouldHideSidebar ? ( 
  //       <Sidebar isExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} /> // Pass the state and setter
  //     ) : null}
  //     <div className=" w-full lg:w-[calc(100%_-_20%)] ml-auto">
  //       {!shouldHideTopBar && <TopBar setIsSidebarExpanded={setIsSidebarExpanded} isSidebarExpanded={isSidebarExpanded} />} {/* Pass state and setter to TopBar */}
  //       <main className="overflow-y-auto">{children}</main>
  //     </div>
  //   </div>
  // );

  const sidebarRoutes = [
      "/login",
      "/reset",
      "/AccountDetails",
      "/FirstPassword",
      "/team/Managerlogin",
      "/Onboard/ManagerOnboard",
      "/Onboard/ResetPassword",
      "/SuperAdmin", "/SuperAdmin/Settings", "/SuperAdmin/TicketManagement"
    ];

  const passwordSidebarRoutes = [
    "/FirstPassword",
      "/AccountDetails",
      "/Onboard/ResetPassword",
      "/Onboard/AccountDetails",
  ]

  const superAdminSidebarRoutes = [
    "/SuperAdmin", "/SuperAdmin/Settings", "/SuperAdmin/TicketManagement"
  ]

  const dontShowTopBarRoutes = [
      "/login",
      "/reset",
      "/FirstPassword",
      "/team/Managerlogin",
      "/Onboard/ManagerOnboard",
      "/Onboard/ResetPassword",
  ]
  
   
  const pathName = usePathname();

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex">
      <Toaster />
      {!sidebarRoutes.includes(pathName) && <Sidebar isExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}/>}
      {passwordSidebarRoutes.includes(pathname) && <PassSidebar />}
      {superAdminSidebarRoutes.includes(pathname) && <SidebarSuperAdmin isExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}/>}

      <div className=" w-full  ">
        {!dontShowTopBarRoutes.includes(pathName) && <TopBar setIsSidebarExpanded={setIsSidebarExpanded} isSidebarExpanded={isSidebarExpanded}/>}
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
