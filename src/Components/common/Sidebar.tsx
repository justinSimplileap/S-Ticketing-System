import Image from "next/image";
import Link from "next/link";
import logoWhite from "../../../public/images/sidebarLogo.svg";
import dashboardGrp from "../../../public/images/dashboardGrp.svg";
import profileGrp from "../../../public/images/profileGrp.svg";
import ticketManagementGrp from "../../../public/images/ticketManagementGrp.svg";
import logout from "../../../public/images/logoutNew.svg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SidebarProps {
  isExpanded: boolean;
  setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  setIsSidebarExpanded,
}) => {

  const router = useRouter();

  // useEffect(() => {
  //   localStorage.setItem("isSidebarExpanded", JSON.stringify(isExpanded));
  // }, [isExpanded]);

  const handleLogout = async () => {
    try {

      localStorage.removeItem("token");
      // localStorage.setItem("isSidebarExpanded", JSON.stringify(false));
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
      } w-full lg:translate-x-0 lg:relative lg:w-[15%]`}
    >
      <div className="pb-10">
        <Image src={logoWhite} alt="logo" height={80} width={150} />
      </div>
      <div className="flex flex-col gap-5">
      <Link href="/Dashboard" onClick={handleLinkClick}><div className="flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center">
          <Image src={dashboardGrp} alt="dashboard" />
          <Link href="/Dashboard" onClick={handleLinkClick}>Dashboard</Link>
        </div></Link>
        <Link href="/TicketManagement" onClick={handleLinkClick}><div className="flex gap-2 text-white pt-3 pb-3 pl-3 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center">
          <Image src={ticketManagementGrp} alt="Ticket Management" />
          <Link href="/TicketManagement" onClick={handleLinkClick}>Ticket Management</Link>
        </div></Link>
        <Link href="/Profile" onClick={handleLinkClick}><div className="flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center">
          <Image src={profileGrp} alt="profile" />
          <Link href="/Profile" onClick={handleLinkClick}>Profile</Link>
        </div></Link>
        <div className="flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center cursor-pointer" onClick={handleLogout}>
          <Image src={logout} alt="logout" width={20} />
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
