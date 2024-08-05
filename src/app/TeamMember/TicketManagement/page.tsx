'use client';

import Image from "next/image";
import Bell from "../../../public/images/bell.svg";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@headlessui/react";
import Folder from "../../../../public/images/folder.svg";
import Plus from "../../../../public/images/Plus.svg";
import TableTwo from "../../../Components/common/TableTwo";
import SearchBar from "../../../Components/common/SearchBar";
import Filterdropdowns from "../../../Components/common/Filterdropdowns";
import TablePagination from "@/Components/others/TablePagination";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

type User = {
  profile_url: string;
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

function TicketManagementPage() {
  const searchParams = useSearchParams();

  const initialType = searchParams.get('type') || "Type";
  const initialPriority = searchParams.get('priority') || "Priority";
  const initialStatus = searchParams.get('status') || "Status";
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [typeValue, setTypeValue] = useState(initialType);
  const [priorityValue, setPriorityValue] = useState(initialPriority);
  const [statusValue, setStatusValue] = useState(initialStatus);
  const [profilePicture, setProfilePicture] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerName, setCustomerName] =useState("CustomerName")
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchTickets();
    fetchUser();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [typeValue, priorityValue, statusValue, searchQuery]);

  const fetchTickets = async (page = 1) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get<{ tickets: Ticket[], totalPages: number, currentPage: number }>(
        `${base_url}/filtertickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            type: typeValue !== "Type" ? typeValue : undefined,
            priority: priorityValue !== "Priority" ? priorityValue : undefined,
            status: statusValue !== "Status" ? statusValue : undefined,
            search: searchQuery || '',
            page: page,
            limit: 10,
          },
        }
      );

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

  const fetchUser = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get<{ user: User }>(
        `${base_url}/getUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handlePageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchTickets(newPage);
    }
  };

  const handleReset = () => {
    setTypeValue("Type");
    setPriorityValue("Priority");
    setStatusValue("Status");
    setCurrentPage(1);
  };

  const exportTicketsToCSV = () => {
    const csvRows = [
      ['ID', 'User ID', 'Organization ID', 'Company Legal Name', 'Ticket Type', 'Priority', 'Status', 'Subject', 'Details', 'Details Images URL', 'Role', 'Created At', 'Updated At'],
      ...tickets.map(ticket => [
        ticket.id,
        ticket.user_id,
        ticket.organization_id,
        ticket.company_legal_name,
        ticket.ticket_type,
        ticket.priority,
        ticket.status,
        ticket.subject,
        ticket.details,
        ticket.details_images_url,
        ticket.role,
        ticket.createdAt,
        ticket.updatedAt
      ])
    ];
  
    // Convert rows to CSV format
    const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
  
    // Create a Blob and a link to download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tickets_report.csv");
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="">
      <div className="lg:flex justify-between items-center mt-5 lg:mt-10 lg:mx-8 mx-5">
        <div>
          <h1 className="text-3xl text-sidebarBackground mb-7 lg:mg-0">Tickets</h1>
        </div>
        <div className="lg:flex justify-around items-center gap-2">
          <div>
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <Button className="flex rounded bg-white py-2 px-4 text-sm text-[#5027D9] items-center gap-2 border-2 border-[#5027D9]" onClick={exportTicketsToCSV}>
              <Image src={Folder} alt="Folder Icon" width={22} height={22} />
              Export report
            </Button>
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
          handleReset={handleReset}
          fetchTickets={fetchTickets}
          customerName={customerName}
          setCustomerName={setCustomerName}
          clients={clients}
        />
      </div>
      <div className="mx-8">
        <TableTwo tickets={tickets} />
        <TablePagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicketManagementPage />
    </Suspense>
  );
}
