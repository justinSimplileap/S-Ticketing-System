"use client";

import Sidebar from "@/Components/common/Sidebar";
import PassSidebar from "@/Components/common/PassSidebar";
import SidebarSuperAdmin from "../common/SidebarSuperAdmin";
import TeamMemberSidebar from "../../Components/common/TeamMemberSidebar";
import ManagerSidebar from "../../Components/common/ManagerSidebar";
import TopBar from "./TopBar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { base_url } from "@/utils/constant";

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Sidebar is collapsed by default
  const [isLoading, setIsLoading] = useState(true);

  const [userRole, setUserRole] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/login", "/reset", "/ResetPassword/[id]"];
    const currentPath = pathname.split("?")[0];

    if (/^\/ResetPassword\/[^/]+$/.test(pathname)) {
      router.push(`${pathname}`);
    } else if (!token && !publicPaths.includes(currentPath)) {
      toast.error("You must be logged in to view this page.");
      router.push("/login");
      return;
    }


    const fetchUser = async () => {
      try {
        const response = await axios.get(`${base_url}/getUserDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          const role = response.data.user.role;
          setUserRole(role);

          if (role === "1") {
            const isAllowed = superAdminSidebarRoutes.some((route) =>
              route instanceof RegExp
                ? route.test(currentPath)
                : route === currentPath
            );

            if (!isAllowed) {
              // toast.error("You do not have access to this page.");
              router.push("/SuperAdmin");
            } else {
              setIsAuthorized(true);
            }
          } else if (role === "3") {
            const isAllowed = TeamMemberSidebarRoutes.some((route) =>
              route instanceof RegExp
                ? route.test(currentPath)
                : route === currentPath
            );

            if (!isAllowed) {
              // toast.error("You do not have access to this page.");
              router.push("/TeamMember/Dashboard");
            } else {
              setIsAuthorized(true);
            }
          } else if (role === "4" || role === "5") {
            const isAllowed = customerRoutes.some((route) =>
              route instanceof RegExp
                ? route.test(currentPath)
                : route === currentPath
            );
            if (!isAllowed) {
              // toast.error("You do not have access to this page.");
              router.push("/Dashboard");
            } else {
              setIsAuthorized(true);
            }
          }
          // else if (role === "4") {
          //   const isAllowed = CustomerSidebarRoutes.some((route) =>
          //     route instanceof RegExp ? route.test(currentPath) : route === currentPath
          //   );

          //   if (!isAllowed) {
          //     toast.error("You do not have access to this page.");
          //     router.push("/Dashboard");
          //   } else {
          //     setIsAuthorized(true);
          //   }
          // }
          else {
            setIsAuthorized(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        // toast.error("Failed to fetch user details");
      }

      setIsLoading(false);
    };

    fetchUser();
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
    "/Onboard/AccountDetails",
    "/TeamMember/Profile",
    "/TeamMember/TicketManagement",
    "/TeamMember/Dashboard",
    /^\/TeamMember\/TicketManagement\/ViewTicket\/[^/]+$/,
    "/Manager/Profile",
    "/Manager/TicketManagement",
    "/Manager/Dashboard",
    /^\/Manager\/TicketManagement\/ViewTicket\/[^/]+$/,
  ];

  const customerRoutes = [
    "/Dashboard",
    "/TicketManagement",
    "/TicketManagement/NewTicket",
    "/AccountDetails",
    /^\/TicketManagement\/ViewTicket\/[^/]+$/,
    /^\/TicketManagement\/EditTicket\/[^/]+$/,
    "/Profile",
  ]

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

  const TeamMemberSidebarRoutes = [
    "/TeamMember/Dashboard",
    "/TeamMember/TicketManagement",
    "/TeamMember/TicketManagement/ViewTicket",
    "/TeamMember/Profile",
    // "/AccountDetails",
    /^\/TeamMember\/TicketManagement\/ViewTicket\/[^/]+$/,
  ];

  const ManagerSidebarRoutes = [
    "/Manager/Dashboard",
    "/Manager/TicketManagement",
    "/Manager/TicketManagement/ViewTicket",
    "/Manager/Profile",
    /^\/Manager\/TicketManagement\/ViewTicket\/[^/]+$/,
  ];

  const ExtraRoutes = [
    "/login",
    "/reset",
    "/AccountDetails",
    "/FirstPassword",
    "/ResetPassword",
     /^\/ResetPassword\/[^/]+$/
  ]

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
      {matchesRoute(passwordSidebarRoutes) && <PassSidebar />}
      {matchesRoute(superAdminSidebarRoutes) && (
        <SidebarSuperAdmin
          isExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      )}
      {matchesRoute(TeamMemberSidebarRoutes) && (
        <TeamMemberSidebar
          isExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      )}
      {matchesRoute(ManagerSidebarRoutes) && (
        <ManagerSidebar
          isExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      )}
      {!matchesRoute(passwordSidebarRoutes) &&
        !matchesRoute(superAdminSidebarRoutes) &&
        !matchesRoute(TeamMemberSidebarRoutes) &&
        !matchesRoute(ManagerSidebarRoutes) && 
        !matchesRoute(ExtraRoutes) &&
        (
          <Sidebar
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
