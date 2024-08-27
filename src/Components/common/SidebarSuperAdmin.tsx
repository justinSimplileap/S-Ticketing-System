import logoWhite from "../../../public/images/sidebarLogo.svg";
import Image from "next/image";
import Link from "next/link";
import dashboardGrp from "../../../public/images/dashboardGrp.svg";
import profileGrp from "../../../public/images/profileGrp.svg";
import ticketmanagementgrp from "../../../public/images/ticketManagementGrp.svg";
import logout from "../../../public/images/logoutNew.svg";
import settings from "../../../public/images/Settings.svg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  setIsSidebarExpanded,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setIsSidebarExpanded(false)
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Error in logout");
      console.error("Error in logout:", error);
    }
  };

  const handleLinkClick = () => {
    setIsSidebarExpanded(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 min-h-screen bg-[#2A2C3E] p-8 z-50 transition-transform transform ${
        isExpanded ? "translate-x-0" : "-translate-x-full"
      } w-full lg:w-[15%] lg:translate-x-0 lg:relative lg:min-h-screen`}
    >
      <div className="pb-10">
        <Image src={logoWhite} alt="logo" height={80} width={150} />
      </div>

      <div className="flex flex-col gap-5">
        <div
          onClick={handleLinkClick}
          className="flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center"
        >
          <Image src={dashboardGrp} alt="dashboard" />
          <Link href="/SuperAdmin">Dashboard</Link>
        </div>
        <div
          onClick={handleLinkClick}
          className="flex gap-2 text-white pt-3 pb-3 pl-3 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center"
        >
          <Image src={ticketmanagementgrp} alt="ticket management" />
          <Link href="/SuperAdmin/TicketManagement">Ticket Management</Link>
        </div>
        <div
          onClick={handleLinkClick}
          className="flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center"
        >
          <Image src={settings} alt="settings" />
          <Link href="/SuperAdmin/Settings">Settings</Link>
        </div>
        {/* <div
          onClick={handleLinkClick}
          className="flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center"
        >
          <Image src={profileGrp} alt="profile" />
          <Link href="/SuperAdmin/Profile">Profile</Link>
        </div> */}
        <div
          className="flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center"
        >
          <Image src={logout} alt="logout" width={20} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
