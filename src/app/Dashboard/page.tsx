"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Bell from "../../../public/images/bell.svg";
import Arrow from "../../../public/images/Arrow 2.svg";
import ButtonPurple from "../../Components/common/ButtonPurple";
import Table from "../../Components/common/Table";
import WarningIcon from "../../../public/images/WarningIcon.svg";
import OpenTickets from "../../../public/images/OpenTickets.svg";
import ClosedTickets from "../../../public/images/closedTicket.svg";
import { useRouter } from "next/navigation";
import { base_url } from "@/utils/constant";
import { Button } from "@headlessui/react";
import Plus from "../../../public/images/Plus.svg"

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
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTickets, setNewTickets] = useState<number>(0);
  const [openTickets, setOpenTickets] = useState<number>(0);
  const [closedTickets, setClosedTickets] = useState<number>(0);
  const [highPriorityTickets, setHighPriorityTickets] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    fetchTickets();
    fetchUser();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get<{ tickets: Ticket[] }>(
        `${base_url}/viewAllTickets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.tickets) {
        throw new Error("No tickets found");
      }

      const activeTickets = response.data.tickets.filter(
        (ticket) => ticket.status === "Open"
      );

      const closedTickets = response.data.tickets.filter(
        (ticket) => ticket.status === "Closed"
      );

      const highPriorityTickets = response.data.tickets.filter(
        (ticket) => ticket.priority === "High"
      );

      setOpenTickets(activeTickets.length);
      setNewTickets(response.data.tickets.length);
      setClosedTickets(closedTickets.length);
      setTickets(response.data.tickets);
      setHighPriorityTickets(highPriorityTickets.length);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to fetch tickets");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get<{ user: User }>(
        `${base_url}/getUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        setProfilePicture(response.data.user.profile_url);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleCardClick1 = () => {
    router.push("/TicketManagement?priority=High");
  };

  const handleCardClick2 = () => {
    router.push("/TicketManagement?status=Open");
  };

  const handleCardClick3 = () => {
    router.push("/TicketManagement?status=Closed");
  };

  const handleButtonClick = () => {
    router.push("/TicketManagement/NewTicket");
  };

  return (
    <div className="">
      <div
        
        className="lg:flex lg:justify-end p-5 lg:p-8"
      >
        <Button className="flex rounded bg-[#5027D9] py-2 px-4 text-sm text-white items-center gap-2 w-full lg:w-max justify-center" onClick={handleButtonClick}>
          <Image src={Plus} alt="add" width={22} height={22} />
          New Ticket
        </Button>
      </div>
      <div className="ml-8 mr-8 shadow-lg rounded-md">
        <h1 className="text-3xl p-7 text-[#2A2C3E]">Summary</h1>
        <div className="grid grid-cols-3 gap-5 mr-7">
          <div
            className="bg-[#F7F7F7] p-8 rounded-md ml-7 mb-7 cursor-pointer"
            onClick={handleCardClick1}
          >
            <div className="grid grid-cols-2 pb-10">
              <div>
                <Image src={WarningIcon} alt="hhh" width={80} />
              </div>
              <div className="flex justify-end items-end">
                <Image src={Arrow} alt="hhh" width={32} />
              </div>
            </div>
            <div className="pl-5 grid gap-3">
              <div className="text-4xl text-[#5027D9]">
                {highPriorityTickets}
              </div>
              <div className="text-[#696969]">High Priority Tickets</div>
            </div>
          </div>

          <div
            className="bg-[#F7F7F7] p-8 rounded-md ml-7 mb-7 cursor-pointer"
            onClick={handleCardClick2}
          >
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

          <div
            className="bg-[#F7F7F7] p-8 rounded-md ml-7 mb-7 cursor-pointer"
            onClick={handleCardClick3}
          >
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
