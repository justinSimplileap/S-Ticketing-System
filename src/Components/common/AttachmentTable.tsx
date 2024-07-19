import React from 'react';
import Image from 'next/image';
import taskbar from '../../../public/images/taskbar.svg';
import Link from 'next/link';
import download from "../../../public/images/download.svg";
import icond from "../../../public/images/icond.svg";

// Define the type for the table data
type TableRow = {
    Filename: string;
    "Uploaded On": string;
};

const tableHead: (keyof TableRow)[] = [
   "Filename",
    "Uploaded On"
];

const tableData: TableRow[] = [
    {
        Filename: "ExampleFile.pdf",
        "Uploaded On": "July 6, 2024"
    },
    {
        Filename: "Document.docx",
       "Uploaded On": "July 5, 2024"
    },
    {
        Filename: "Image.png",
      "Uploaded On": "July 4, 2024"
    }
];

const Table: React.FC = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-[#9291A5] uppercase bg-[#FFFFFF] dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {tableHead.map((heading) => (
                            <th key={heading} scope="col" className="px-6 py-3 bg-[#F0F0F2]">
                                {heading}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3 bg-[#F0F0F2]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-[#1D1C2B]">
                            {tableHead.map((heading) => (
                                <td key={heading} className="px-6 py-4">
                                    {row[heading]}
                                </td>
                            ))}
                            <td className="px-6 py-4 flex gap-2">
                                <button className="focus:outline-none">
                                    <Image src={download} alt="Edit" width={20} height={20} />
                                </button>
                                <button className="focus:outline-none">
                                    <Image src={icond } alt="Delete" width={20} height={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
