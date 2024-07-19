'use client';

import Image from "next/image";
import Bell from "../../../public/images/bell.svg";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@headlessui/react";
import Folder from "../../../public/images/folder.svg";
import Plus from "../../../public/images/Plus.svg";
import Table from "../../Components/common/Table";
import SearchBar from "../../Components/common/SearchBar";
import Filterdropdowns from "../../Components/common/Filterdropdowns";
import TablePagination from "@/Components/others/TablePagination";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
        "http://localhost:8000/filtertickets",
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
        "http://localhost:8000/getUserDetails",
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

  const exportTableToExcel = () => {
    const table = document.getElementById('all-tickets-table');
    if (!table) return;

    let csvContent = "";
    const rows = Array.from(table.querySelectorAll("tr"));

    rows.forEach(row => {
      const cols = Array.from(row.querySelectorAll("td, th"));
      const rowData = cols.map(col => (col as HTMLElement).innerText).join(",");
      csvContent += rowData + "\n";
    });

    const dataType = 'text/csv;charset=utf-8;';
    const fileName = 'tickets.csv';
    const downloadLink = document.createElement('a');

    const blob = new Blob([csvContent], { type: dataType });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="">
      <div className="flex justify-between items-center shadow-md px-8 py-4 sticky top-0 z-50 bg-white">
        <div className="text-[#2A2C3E] text-xl">Ticket Management</div>
        <div className="flex gap-4 justify-center items-center">
          <div>
            <Image src={Bell} alt="Notification Bell" width={25} />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            {profilePicture && (
              <Image
                src={profilePicture}
                alt="Profile Picture"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </div>

      <div className="lg:flex justify-between items-center mt-5 lg:mt-10 lg:mx-8 mx-5">
        <div>
          <h1 className="text-3xl text-[#2A2C3E] mb-7 lg:mg-0">Tickets</h1>
        </div>
        <div className="lg:flex justify-around items-center gap-2">
          <div>
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <Button className="flex rounded bg-white py-2 px-4 text-sm text-[#5027D9] items-center gap-2 border-2 border-[#5027D9]" onClick={exportTableToExcel}>
              <Image src={Folder} alt="Folder Icon" width={22} height={22} />
              Export report
            </Button>
          </div>
          <div>
            <Link href="/TicketManagement/NewTicket">
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
          handleReset={handleReset}
          fetchTickets={fetchTickets}
        />
      </div>
      <div className="mx-8">
        <Table tickets={tickets} />
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
