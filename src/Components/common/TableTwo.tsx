import React from 'react';
import { useRouter } from 'next/navigation';
type Ticket = {
  id: number;
  company_legal_name: string;
  status: string;
  priority: string;
  subject: string;
  updatedAt: string;
};
type TableRow = {
  "Ticket ID": string;
  CompanyName: string;
  Status: string;
  Priority: string;
  Subject: string;
  Updated?: string;
};
type TableProps = {
  tickets: Ticket[];
  showUpdated?: boolean;
};
const TableTwo: React.FC<TableProps> = ({ tickets, showUpdated }) => {
  const router = useRouter();
  const tableHead: (keyof TableRow)[] = [
    "Ticket ID",
    "CompanyName",
    "Priority",
    "Status",
    "Subject",
  ];
  if (showUpdated) {
    tableHead.push("Updated");
  }
  const handleTicketClick = (id: number) => {
    router.push(`/team/ViewTicket/${id}`);
  };
  const tableData: TableRow[] = tickets.map((ticket) => ({
    "Ticket ID": ticket.id.toString(),
    Subject: ticket.subject,
    Priority: ticket.priority,
    Status: ticket.status,
    CompanyName: ticket.company_legal_name,
    Updated: showUpdated ? ticket.updatedAt : undefined,
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
            <tr key={index} onClick={() => handleTicketClick(Number(row["Ticket ID"]))} className="cursor-pointer">
              {tableHead.map((heading) => (
                <td key={heading} className="px-6 py-4">
                  {heading === "Priority" ? (
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        row[heading] === "Low"
                          ? "bg-[#F4F2FF] text-[#5A21DB]"
                          : row[heading] === "Mid"
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
                          : row[heading] === "Active"
                          ? "bg-[#FFF9F9] text-[#D91A1A]"
                          : ""
                      }`}
                    >
                      {row[heading]}
                    </span>
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