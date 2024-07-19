import React, { useState } from "react";
import Image from "next/image";
import view from "../../../public/images/eye.svg";
import { useRouter } from "next/navigation";
import edit from "../../../public/images/editTable.svg";
import deleteIcon from "../../../public/images/deleteTicket.svg";
import axios from "axios";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";



type Ticket = {
  id: number;
  ticket_type: string;
  subject: string;
  priority: string;
  createdAt: string; 
  updatedAt: string; 
  status: string;
  actions: string;
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
};

type TableProps = {
  tickets: Ticket[];
};

const Table: React.FC<TableProps> = ({ tickets }) => {

  console.log({tickets});
  
  const router = useRouter();

  const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);

  const tableHead: (keyof TableRow)[] = [
    "Ticket ID",
    "Ticket Type",
    "Subject",
    "Priority",
    "Status",
    "Created At",
    "Updated At",
    "Actions", 
  ];

  const tableData: TableRow[] = Array.isArray(tickets) ? tickets.map((ticket) => ({
    "Ticket ID": ticket.id.toString(),
    "Ticket Type": ticket.ticket_type,
    Subject: ticket.subject,
    Priority: ticket.priority,
    "Created At": new Date(ticket.createdAt).toLocaleString(),
    "Updated At": new Date(ticket.updatedAt).toLocaleString(),
    Status: ticket.status,
    Actions: "view",
  })) : [];

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
      console.log(selectedTicket); 
      router.push(`/TicketManagement/ViewTicket/${selectedTicket.id}`);
    }
  };

  const handleEditClick = (ticketId: number) => {
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    if (selectedTicket) {
      setViewingTicket(selectedTicket);
      console.log(selectedTicket); // Log all details of the selected ticket
      router.push(`/TicketManagement/EditTicket/${selectedTicket.id}`);
    }
  };

  const handleDeleteClick = async (ticketId: number) => {
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    try {
      setLoading(true)
      if (selectedTicket){
        console.log(selectedTicket);
        const deleteTicketRow = await axios.get(`http://localhost:8000/deleteTicket/${selectedTicket.id}`,
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (deleteTicketRow){
          toast.success("Ticket Deleted Successfully");
          setLoading(false);
          location.reload();
        }
        
      }
    
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Toaster />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" id="all-tickets-table">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#FFFFFF] dark:text-gray-400">
          <tr>
            {tableHead.map((heading) => (
              <th
                key={heading}
                scope="col"
                className={`px-6 py-3 ${
                  heading === "Ticket ID"
                    ? "w-1/12"
                    : heading === "Subject"
                    ? "w-2/5"
                    : ""
                }`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { tableData &&tableData.map((row, index) => (
            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              {tableHead.map((heading) => (
                <td
                  key={heading}
                  className={`px-6 py-4 ${
                    heading === "Ticket ID" || heading === "Ticket Type"
                      ? "text-blue-500"
                      : heading === "Subject"
                      ? "text-black"
                      : heading === "Status"
                      ? getStatusColor(row[heading])
                      : heading === "Priority"
                      ? getPriorityColor(row[heading])
                      : ""
                  } ${
                    heading === "Ticket ID"
                      ? "w-1/12"
                      : heading === "Subject"
                      ? "w-2/5"
                      : ""
                  }`}
                >
                  {heading === "Actions" ? (
                    <div className="flex items-center gap-5">
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          handleViewClick(parseInt(row["Ticket ID"], 10))
                        }
                      >
                        <Image
                          src={view}
                          alt="view"
                          width={17}
                          height={17}
                        />
                      </button>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          handleEditClick(parseInt(row["Ticket ID"], 10))
                        }
                      >
                        <Image
                          src={edit}
                          alt="edit"
                          width={17}
                          height={17}
                        />
                      </button>
                      <button
                        className="focus:outline-none"
                        onClick={() =>
                          handleDeleteClick(parseInt(row["Ticket ID"], 10))
                        }
                      >
                        <Image
                          src={deleteIcon}
                          alt="edit"
                          width={17}
                          height={17}
                        />
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
      {loading && (
              <Loader />
            )}
    </div>
  );
};

export default Table;
