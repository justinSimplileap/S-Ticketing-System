"use client";
import React, { useState, useEffect } from 'react';
import bell from "../../../../public/images/bell.svg";
import Image from "next/image";
import Link from "next/link";
import Arrow from "../../../../public/images/Arrow 2.svg";
import TableTwo from "../../../Components/common/TableTwo";
import warning from "../../../../public/images/warning.svg";
import test from "../../../../public/images/test.svg";
import tick from "../../../../public/images/tick.svg";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { base_url } from '@/utils/constant';

type Ticket = {
  id: number;
  user_id: number;
  organization_id: number;
  company_legal_name: string;
  ticket_type: string;
  priority: string;
  status: string;
  subject: string;
  details: string;
  details_images_url: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  actions: string;
};

type User = {
  profile_url: string;
};

const Member: React.FC = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTickets, setNewTickets] = useState<number>(0);
  const [openTickets, setOpenTickets] = useState<number>(0);
  const [closedTickets, setClosedTickets] = useState<number>(0);
  const [highPriorityTickets, setHighPriorityTickets] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    fetchTickets();
    fetchUser();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get<{ tickets: Ticket[] }>(
        `${base_url}/allTicketsTeamMember`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.data.tickets) {
        throw new Error('No tickets found');
      }

      const activeTickets = response.data.tickets.filter(
        (ticket) => ticket.status === 'Open'
      );

      const closedTickets = response.data.tickets.filter(
        (ticket) => ticket.status === 'Closed'
      );

      const highPriorityTickets = response.data.tickets.filter(
        (ticket) => ticket.priority === 'High'
      );

      setOpenTickets(activeTickets.length);
      setNewTickets(response.data.tickets.length);
      setClosedTickets(closedTickets.length);
      setTickets(response.data.tickets);
      setHighPriorityTickets(highPriorityTickets.length);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to fetch tickets');
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get<{ user: User }>(
        `${base_url}/getUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.user.profile_url) {
        setProfilePicture(response.data.user.profile_url);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleCardClick1 = () => {
    router.push('/TeamMember/TicketManagement?priority=High');
  };

  const handleCardClick2 = () => {
    router.push('/TeamMember/TicketManagement?status=Open');
  };

  const handleCardClick3 = () => {
    router.push('/TeamMember/TicketManagement?status=Closed');
  };

  return (
    <div>
      <div className='p-6'>
  <div className="shadow-lg rounded-md">
    <h1 className="p-5 md:p-7 text-[#2A2C3E] text-xl md:text-2xl whitespace-nowrap  text-left md:text-left font-medium">Summary</h1>
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
    <div className="relative bg-[#F7F7F7] md:p-8 rounded-md mb-7 p-5 flex md:block" onClick={handleCardClick1}>
  <div className="md:grid md:grid-cols-2 md:pb-10">
    <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
      <Image src={warning} alt="High Priority Icon" width={30} height={30} className="rounded-full" />
    </div>
    <div className="hidden md:flex justify-end items-end">
      <Image src={Arrow} alt="Arrow" width={30} />
    </div>
  </div>
  <div className="md:pl-5 md:grid gap-3 pl-5 pr-11">
    <div className="text-4xl text-[#5027D9]">{highPriorityTickets}</div>
    <div className="text-[#696969] font-lato font-semibold text-base">High Priority Tickets</div>
  </div>
  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden">
    <Image src={Arrow} alt="Arrow" width={30} />
  </div>
</div>



<div className="relative bg-[#F7F7F7] md:p-8 rounded-md mb-7 p-5 flex md:block" onClick={handleCardClick2}>
        <div className="md:grid md:grid-cols-2 md:pb-10">
          <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
            <Image src={test} alt="Open Tickets Icon" width={30} height={30} className="rounded-full" />
          </div>
          <div className="hidden md:flex justify-end items-end " >
            <Image src={Arrow} alt="Arrow" width={30} />
          </div>
        </div>
        <div className="md:pl-5 md:grid gap-3 pl-5 pr-11">
          <div className="text-4xl text-[#5027D9]">{openTickets}</div>
          <div className="text-[#696969] font-semibold font-lato">Open Tickets</div>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden">
    <Image src={Arrow} alt="Arrow" width={30} />
  </div>
      </div>

      <div className="relative bg-[#F7F7F7] md:p-8 rounded-md mb-7 p-5 flex md:block" onClick={handleCardClick3}>
        <div className="md:grid md:grid-cols-2 md:pb-10">
          <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center ">
            <Image src={tick} alt="Closed Tickets Icon" width={30} height={30} className="rounded-full" />
          </div>
          <div className="hidden md:flex justify-end items-end ">
            <Image src={Arrow} alt="Arrow" width={30} />
          </div>
        </div>
        <div className="pl-5 md:grid gap-3 ">
          <div className="text-4xl text-[#5027D9]">{closedTickets}</div>
          <div className="text-[#696969] font-lato font-semibold">Closed Tickets</div>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden">
    <Image src={Arrow} alt="Arrow" width={30} />
  </div>
      </div>
    </div>
  </div>

</div>
<div className='p-6 '>
<h1 className='md:text-2xl text-md text-[#2A2C3E] whitespace-nowrap font-medium'>Recent Tickets</h1>
</div>

      <div className='p-6'>
        <TableTwo tickets={tickets} />
      </div>
    </div>
  );
};

export default Member;
