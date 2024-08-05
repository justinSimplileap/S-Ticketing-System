"use client";

import Image from "next/image";
import Arrow from "../../../public/images/Arrow 2.svg";
import Circle from "../../../public/images/Icon_Order.svg";
import Link from "next/link";
import Table from "../../Components/common/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { base_url } from "@/utils/constant";
import { useRouter } from "next/navigation";
import HighPriorityTickets from "../../../public/images/HighPriorityTickets.svg"
import Customers from "../../../public/images/Customers.svg"
import Departments from "../../../public/images/Departments.svg"

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



export default function SuperAdminDashboard() {
  const router = useRouter();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTickets, setNewTickets] = useState<number>(0);
  const [openTickets, setOpenTickets] = useState<number>(0);
  const [closedTickets, setClosedTickets] = useState<number>(0);
  const [highPriorityTickets, setHighPriorityTickets] = useState<number>(0);
  const [allTickets, setAllTickets] = useState<number>(0);

  const [incidentTickets, setIncidentTickets] = useState<number>(0);
  const [problemTickets, setProblemTickets] = useState<number>(0);
  const [changeTickets, setChangeTickets] = useState<number>(0);
  const [serviceRequestTickets, setServiceRequestTickets] = useState<number>(0);

  // const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get<{ user: Ticket[] }>(
        `${base_url}/SuperAdminAllTickets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const tickets = response.data.user;
      // console.log("tickets",tickets)

      if (!response.data.user) {
        throw new Error("No tickets found");
      }

      const activeTickets = response.data.user.filter(
        (ticket) => ticket.status === "Active"
      );

      const closedTickets = response.data.user.filter(
        (ticket) => ticket.status === "Closed"
      );

      const highPriorityTickets = response.data.user.filter(
        (ticket) => ticket.priority === "High"
      );

      const closedHighPriorityTickets = closedTickets.filter(
        (ticket) => ticket.priority === "High"
      );

      const incidentTickets = response.data.user.filter(
        (ticket) => ticket.ticket_type === "Incident"
      );

      const problemTickets = response.data.user.filter(
        (ticket) => ticket.ticket_type === "Problem"
      );

      const changeTickets = response.data.user.filter(
        (ticket) => ticket.ticket_type === "Change"
      );

      const serviceRequestTickets = response.data.user.filter(
        (ticket) => ticket.ticket_type === "Service Request"
      );

      setOpenTickets(activeTickets.length);
      setNewTickets(response.data.user.length);
      setClosedTickets(closedTickets.length);
      setTickets(response.data.user);
      setHighPriorityTickets(
        highPriorityTickets.length - closedHighPriorityTickets.length
      );

      setAllTickets(response.data.user.length);

      setIncidentTickets(incidentTickets.length);
      setProblemTickets(problemTickets.length);
      setChangeTickets(changeTickets.length);
      setServiceRequestTickets(serviceRequestTickets.length);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to fetch tickets");
    }
  };

  const handleCardClick = () => {
    router.push('/SuperAdmin/TicketManagement?priority=High');
  }

  const handleCardClick1 = () => {
    router.push('/SuperAdmin/TicketManagement?status=Open');
  }

  const handleCardClick2 = () => {
    router.push('/SuperAdmin/TicketManagement?status=Open');
  }

  const handleCardClick3 = () => {
    router.push('/SuperAdmin/TicketManagement?status=Closed');
  }

  const handleCardClick4 = () => {
    router.push('/SuperAdmin/TicketManagement?type=Incident');
  }

  const handleCardClick5 = () => {
    router.push('/SuperAdmin/TicketManagement?type=Problem');
  }

  const handleCardClick6 = () => {
    router.push('/SuperAdmin/TicketManagement?type=Change');
  }

  const handleCardClick7 = () => {
    router.push('/SuperAdmin/TicketManagement?type=Service Request');
  }

  return (
    <div>
      {/* <div className="flex justify-between items-center shadow-md p-8 sticky top-0 z-50 bg-white">
        <div className="text-[#2A2C3E] text-xl">Dashboard</div>
        <div className="flex gap-4 justify-center items-center">
          <div>
            <Image src={Bell} alt="Notification Bell" width={25} />
          </div>
          <div>
            <Image src={userBg} alt="User" width={50} />
          </div>
        </div>
      </div> */}

      <div className="p-7 pb-0">
        <div className="shadow-sm p-5 rounded-md">
          <div className="text-2xl font-medium mb-7">Summary</div>

          <div className="grid grid-cols-2 gap-5">
            {/* left side */}
            <div>
              <div className="flex justify-between items-center bg-[#F4F3FF] rounded-xl p-8 mb-5 cursor-pointer" onClick={handleCardClick}>
                <div className="flex items-center gap-8">
                  <Image src={HighPriorityTickets} alt="Circle Icon" width={90} />
                  <div>
                    <div className="text-4xl text-[#5027D9]">
                      {highPriorityTickets}
                    </div>

                    <div className="text-[#696969]">High Priority Tickets</div>
                  </div>
                </div>
                <Image src={Arrow} alt="Arrow Icon" width={32} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-[#F4F3FF] p-8 rounded-lg cursor-pointer" onClick={handleCardClick1}>
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">{newTickets}</div>
                    <div className="text-[#696969]">New Tickets</div>
                  </div>
                </div>

                <div className="bg-[#F4F3FF] p-8 rounded-lg cursor-pointer" onClick={handleCardClick2}>
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">{newTickets}</div>
                    <div className="text-[#696969]">Open Tickets</div>
                  </div>
                </div>

                <div className="bg-[#F4F3FF] p-8 rounded-lg cursor-pointer" onClick={handleCardClick3}>
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">
                      {closedTickets}
                    </div>
                    <div className="text-[#696969]">Closed Tickets</div>
                  </div>
                </div>

                <Link href={"/SuperAdmin/TicketManagement"}>
                <div className="bg-[#F4F3FF] p-8 rounded-lg cursor-pointer" >
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">{allTickets}</div>
                    <div className="text-[#696969]">Total Tickets</div>
                  </div>
                </div>
                </Link>

              </div>
            </div>

            {/* right side */}

            <div className="grid grid-cols-2 gap-5 h-fit">
              <div className="flex justify-between items-center bg-[#F4F3FF] rounded-xl p-8 h-fit" >
                <div className="flex items-center gap-8">
                  <Image src={Customers} alt="Circle Icon" width={90} />
                  <div>
                    <div className="text-4xl text-[#5027D9]">3</div>
                    <div className="text-[#696969]">Customers </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#F4F3FF] rounded-xl p-8 h-fit">
                <div className="flex items-center gap-8">
                  <Image src={Departments} alt="Circle Icon" width={90} />
                  <div>
                    <div className="text-4xl text-[#5027D9]">3</div>
                    <div className="text-[#696969]">Depart-ments</div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 h-fit">
                <div className="flex justify-between items-center bg-[#F4F3FF] rounded-xl p-8">
                  <div className="flex items-center gap-8">
                    <Image src={Circle} alt="Circle Icon" width={90} />
                    <div>
                      <div className="text-4xl text-[#5027D9]">10</div>
                      <div className="text-[#696969]">Team Members</div>
                    </div>
                  </div>
                  {/* <Image src={Arrow} alt="Arrow Icon" width={32} /> */}
                </div>
              </div>

              {/* open tickets by type */}
              <div className="col-span-2">
                <div className="py-4">
                  <div className="text-xl font-medium text-[#343A69]">
                    Open Tickets by type
                  </div>
                  <div className="overflow-hidden border-2 rounded-lg mt-6 py-7">
                    <table className="bg-white m-3 w-full table-fixed">
                      <thead>
                        <tr>
                          <th className="text-[#718EBF] pb-5 font-normal w-1/3 text-left pl-5">
                            SL No
                          </th>
                          <th className="text-[#718EBF] pb-5 font-normal w-1/3 text-left pl-5">
                            Name
                          </th>
                          <th className="text-[#718EBF] pb-5 font-normal w-1/3 text-left pl-5">
                            Tickets
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr onClick={handleCardClick4}  className="cursor-pointer">
                          <td className="py-3 text-left pl-5">01.</td>
                          <td className="py-2 text-left pl-5">Incident</td>
                          <td className="py-2 text-left pl-5">
                            {incidentTickets}
                          </td>
                        </tr>
                        <tr  onClick={handleCardClick5}  className="cursor-pointer">
                          <td className="py-3 text-left pl-5">02.</td>
                          <td className="py-2 text-left pl-5">Problem</td>
                          <td className="py-2 text-left pl-5">
                            {problemTickets}
                          </td>
                        </tr>
                        <tr  onClick={handleCardClick6} className="cursor-pointer">
                          <td className="py-3 text-left pl-5">03.</td>
                          <td className="py-2 text-left pl-5">Change</td>
                          <td className="py-2 text-left pl-5">
                            {changeTickets}
                          </td>
                        </tr>
                        <tr  onClick={handleCardClick7}  className="cursor-pointer">
                          <td className="py-3 text-left pl-5">04.</td>
                          <td className="py-2 text-left pl-5">
                            Service Request
                          </td>
                          <td className="py-2 text-left pl-5">
                            {serviceRequestTickets}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end of top half */}

      <div className="m-8 flex flex-col gap-5">
        <div className="flex p-7 justify-between">
          <div className="text-3xl text-[#2A2C3E]">Recent Tickets</div>
          <div className="text-2xl text-[#696969] flex gap-3 justify-center items-center">
            <div>
              <Link href="/AllTickets">View All Tickets </Link>
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
}
