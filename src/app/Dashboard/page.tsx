"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import Bell from '../../../public/images/bell.svg';
import Arrow from '../../../public/images/Arrow 2.svg';
import ButtonPurple from '../../Components/common/ButtonPurple';
import Table from '../../Components/common/Table';
import WarningIcon from "../../../public/images/WarningIcon.svg"
import OpenTickets from "../../../public/images/OpenTickets.svg"
import ClosedTickets from "../../../public/images/closedTicket.svg"


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

const DashboardPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTickets, setNewTickets] = useState<number>(0);
  const [openTickets, setOpenTickets] = useState<number>(0);
  const [closedTickets, setClosedTickets] = useState<number>(0);
  const [highPriorityTickets, setHighPriorityTickets] = useState<number>(0)
  const [profilePicture, setProfilePicture] = useState('')

  useEffect(() => {
    fetchTickets();
    fetchUser();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get<{ tickets: Ticket[] }>(
        'http://localhost:8000/viewAllTickets',
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
        (ticket) => ticket.status === 'Active'
      );

      const closedTickets = response.data.tickets.filter(
        (ticket) => ticket.status === 'Closed'
      )

      const highPriorityTickets = response.data.tickets.filter(
        (ticket) => ticket.priority === 'High'
      )

      setOpenTickets(activeTickets.length);
      setNewTickets(response.data.tickets.length);
      setClosedTickets(closedTickets.length)
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
        'http://localhost:8000/getUserDetails',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if(response){
        setProfilePicture(response.data.user.profile_url)
      }
      
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center shadow-md p-8 sticky top-0 z-50 bg-white">
        <div className="text-[#17192b] text-xl">Dashboard</div>
        <div className="flex gap-4 justify-center items-center">
          <div>
            <Image src={Bell} alt="hhh" width={25} />
          </div>
          <div>
            <Image src={profilePicture} alt="hhh" width={50} height={50} className='bg-gray-500'/>
          </div>
        </div>
      </div>
      <div>
        <Link href="/TicketManagement/NewTicket">
          <ButtonPurple />
        </Link>
      </div>
      <div className="ml-8 mr-8 shadow-lg rounded-md">
        <h1 className="text-3xl p-7 text-[#2A2C3E]">Summary</h1>
        <div className="grid grid-cols-3 gap-5 mr-7">
          <div className="bg-[#F7F7F7] p-8 rounded-md ml-7 mb-7">
            <div className="grid grid-cols-2 pb-10">
              <div >
                <Image src={WarningIcon} alt="hhh" width={80} />
              </div>
              <div className="flex justify-end items-end">
                <Image src={Arrow} alt="hhh" width={32} />
              </div>
            </div>
            <div className="pl-5 grid gap-3">
              <div className="text-4xl text-[#5027D9]">{highPriorityTickets}</div>
              <div className="text-[#696969]">High Priority Tickets</div>
            </div>
          </div>

          <div className="bg-[#F7F7F7] p-8 rounded-md ml-7 mb-7">
            <div className="grid grid-cols-2 pb-10">
              <div>
                <Image src={OpenTickets} alt="hhh" width={80} />
              </div>
              <div className="flex justify-end items-end">
                <Image src={Arrow} alt="hhh" width={32} />
              </div>
            </div>
            <div className="pl-5 grid gap-3">
              <div className="text-4xl text-[#5027D9]">{openTickets}</div>
              <div className="text-[#696969]">Open tickets</div>
            </div>
          </div>

          <div className="bg-[#F7F7F7] p-8 rounded-md ml-7 mb-7">
            <div className="grid grid-cols-2 pb-10">
              <div>
                <Image src={ClosedTickets} alt="hhh" width={80} />
              </div>
              <div className="flex justify-end items-end">
                <Image src={Arrow} alt="hhh" width={32} />
              </div>
            </div>
            <div className="pl-5 grid gap-3">
              <div className="text-4xl text-[#5027D9]">{closedTickets}</div>
              <div className="text-[#696969]">Closed tickets</div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-8 flex flex-col gap-5">
        <div className="flex p-7 justify-between">
          <div className="text-3xl text-[#2A2C3E]">Recent Tickets</div>
          <div className="text-2xl text-[#696969] flex gap-3 justify-center items-center">
            <div>
              <Link href="/TicketManagement">View All Tickets </Link>
            </div>
            <div>
              <Link href="#">
                <Image src={Arrow} alt="hhh" width={28} />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Table tickets={tickets} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
