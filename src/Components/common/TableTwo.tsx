import React from 'react';
import Image from 'next/image';
import view from '../../../public/images/eye.svg'; // Reference to the view icon
import { useRouter } from 'next/navigation';

type Ticket = {
  id: number;
  company_legal_name: string;
  status: string;
  priority: string;
  subject: string;
  updatedAt: string;
  ticket_type: string;
};

type TableRow = {
  "Ticket ID": string;
  "Ticket Type": string;
  Subject: string;
  CompanyName: string;
  Priority: string;
  "Created At"?: string;
  "Updated At"?: string;
  Status: string;
  Actions: string;
  "Customer Name"?: string;
};

type TableProps = {
  tickets: Ticket[];
  showUpdated?: boolean;
};

const TableTwo: React.FC<TableProps> = ({ tickets, showUpdated }) => {
  const router = useRouter();

  const tableHead: (keyof TableRow)[] = [
    "Ticket ID",
    "Ticket Type",
    "CompanyName",
    "Priority",
    "Status",
    "Subject",
  ];

  if (showUpdated) {
    tableHead.push("Updated At");
  }

  // Add the Actions column to the table header
  tableHead.push("Actions");

  const handleViewClick = (ticketId: number) => {
    router.push(`/TeamMember/TicketManagement/ViewTicket/${ticketId}`);
  };

  const tableData: TableRow[] = tickets.map((ticket) => ({
    "Ticket ID": ticket.id.toString(),
    "Ticket Type": ticket.ticket_type,
    Subject: ticket.subject,
    Priority: ticket.priority,
    Status: ticket.status,
    CompanyName: ticket.company_legal_name,
    "Updated At": showUpdated ? ticket.updatedAt : undefined,
    Actions: "view", // Just for mapping purposes
  }));

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHead.map((heading) => (
              <th key={heading} scope="col" className="px-6 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
              {tableHead.map((heading) => (
                <td key={heading} className={`px-6 py-4`}>
                  {heading === "Priority" ? (
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        row[heading] === "Low"
                          ? "bg-[#F4F2FF] text-[#5A21DB]"
                          : row[heading] === "Medium"
                          ? "bg-[#F4F2FF] text-[#004FCF]"
                          : row[heading] === "High"
                          ? "bg-[#F4F2FF] text-[#004FCF]"
                          : ""
                      }`}
                    >
                      {row[heading]}
                    </span>
                  ) : heading === "Status" ? (
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        row[heading] === "Closed"
                          ? "bg-[#F0FFF8] text-[#00974F]"
                          : row[heading] === "Open"
                          ? "bg-[#FFF9F9] text-[#D91A1A]"
                          : ""
                      }`}
                    >
                      {row[heading]}
                    </span>
                  ) : heading === "Actions" ? (
                    <button
                      className="focus:outline-none"
                      onClick={() =>
                        handleViewClick(parseInt(row["Ticket ID"], 10))
                      }
                    >
                      <Image src={view} alt="view" width={20} height={17} />
                    </button>
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
  );
};

export default TableTwo;
