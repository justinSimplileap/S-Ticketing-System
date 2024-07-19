"use client"
import React, { useState, useEffect } from 'react';
import bell from "../../../../public/images/bell.svg"
import user from "../../../../public/images/user.svg"
import Image from "next/image";
import Link from "next/link";
import Icon_Order from "../../../../public/images/Icon_Order.svg";
import Arrow from "../../../../public/images/Arrow 2.svg"
import Rectangle from "../../../../public/images/Rectangle.svg"
import Table from "../../../Components/common/Table"
import group from "../../../../public/images/group.svg"
import warning from "../../../../public/images/warning.svg"
import test from "../../../../public/images/test.svg"
import tick from "../../../../public/images/tick.svg"
import Sidebar from "../../../Components/common/Sidebar"
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';



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

const Manager: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [newTicketsCount, setNewTicketsCount] = useState<number>(0);
    const [highPriorityCount, setHighPriorityCount] = useState<number>(0);
    const [openTicketsCount, setOpenTicketsCount] = useState<number>(0);
    const [closedTicketsCount, setClosedTicketsCount] = useState<number>(0);
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get<{ body: Ticket[] }>('http://localhost:8000/allTickets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const fetchedTickets = response.data.body;
                setTickets(fetchedTickets);

                // Calculate ticket counts
                const counts = fetchedTickets.reduce<{ new: number; highPriority: number; open: number; closed: number }>(
                    (acc, ticket) => {
                        switch (ticket.priority) {
                            case 'High':
                                acc.highPriority++;
                                break;
                            case 'Open':
                                acc.open++;
                                break;
                            case 'Closed':
                                acc.closed++;
                                break;
                            default:
                                acc.new++;
                                break;
                        }
                        return acc;
                    },
                    { new: 0, highPriority: 0, open: 0, closed: 0 }
                );

                // Set counts in state
                setNewTicketsCount(counts.new);
                setHighPriorityCount(counts.highPriority);
                setOpenTicketsCount(counts.open);
                setClosedTicketsCount(counts.closed);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []); 
    

    return (
        <div className=''>
            <div className='flex justify-between p-6 bg-[#FFFFFF] drop-shadow-md'>
                <h1 className="font-medium text-xl font-lato">Dashboard</h1>
                <div className='flex space-x-4'>
                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center">
                        <Image src={bell} alt="Another Icon" width={20} height={20} />
                    </div>
                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center"></div>
                </div>
            </div>
            <div className='p-6'>
                <div className=" shadow-lg rounded-md">
                    <h1 className=" p-7 text-[#2A2C3E] text-2xl font-bold font-lato">Summary</h1>
                    <div className="grid grid-cols-4 gap-4 pl-5 pr-5">
                        <div className="bg-[#F7F7F7] p-8  rounded-md  mb-7">
                            <div className="grid grid-cols-2 pb-10">
                                <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={group} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={30} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">{newTicketsCount}</div>
                                <div className="text-[#696969] font-semibold font-Lato">New Tickets</div>
                            </div>
                        </div>

                        <div className="bg-[#F7F7F7] p-8 rounded-md mb-7">
                            <div className="grid grid-cols-2 pb-10">
                                <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={warning} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={30} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">{highPriorityCount}</div>
                                <div className="text-[#696969] font-lato font-semibold text-base">High Priority Tickets</div>
                            </div>
                        </div>
                        <div className="bg-[#F7F7F7] p-8 rounded-md  mb-7">
                            <div className="grid grid-cols-2 pb-10">
                                <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={test} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={30} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">{openTicketsCount}</div>
                                <div className="text-[#696969] font-semibold font-lato">Open tickets</div>
                            </div>
                        </div>

                        <div className="bg-[#F7F7F7] p-8 rounded-md  mb-7">
                            <div className="grid grid-cols-2 pb-10">
                                <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={tick} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={30} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">{closedTicketsCount}</div>
                                <div className="text-[#696969] font-lato font-semibold">Closed tickets</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-6'>
                <div className='bg-[#FFFFFF] shadow-md w-1/2 p-3 rounded-lg font-bold'>
                    <h1>Pinned Tickets</h1>
                    <div className='mt-2 '><Image src={Rectangle} alt="notify" /></div>
                </div>
            </div>
            <div className='p-6'>
                <Table tickets={tickets} />
            </div>

        </div>
    );
};

export default Manager;
