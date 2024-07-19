import logoWhite from '../../../public/images/sidebarLogo.svg'
import Image from 'next/image';
import Link from 'next/link';
import dashboardGrp from '../../../public/images/dashboardGrp.svg'
import profileGrp from '../../../public/images/profileGrp.svg'
import ticketmanagementgrp from '../../../public/images/ticketManagementGrp.svg'
import logout from "../../../public/images/logoutNew.svg"
// import { useRouter } from 'next/router';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';


interface SidebarProps {
    isExpanded: boolean;
    setIsSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  }
// const router = useRouter()
const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsSidebarExpanded }) => {

    const router = useRouter()

    const handleLogout = async () => {
        try {
          
            localStorage.removeItem('token'); 
            
            
    
            // Notify the user of successful logout
            toast.success("Logged out successfully");

            router.push("/login")
        } catch (error) {
            // Handle error
            toast.error("Error in logout");
            console.error("Error in logout:", error);
        }
    }

    
    return (
        <div className="flex flex-col gap-10 w-[15%] bg-[#2A2C3E] h-screen p-8">
            <div className='flex justify-start'>
                <Image 
                    src={logoWhite}
                    alt="logo"
                    height={80}
                    width={150}
                />

            </div>

            <div className='flex flex-col gap-5'>
                <div className='flex gap-3 text-white pt-3 pb-3 pl-4 pr-4  rounded-md hover:bg-[#5027D9] text-sm items-center'><Image src={dashboardGrp} alt="dashboard"/><Link href="/Dashboard">Dashboard</Link></div>
                <div className='flex gap-2 text-white pt-3 pb-3 pl-3 pr-4  rounded-md hover:bg-[#5027D9] text-sm items-center'><Image src={ticketmanagementgrp} alt="dashboard"/><Link href="/TicketManagement">Ticket Management</Link></div>
                <div className='flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-[16px]items-center text-sm items-center'><Image src={profileGrp} alt="dashboard"/><Link href="/Profile">Profile</Link></div>
                <div className='flex gap-3 text-white pt-3 pb-3 pl-4 pr-4 rounded-md hover:bg-[#5027D9] text-sm items-center '>
                    <Image src={logout} alt='logout' width={20}/>
                    <button onClick={handleLogout}>Logout</button>
                </div>

            </div>
            {/* <div className='h-full items-center inline'>
                <button onClick={handleLogout}>
                    <Image src={logout} alt='arrow'/><span>Logout</span>
                </button>
            </div> */}
        </div>

  );
};

export default Sidebar;
