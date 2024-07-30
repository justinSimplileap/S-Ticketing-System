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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Add state for sidebar expansion
  const [isLoading, setIsLoading] = useState(true);
  const ResetPathName = window.location.pathname;
  console.log("ResetPathName", ResetPathName);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/login", "/reset", "/ResetPassword/[id]"];
    const currentPath = pathname.split("?")[0];

    if (/^\/ResetPassword\/[^/]+$/.test(window.location.pathname)) {
      router.push(`${ResetPathName}`);
    } else if (!token && !publicPaths.includes(currentPath)) {
      toast.error("You must be logged in to view this page.");
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, [pathname]);

  const sidebarRoutes = [
    "/login",
    "/reset",
    "/AccountDetails",
    "/FirstPassword",
    "/team/Managerlogin",
    "/Onboard/ManagerOnboard",
    "/Onboard/ResetPassword",
    "/SuperAdmin",
    "/SuperAdmin/Settings",
    "/SuperAdmin/TicketManagement",
    "/SuperAdmin/TicketManagement/NewTicket",
    /^\/SuperAdmin\/TicketManagement\/ViewTicket\/[^/]+$/,
    /^\/SuperAdmin\/TicketManagement\/EditTicket\/[^/]+$/,
    /^\/ResetPassword\/[^/]+$/,
  ];

  const passwordSidebarRoutes = [
    "/FirstPassword",
    "/AccountDetails",
    "/Onboard/ResetPassword",
    "/Onboard/AccountDetails",
  ];

  const superAdminSidebarRoutes = [
    "/SuperAdmin",
    "/SuperAdmin/Settings",
    "/SuperAdmin/TicketManagement",
    "/SuperAdmin/TicketManagement/NewTicket",
    /^\/SuperAdmin\/TicketManagement\/ViewTicket\/[^/]+$/,
    /^\/SuperAdmin\/TicketManagement\/EditTicket\/[^/]+$/,

  ];

  const dontShowTopBarRoutes = [
    "/login",
    "/reset",
    "/FirstPassword",
    "/team/Managerlogin",
    "/Onboard/ManagerOnboard",
    "/Onboard/ResetPassword",
    /^\/ResetPassword\/[^/]+$/,
  ];

  const matchesRoute = (routes: any) =>
    routes.some((route: any) =>
      route instanceof RegExp ? route.test(pathname) : route === pathname
    );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex">
      <Toaster />
      {!matchesRoute(sidebarRoutes) && (
        <Sidebar
          isExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      )}
      {matchesRoute(passwordSidebarRoutes) && <PassSidebar />}
      {matchesRoute(superAdminSidebarRoutes) && (
        <SidebarSuperAdmin
          isExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      )}

      <div className="w-full">
        {!matchesRoute(dontShowTopBarRoutes) && (
          <TopBar
            setIsSidebarExpanded={setIsSidebarExpanded}
            isSidebarExpanded={isSidebarExpanded}
          />
        )}
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
