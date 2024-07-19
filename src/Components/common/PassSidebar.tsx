"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import logoWhite from "../../../public/images/sidebarLogo.svg";
// import dashboardGrp from '../../../public/images/dashboardGrp.svg';
// import profileGrp from '../../../public/images/profileGrp.svg';
// import ticketmanagementgrp from '../../../public/images/ticketManagementGrp.svg';
import circle from "../../../public/images/circle.svg";
import Ellipse from "../../../public/images/Ellipse.svg";
import { useEffect, useState } from "react";
const PassSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component is mounted on client side
    return () => {
      setIsMounted(false); // Component is unmounted
    };
  }, []);

    const passSidebarRoutes = ['/FirstPassword', '/AccountDetails',"/Onboard/ResetPassword","/Onboard/AccountDetails"];

  if (!isMounted) {
    return null; // Render nothing until component is mounted on client side
  }

  // Define the paths where you want to show PassSidebar

  return (
    <div className=" hidden lg:flex lg:flex-col gap-10 w-[20%] bg-[#2A2C3E] h-screen p-8 m-auto ">
      <div className="flex justify-center items-center p-5">
        <Image src={logoWhite} alt="logo" height={80} width={150} />
      </div>

      <div className="flex flex-col gap-5">
        {passSidebarRoutes.includes(pathname) && (
          <>
            {/* <div className="flex gap-3 text-white pt-3 pb-3 pl-4 w-[90%] rounded-md hover:bg-[#5027D9]">
              <Image src={circle} alt="reset password" />
              <Link href="/FirstPassword">Reset Password</Link>
            </div>
            <div className="flex gap-3 text-white pt-3 pb-3 pl-4 w-[90%] rounded-md hover:bg-[#5027D9]">
              <Image src={circle} alt="change password" />
              <Link href="/AccountDetails">Enter Account details</Link>
            </div> */}
            <div className="flex justify-center items-center mt-8">
              <ul className="list-none relative">
                <li className="relative pl-6 mb-6">
                  <span className="absolute left-2 top-4 w-0.5 h-12 bg-white"></span>
                  <span className="absolute left-1 top-3 w-3 h-3 rounded-full bg-[#FF00D6]"></span>
                  <Link href="/FirstPassword"><div className="text-white pt-1 pl-2">Reset Password</div></Link>
                </li>
                <li className="relative pl-6 mb-6">
                  <span className="absolute left-2 top-0 w-0.5 h-8 bg-white"></span>
                  <span className="absolute left-1 top-5 w-3 h-3 rounded-full bg-[#FF00D6]"></span>
                  <Link href="/AccountDetails"><div className="text-white pt-3 pl-2">Enter Account Details</div></Link>
                  
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PassSidebar;
