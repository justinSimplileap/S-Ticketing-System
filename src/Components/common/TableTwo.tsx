import React from 'react';

// Define the type for the table data
type TableRow = {
  "Ticket ID": string;
  CustomerName: string; 
  Priority: string;
  Status: string;
  Subject: string;
};

const tableHead: (keyof TableRow)[] = [
  "Ticket ID",
  "CustomerName",
  "Priority",
  "Status",
  "Subject",
];

const tableData: TableRow[] = [
  {
    "Ticket ID": "#12334421",
    CustomerName: "Shankara", 
    Priority: "Low",
    Status: "Closed",
    Subject: "Subject",
  },
  {
    "Ticket ID": "#12334421",
    CustomerName: "Volvo", 
    Priority: "Low",
    Status: "Closed",
    Subject: "Subject",
  },
  {
    "Ticket ID": "#12334421",
    CustomerName: "Company name",
    Priority: "Mid",
    Status: "Closed",
    Subject: "Subject",
  },
  {
    "Ticket ID": "#12334421",
    CustomerName: "Company name",
    Priority: "Mid",
    Status: "Closed",
    Subject: "Subject",
  },
  {
    "Ticket ID": "#12334421",
    CustomerName: "Company name",
    Priority: "Mid",
    Status: "Closed",
    Subject: "Subject",
  }
];

const Table: React.FC = () => {
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
            <tr key={index} className="">
              {tableHead.map((heading) => (
                <td key={heading} className="px-6 py-4 ">
                  {heading === "Priority" ? (
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        row[heading] === "Low" ? "bg-[#F4F2FF] text-[#5A21DB]" : row[heading] === "Mid" ? "bg-[#F4F2FF] text-[#004FCF]" : ""
                      }`}
                    >
                      {row[heading]}
                    </span>
                  ) : heading === "Status" ? (
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        row[heading] === "Closed" ? "bg-[#F0FFF8] text-[#00974F]" : ""
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

export default Table;
