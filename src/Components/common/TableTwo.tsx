import React, { useState } from 'react';
import Image from 'next/image';
import view from '../../../public/images/eye.svg'; // Reference to the view icon
import { useRouter } from 'next/navigation';

type Ticket = {
  id: number;
  company_legal_name: string;
  customer_name?: string;
  status: string;
  priority: string;
  subject: string;
  updatedAt: string;
  ticket_type: string;

};

type TableRow = {
  "ID": string;
  "Type": string;
  Subject: string;
  CompanyName: string;
  Priority: string;
  "Created At"?: string;
  "Updated At"?: string;
  Status: string;
  Actions: string;
  "Customer"?: string;
};

type TableProps = {
  tickets: Ticket[];
  showUpdated?: boolean;
};

const TableTwo: React.FC<TableProps> = ({ tickets, showUpdated }) => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const tableHead: (keyof TableRow)[] = [
    "ID",
    "Type",
    "Customer",
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
    "ID": ticket.id.toString(),
    "Type": ticket.ticket_type,
    "Customer":ticket.customer_name,
    Subject: ticket.subject,
    Priority: ticket.priority,
    Status: ticket.status,
    CompanyName: ticket.company_legal_name,
    "Updated At": showUpdated ? ticket.updatedAt : undefined,
    Actions: "view", // Just for mapping purposes
  }));

  return (
   
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#FFFFFF] dark:text-gray-400">
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
                  <td key={heading} className="px-6 py-4">
                    {heading === "Priority" ? (
                      <span
                        className={`inline-block px-3 py-1 rounded-full ${row[heading] === "Low"
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
                        className={`inline-block px-3 py-1 rounded-full ${row[heading] === "Closed"
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
                          handleViewClick(parseInt(row["ID"], 10))
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

      {/* Mobile Cards */}
      <div className="block md:hidden ">
        {tableData.map((row, index) => (
          <div key={index} className="">
            <div className="flex justify-between items-center  p-4 bg-[#F7F7F7] rounded-sm">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
                className={`focus:outline-none transition-transform transform ${openDropdown === index ? 'rotate-180' : 'rotate-0'
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#5027D9] "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <h2 className="text-base pl-6 flex-1 text-[#696969] font-medium">
                {row.Subject}
              </h2>
            </div>
            {openDropdown === index && (
              <div className=" mt-4 space-y-2 p-2  bg-[#FFFFFF]">
                <div className="flex justify-between text-[#696969] font-normal">
                  <h3 className="flex-1 text-center font-medium text-gray-700">ID</h3>
                  <span className="flex-1 text-center">{row["ID"]}</span>
                </div>

            
              <div className="flex justify-between text-[#696969] ">
                  <h3 className="flex-1 text-center font-medium text-gray-700">Customer</h3>
                  <span className="flex-1 text-center">{row["Customer"]}</span>
                </div>
                
                <div className="flex justify-between text-[#696969] ">
                  <h3 className="flex-1 text-center text-gray-700 font-medium">Priority</h3>
                 <span
              className={`flex-1 text-center px-1 py-1 rounded-full ${row["Priority"] === "Low"
                ? " text-[#5A21DB]"
                : row["Priority"] === "Medium"
                  ? " text-[#004FCF]"
                  : row["Priority"] === "High"
                    ? " text-[#004FCF]"
                    : ""
              }`}
            >
              {row["Priority"]}
            </span>
                  
                </div>
             
                <div className="flex justify-between text-[#696969] ">
                  <h3 className="flex-1 text-center text-gray-700 font-medium">Status</h3>
                  <span className="flex-1 text-center  ">{row["Status"]}</span>
                </div>
                <button
                  className="focus:outline-none mt-2 hidden lg:block"
                  onClick={() =>
                    handleViewClick(parseInt(row["ID"], 10))
                  }
                >
                  <Image src={view} alt="view" width={20} height={17} />
                </button>
                <div className=" lg:hidden mt-2 flex justify-center w-full">
                  <button
                    className="text-blue-500 "
                    onClick={() => handleViewClick(parseInt(row["ID"], 10))}
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;
