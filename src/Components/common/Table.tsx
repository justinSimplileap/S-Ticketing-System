import React, { useEffect, useState } from "react";
import Image from "next/image";
import view from "../../../public/images/eye.svg";
import edit from "../../../public/images/editTable.svg";
import deleteIcon from "../../../public/images/deleteTicket.svg";
import axios from "axios";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import { base_url } from "@/utils/constant";
import { usePathname, useRouter } from "next/navigation";

type Ticket = {
  id: number;
  user_id: number;
  company_legal_name: string;
  ticket_type: string;
  subject: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  actions: string;
  customer_name?: string;
};

type TableRow = {
  "Ticket ID": string;
  "Ticket Type": string;
  Subject: string;
  Priority: string;
  "Created At": string;
  "Updated At": string;
  Status: string;
  Actions: string;
  "Customer Name"?: string;
};

type TableProps = {
  tickets: Ticket[];
};

type User = {
  role: string;
};

const Table: React.FC<TableProps> = ({ tickets }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const showCustomerName =
    pathname === "/SuperAdmin/TicketManagement" || pathname === "/SuperAdmin";

  useEffect(() => {
    fetchUser();
  }, []);

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
        setRole(response.data.user.role);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const tableHead: (keyof TableRow)[] = showCustomerName
    ? [
        "Ticket ID",
        "Customer Name",
        "Ticket Type",
        "Subject",
        "Priority",
        "Status",
        "Created At",
        "Updated At",
        "Actions",
      ]
    : [
        "Ticket ID",
        "Ticket Type",
        "Subject",
        "Priority",
        "Status",
        "Created At",
        "Updated At",
        "Actions",
      ];

  const tableData: TableRow[] = Array.isArray(tickets)
    ? tickets.map((ticket) => ({
        "Ticket ID": ticket.id.toString(),
        "Ticket Type": ticket.ticket_type,
        Subject: ticket.subject,
        Priority: ticket.priority,
        "Created At": new Date(ticket.createdAt).toLocaleString(),
        "Updated At": new Date(ticket.updatedAt).toLocaleString(),
        Status: ticket.status,
        Actions: "view",
        "Customer Name": ticket.customer_name ?? "",
      }))
    : [];

  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-blue-600";
      case "low":
        return "text-purple-300";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-red-600";
      case "closed":
        return "text-green-500";
      default:
        return "";
    }
  };

  const handleViewClick = (ticketId: number) => {
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    if (selectedTicket) {
      setViewingTicket(selectedTicket);
      if (role === "1") {
        router.push(`/SuperAdmin/TicketManagement/ViewTicket/${selectedTicket.id}`);
      } else {
        router.push(`/TicketManagement/ViewTicket/${selectedTicket.id}`);
      }
    }
  };

  const handleEditClick = (ticketId: number) => {
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    if (selectedTicket) {
      setViewingTicket(selectedTicket);
      if (role === "1") {
        router.push(`/SuperAdmin/TicketManagement/EditTicket/${selectedTicket.id}`);
      } else {
        router.push(`/TicketManagement/EditTicket/${selectedTicket.id}`);
      }
    }
  };

  const handleDeleteClick = async (ticketId: number) => {
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    try {
      setLoading(true);
      if (selectedTicket) {
        const deleteTicketRow = await axios.get(
          `${base_url}/deleteTicket/${selectedTicket.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (deleteTicketRow) {
          toast.success("Ticket Deleted Successfully");
          setLoading(false);
          location.reload();
        }
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Toaster />

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" id="all-tickets-table">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#FFFFFF] dark:text-gray-400">
            <tr>
              {tableHead.map((heading) => (
                <th key={heading} scope="col" className={`px-6 py-3 ${heading === "Ticket ID" ? "w-1/12" : heading === "Subject" ? "w-2/5" : ""}`}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                  {tableHead.map((heading) => (
                    <td
                      key={heading}
                      className={`px-6 py-4 ${heading === "Ticket ID" || heading === "Ticket Type" ? "text-blue-500" : heading === "Subject" ? "text-black" : heading === "Status" ? getStatusColor(row[heading]) : heading === "Priority" ? getPriorityColor(row[heading]) : ""} ${heading === "Ticket ID" ? "w-1/12" : heading === "Subject" ? "w-2/5" : ""}`}
                    >
                      {heading === "Actions" ? (
                        <div className="flex items-center gap-5">
                          <button className="focus:outline-none" onClick={() => handleViewClick(parseInt(row["Ticket ID"], 10))}>
                            <Image src={view} alt="view" width={17} height={17} />
                          </button>
                          <button className="focus:outline-none" onClick={() => handleEditClick(parseInt(row["Ticket ID"], 10))}>
                            <Image src={edit} alt="edit" width={17} height={17} />
                          </button>
                          <button className="focus:outline-none" onClick={() => handleDeleteClick(parseInt(row["Ticket ID"], 10))}>
                            <Image src={deleteIcon} alt="delete" width={17} height={17} />
                          </button>
                        </div>
                      ) : (
                        row[heading]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden p-3">
        {tableData.map((row, index) => (
          <div key={index} className="">
            <div className="flex justify-start items-center p-4 bg-[#F7F7F7] rounded-sm space-x-4">
              <button
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                className={`focus:outline-none transition-transform transform ${openDropdown === index ? 'rotate-180' : 'rotate-0'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#5027D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="flex justify-center items-center ">
                <div>
                  <span className="text-black text-sm font-bold"></span> <span className="text-[#5027D9] text-sm font-bold">{row["Subject"]}</span>
                </div>
                {/* <div className="flex items-center gap-4">
                  <button className="focus:outline-none" onClick={() => handleViewClick(parseInt(row["Ticket ID"], 10))}>
                    <Image src={view} alt="view" width={17} height={17} />
                  </button>
                  <button className="focus:outline-none" onClick={() => handleEditClick(parseInt(row["Ticket ID"], 10))}>
                    <Image src={edit} alt="edit" width={17} height={17} />
                  </button>
                  <button className="focus:outline-none" onClick={() => handleDeleteClick(parseInt(row["Ticket ID"], 10))}>
                    <Image src={deleteIcon} alt="delete" width={17} height={17} />
                  </button>
                </div> */}
              </div>
            </div>

            {openDropdown === index && (
              <div className="flex flex-col p-4 mt-1 gap-2">
                {showCustomerName && (
                  <div className="flex justify-between">
                    <span className="text-black text-sm font-bold">Customer Name:</span>
                    <span className="text-[#5027D9] text-sm font-bold">{row["Customer Name"]}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-black text-sm font-bold">Ticket ID:</span>
                  <span className="text-[#5027D9] text-sm font-bold">{row["Ticket ID"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-sm font-bold">Ticket Type:</span>
                  <span className="text-[#5027D9] text-sm font-bold">{row["Ticket Type"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-sm font-bold">Priority:</span>
                  <span className={`${getPriorityColor(row.Priority)} text-sm font-bold`}>{row.Priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-sm font-bold">Status:</span>
                  <span className={`${getStatusColor(row.Status)} text-sm font-bold`}>{row.Status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-sm font-bold">Created At:</span>
                  <span className="text-sm font-bold">{row["Created At"]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-sm font-bold">Updated At:</span>
                  <span className="text-sm font-bold">{row["Updated At"]}</span>
                </div>
                <div className="flex justify-center items-center">
                <div className="flex items-center gap-4 py-3">
                  <button className="focus:outline-none" onClick={() => handleViewClick(parseInt(row["Ticket ID"], 10))}>
                    <Image src={view} alt="view" width={17} height={17} />
                  </button>
                  <button className="focus:outline-none" onClick={() => handleEditClick(parseInt(row["Ticket ID"], 10))}>
                    <Image src={edit} alt="edit" width={17} height={17} />
                  </button>
                  <button className="focus:outline-none" onClick={() => handleDeleteClick(parseInt(row["Ticket ID"], 10))}>
                    <Image src={deleteIcon} alt="delete" width={17} height={17} />
                  </button>
                </div>
              </div>
              </div>
              
            )}
          </div>
        ))}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Table;
