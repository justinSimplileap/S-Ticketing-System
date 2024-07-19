import React from 'react';
import Image from 'next/image';
import taskbar from '../../../public/images/taskbar.svg';
import Link from 'next/link';

// Define the type for the table data
type TableRow = {
    "Ticket ID": string;
    Subject: string;
    Priority: string;
    Status: string;
    Date: string;
    Updated: string;
};

type TableProps = {
    role: 'team' | 'TeamMember';
};

const tableHead: (keyof TableRow)[] = [
    "Ticket ID",
    "Subject",
    "Priority",
    "Status",
    "Date",
    "Updated"
];

const tableData: TableRow[] = [
    {
        "Ticket ID": "#1234",
        Subject: "This is a Ticket",
        Priority: "High",
        Status: "Closed",
        Date: "January 9, 2022",
        Updated: "2 hours ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Another Ticket",
        Priority: "Average",
        Status: "Active",
        Date: "January 10, 2022",
        Updated: "1 hour ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Third Ticket",
        Priority: "Average",
        Status: "Closed",
        Date: "January 11, 2022",
        Updated: "3 hours ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Another Ticket",
        Priority: "Mid",
        Status: "Closed",
        Date: "January 10, 2022",
        Updated: "1 hour ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Another Ticket",
        Priority: "Mid",
        Status: "Closed",
        Date: "January 10, 2022",
        Updated: "1 hour ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Another Ticket",
        Priority: "Average",
        Status: "Closed",
        Date: "January 10, 2022",
        Updated: "1 hour ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Another Ticket",
        Priority: "Mid",
        Status: "Closed",
        Date: "January 10, 2022",
        Updated: "1 hour ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Another Ticket",
        Priority: "Mid",
        Status: "Active",
        Date: "January 10, 2022",
        Updated: "1 hour ago"
    },
    {
        "Ticket ID": "#1234",
        Subject: "Another Ticket",
        Priority: "Mid",
        Status: "Active",
        Date: "January 10, 2022",
        Updated: "1 hour ago"
    },
];

const Table: React.FC<TableProps> = ({ role }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-[#9291A5] uppercase bg-[#FFFFFF] dark:bg-gray-700 dark:text-gray-400">
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
                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-[#1D1C2B]">
                            {tableHead.map((heading) => (
                                <td key={heading} className={`px-6 py-4 ${heading === "Ticket ID" ? "text-[#5027D9]" : ""}`}>
                                    {heading === "Ticket ID" ? (
                                       <Link href={`/${role}/ViewTicket?ticketId=${encodeURIComponent(row["Ticket ID"].substr(1))}`}>
                                       <span className="underline cursor-pointer">{row["Ticket ID"]}</span>
                                   </Link>
                                    ) : heading === "Priority" ? (
                                        <span className={`inline-block px-3 py-1 rounded-full ${row[heading] === "Low" ? "bg-[#F4F2FF] text-[#5A21DB]" : row[heading] === "Mid" ? "bg-[#F4F2FF] text-[#004FCF]" : row[heading] === "High" ? "bg-[#FFF9F9] text-[#D91A1A]" : row[heading] === "Average" ? "bg-[#FFFEF6] text-[#D47F00]" : ""}`}>
                                            {row[heading]}
                                        </span>
                                    ) : heading === "Status" ? (
                                        <span className={`inline-block px-3 py-1 rounded-full ${row[heading] === "Closed" ? "bg-[#F0FFF8] text-[#00974F]" : row[heading] === "Active" ? "bg-[#FFF9F9] text-[#D91A1A]" : ""}`}>
                                            {row[heading]}
                                        </span>
                                    ) : (
                                        row[heading]
                                    )}
                                </td>
                            ))}
                            <td className="px-6 py-4">
                                <Image src={taskbar} alt="Table Image" width={20} height={20} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
