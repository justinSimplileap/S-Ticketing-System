import logoWhite from '../../../public/images/sidebarLogo.svg'
import Image from 'next/image';
import Link from 'next/link';
import dashboardGrp from '../../../public/images/dashboardGrp.svg'
import profileGrp from '../../../public/images/profileGrp.svg'
import ticketmanagementgrp from '../../../public/images/ticketManagementGrp.svg'
import { useRouter } from 'next/router';

// const router = useRouter()
const Sidebar = () => {

    
    return (
        <div className="flex flex-col gap-10 w-[20%] bg-[#2A2C3E] h-screen p-8 m-auto">
            <div className='flex justify-center items-center'>
                <Image 
                    src={logoWhite}
                    alt="logo"
                    height={80}
                    width={150}
                />

            </div>

            <div className='flex flex-col gap-5'>
                <div className='flex gap-3 text-white pt-3 pb-3 pl-4 w-[90%] rounded-md hover:bg-[#5027D9]'><Image src={dashboardGrp} alt="dashboard"/><Link href="/SuperAdmin">Dashboard</Link></div>
                <div className='flex gap-3 text-white pt-3 pb-3 pl-3 w-[90%] rounded-md hover:bg-[#5027D9]'><Image src={ticketmanagementgrp} alt="dashboard"/><Link href="/TicketManagement">Ticket Management</Link></div>
                <div className='flex gap-3 text-white pt-3 pb-3 pl-3 w-[90%] rounded-md hover:bg-[#5027D9]'><Image src={ticketmanagementgrp} alt="dashboard"/><Link href="/SuperAdmin/Settings">Settings</Link></div>
                <div className='flex gap-3 text-white pt-3 pb-3 pl-4 w-[90%] rounded-md hover:bg-[#5027D9]'><Image src={profileGrp} alt="dashboard"/><Link href="/Profile">Profile</Link></div>

            </div>
        </div>
    )
}

export default Sidebar;