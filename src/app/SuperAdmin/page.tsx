"use client"

import Image from "next/image";
import Bell from "../../../public/images/bell.svg";
import userBg from "../../../public/images/User.svg";
import Arrow from "../../../public/images/Arrow 2.svg";
import Circle from "../../../public/images/Icon_Order.svg";
import Link from "next/link";
import Table from "../../Components/common/Table"
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';



// Define an interface for the table data
interface TicketData {
  slno: string;
  name: string;
  tickets: number;
}

// Sample data for the table
const ticketData: TicketData[] = [
  { slno: "01.", name: "Incident", tickets: 5 },
  { slno: "02.", name: "Problem", tickets: 3 },
  { slno: "03.", name: "Change", tickets: 8 },
  { slno: "04.", name: "Service Request", tickets: 8 },
];

export default function SuperAdminDashboard() {

  const [tickets, setTickets] = useState([]);


  return (
    <div>
      <div className="flex justify-between items-center shadow-md p-8 sticky top-0 z-50 bg-white">
        <div className="text-[#2A2C3E] text-xl">Dashboard</div>
        <div className="flex gap-4 justify-center items-center">
          <div>
            <Image src={Bell} alt="Notification Bell" width={25} />
          </div>
          <div>
            <Image src={userBg} alt="User" width={50} />
          </div>
        </div>
      </div>

      <div className="p-10 pb-0">
        <div className="shadow-sm p-7 rounded-md">
          <div className="text-xl font-medium mb-7">Summary</div>

          <div className="grid grid-cols-2 gap-5">
            {/* left side */}
            <div>
              <div className="flex justify-between items-center bg-[#F4F3FF] rounded-xl p-8 mb-5">
                <div className="flex items-center gap-8">
                  <Image src={Circle} alt="Circle Icon" width={90} />
                  <div>
                    <div className="text-4xl text-[#5027D9]">75</div>
                    <div className="text-[#696969]">High Priority Tickets</div>
                  </div>
                </div>
                <Image src={Arrow} alt="Arrow Icon" width={32} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="bg-[#F4F3FF] p-8 rounded-lg">
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">75</div>
                    <div className="text-[#696969]">New Tickets</div>
                  </div>
                </div>

                <div className="bg-[#F4F3FF] p-8 rounded-lg">
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">75</div>
                    <div className="text-[#696969]">Open Tickets</div>
                  </div>
                </div>

                <div className="bg-[#F4F3FF] p-8 rounded-lg">
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">75</div>
                    <div className="text-[#696969]">Closed Tickets</div>
                  </div>
                </div>

                <div className="bg-[#F4F3FF] p-8 rounded-lg">
                  <div className="grid grid-cols-2 pb-10">
                    <div>
                      <Image src={Circle} alt="Circle Icon" width={90} />
                    </div>
                    <div className="flex justify-end items-end">
                      <Image src={Arrow} alt="Arrow Icon" width={32} />
                    </div>
                  </div>
                  <div className="pl-5 grid gap-3">
                    <div className="text-4xl text-[#5027D9]">75</div>
                    <div className="text-[#696969]">Total Tickets</div>
                  </div>
                </div>
              </div>
            </div>

            {/* right side */}

            <div className="grid grid-cols-2 gap-5 h-fit">
              <div className="flex justify-between items-center bg-[#F4F3FF] rounded-xl p-8 h-fit">
                <div className="flex items-center gap-8">
                  <Image src={Circle} alt="Circle Icon" width={90} />
                  <div>
                    <div className="text-4xl text-[#5027D9]">3</div>
                    <div className="text-[#696969]">Customers </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#F4F3FF] rounded-xl p-8 h-fit">
                <div className="flex items-center gap-8">
                  <Image src={Circle} alt="Circle Icon" width={90} />
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
                  <Image src={Arrow} alt="Arrow Icon" width={32} />
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
                        {ticketData.map((data, index) => (
                          <tr key={index}>
                            <td className="py-3 text-left pl-5">{data.slno}</td>
                            <td className="py-2 text-left pl-5">{data.name}</td>
                            <td className="py-2 text-left pl-5">{data.tickets}</td>
                          </tr>
                        ))}
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
            <div><Link href="/AllTickets">View All Tickets </Link></div>
            <div>
              <Link href="#">
                <Image src={Arrow} alt="hhh" width={28} />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Table tickets={tickets}/>
        </div>
      </div>
    </div>
  );
}
