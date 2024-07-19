"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@headlessui/react";
import Folder from "../../../../public/images/folder.svg";
import Plus from "../../../../public/images/Plus.svg";
import Table from "../../../Components/common/Table";
import SearchBar from "../../../Components/common/SearchBar";
import Filterdropdowns from "../../../Components/common/Filterdropdowns";
import axios from "axios";
import { base_url } from "@/utils/constant";

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

export default function Page() {
  // State variables to manage dropdown values
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [typeValue, setTypeValue] = useState("Type");
  const [priorityValue, setPriorityValue] = useState("Priority");
  const [statusValue, setStatusValue] = useState("Status");

  useEffect(() => {
    fetchTickets();
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

    if (response.data.tickets) {
      setTickets(response.data.tickets);
    } else {
      throw new Error("No tickets found");
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};


  const handleReset = () => {
    console.log("test")
    setTypeValue("Type");
    setPriorityValue("Priority");
    setStatusValue("Status");
  };

  return (
    <div className="">

      <div className="flex justify-between items-center mt-10 ml-8 mr-8">
        <div>
          <h1 className="text-3xl text-[#2A2C3E]">Tickets</h1>
        </div>
        <div className="flex justify-around items-center gap-2">
          <div>
            {/* <SearchBar /> */}
          </div>
          <div>
            <Button className="flex rounded bg-white py-2 px-4 text-sm text-[#5027D9] items-center gap-2 border-2 border-[#5027D9]">
              <Image src={Folder} alt="Folder Icon" width={22} height={22} />
              Export report
            </Button>
          </div>
          <div>
            <Button className="flex rounded bg-[#5027D9] py-2 border-2 border-[#5027D9] px-4 text-sm text-white items-center gap-2">
              <Image src={Plus} alt="Plus Icon" width={22} height={22} />
              New Ticket
            </Button>
          </div>
        </div>
      </div>

      <div className="py-7 px-5 font-semibold rounded-md m-8 bg-[#F9F9F9]">
        <p>Filter ticket by</p>
        {/* <Filterdropdowns
          typeValue={typeValue}
          setTypeValue={setTypeValue}
          priorityValue={priorityValue}
          setPriorityValue={setPriorityValue}
          statusValue={statusValue}
          setStatusValue={setStatusValue}
          handleReset={handleReset}
        /> */}
      </div>
      <div className="mx-8">
        <Table tickets={tickets} />
      </div>
    </div>
  );
}
