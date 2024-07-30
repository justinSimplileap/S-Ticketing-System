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
import Link from "next/link";

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
  customer_name: string;
};

type Client = {
  id: number;
  user_id: string;
  organization_id: string;
  customer_name: string;
  gender: string | null;
  profile_url: string | null;
  role: string;
  onBoarded: boolean;
  company_legal_name: string;
  company_url: string;
  designation: string | null;
  phone_number: string;
  email: string;
  password: string;
  address: string;
  country: string;
  city: string;
  postal_code: string;
  about_company: string;
  work_domain: string;
  createdAt: string;
  updatedAt: string;
};

export default function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [typeValue, setTypeValue] = useState("Type");
  const [priorityValue, setPriorityValue] = useState("Priority");
  const [statusValue, setStatusValue] = useState("Status");
  // const [customerNameValue, setCustomerNameValue] = useState("")
  const [customerName, setCustomerName] = useState("CustomerName");
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTickets();
    fetchClients();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [typeValue, priorityValue, statusValue, searchQuery, customerName]);

  const filterTickets = async (page = 1) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get<{
        tickets: Ticket[];
        totalPages: number;
        currentPage: number;
      }>(`${base_url}/filtertickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: typeValue !== "Type" ? typeValue : undefined,
          priority: priorityValue !== "Priority" ? priorityValue : undefined,
          status: statusValue !== "Status" ? statusValue : undefined,
          customerName:
            customerName != "CustomerName" ? customerName : undefined,
          search: searchQuery || "",
          page: page,
          limit: 10,
        },
      });

      console.log("response", response);

      if (response.data) {
        setTickets(response.data.tickets);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } else {
        throw new Error("No tickets found");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

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

      if (response.data.user) {
        setTickets(response.data.user);
      } else {
        throw new Error("No tickets found");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get<{ clients: Client[] }>(
        `${base_url}/viewAllClients`
      );
      setClients(response.data.clients);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const handleReset = () => {
    console.log("test");
    setTypeValue("Type");
    setPriorityValue("Priority");
    setStatusValue("Status");
    setCustomerName("CustomerName");
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mt-10 ml-8 mr-8">
        <div>
          <h1 className="text-3xl text-[#2A2C3E]">Tickets</h1>
        </div>
        <div className="flex justify-around items-center gap-2">
          <div>
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <Button className="flex rounded bg-white py-2 px-4 text-sm text-[#5027D9] items-center gap-2 border-2 border-[#5027D9]">
              <Image src={Folder} alt="Folder Icon" width={22} height={22} />
              Export report
            </Button>
          </div>
          <div>
          <Link href="/SuperAdmin/TicketManagement/NewTicket">
            <Button className="flex rounded bg-[#5027D9] py-2 border-2 border-[#5027D9] px-4 text-sm text-white items-center gap-2">
              <Image src={Plus} alt="Plus Icon" width={22} height={22} />
              New Ticket
            </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-7 px-5 font-semibold rounded-md m-8 bg-[#F9F9F9]">
        <p>Filter ticket by</p>
        <Filterdropdowns
          typeValue={typeValue}
          setTypeValue={setTypeValue}
          priorityValue={priorityValue}
          setPriorityValue={setPriorityValue}
          statusValue={statusValue}
          setStatusValue={setStatusValue}
          customerName={customerName}
          setCustomerName={setCustomerName}
          clients={clients}
          handleReset={handleReset}
          fetchTickets={fetchTickets}
        />
      </div>
      <div className="mx-8">
        <Table tickets={tickets} />
      </div>
    </div>
  );
}
