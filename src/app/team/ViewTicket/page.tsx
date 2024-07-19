'use client'
import React, { useState } from 'react';
import Image from 'next/image';

import TabThree from "../../../Components/common/TabThree"
// import Model from "../../../Components/common/Model";
import edit from "../../../../public/images/edit.svg"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import close from "../../../../public/images/close.svg"
import AttachmentTable from "../../../Components/common/AttachmentTable"
import NextBreadCrumb from "../../../Components/common/NextBreadCrumb";

type Ticket = {
    id: string;
    type: string;
    createdOn: string;
    priority: string;
    status: string;
    totalHours: string;
    raisedBy: string;
    assignedTo: string;
    subject: string;
    requestDetails: string;
};

type Props = {
    role: 'manager' | 'teamMember'; // Define the role prop
    ticket: Ticket; // Pass ticket data as prop
};

const ViewTicketPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const breadcrumbItems = [
        { href: '/team/TicketManagement', label: 'Ticket Management' },
        { label: 'View Ticket' }
      ];
    // Mock ticket data (replace with actual data fetching logic)
    const ticket = {
        id: '#1234',
        type: 'Bug',
        createdOn: 'January 9, 2022',
        priority: 'High',
        status: 'Open',
        totalHours: '5 hours',
        raisedBy: 'John Doe',
        assignedTo: 'Jane Smith',
        subject: 'I ssue with login functionality',
        requestDetails: 'User is unable to log in with correct credentials. The issue seems to be related to the authentication service.'
    };

    return (
        <div>
            <NextBreadCrumb items={breadcrumbItems} />
       
            {/* Dashboard Header */}
            {/* <div className='flex justify-between p-6 bg-[#FFFFFF] drop-shadow-md'>
                <h1 className="font-medium text-xl">View Ticket</h1>
                <div className='flex space-x-4'>
                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center">
                        <Image src={bell} alt="Bell Icon" width={20} height={20} />
                    </div>
                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center"></div>
                </div>
            </div> */}

            {/* View Ticket Section */}

            <div className="p-8">
                <div className=' p-6 bg-[#F9F9F9] drop-shadow-md'>
                    <div className="flex justify-between items-center mb-8 ">
                        <h1 className="text-2xl font-semibold text-[#222222]">View Ticket</h1>
                        <button
                            className="bg-[#5027D9] text-white py-2 px-4 rounded"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Change status
                        </button>
                    </div>

                    {/* Ticket Info */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Ticket ID:</p>
                            <p className="text-[#7D7D7D]">{ticket.id}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Ticket Type:</p>
                            <p className="text-[#7D7D7D]">{ticket.type}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Created On:</p>
                            <p className="text-[#7D7D7D]">{ticket.createdOn}</p>
                        </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Priority:</p>
                            <p className="text-[#7D7D7D]">{ticket.priority}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Status:</p>
                            <p className="text-[#7D7D7D]">{ticket.status}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Total Hours Logged:</p>
                            <p className="text-[#7D7D7D]">{ticket.totalHours}</p>
                        </div>
                    </div>

                    {/* Raised By & Assigned To */}
                    <div className="grid grid-cols-3 ">
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Raised By:</p>
                            <p className="text-[#7D7D7D]">{ticket.raisedBy}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Assigned To:</p>
                            <div className='flex space-x-3'>
                                <p className="text-[#7D7D7D]">{ticket.assignedTo}</p>
                                <Image onClick={() => setIsModalOpen1(true)} src={edit} alt="Small Image" width={20} height={20} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-8'>
                <div className="bg-[#F9F9F9] p-6 drop-shadow-md">
                    <div className='flex flex-col'>
                        <p className="text-[#2A2C3E] font-medium">Subject</p>
                        <p className="text-[#7D7D7D] mt-2">{ticket.subject}</p>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <p className="text-[#2A2C3E] font-medium">Request Details</p>
                        <p className="text-[#7D7D7D] font-normal mt-2">{ticket.requestDetails}</p>
                    </div>
                </div>
            </div>
            <div className='p-8'>

                <div className='flex flex-col'>
                    <div className="bg-[#F9F9F9] p-6 drop-shadow-md">
                        <p className="text-[#393939] font-medium">Activity</p>
                    </div>
                </div>
                <div className="bg-[#FFFFFF] p-6 drop-shadow-md">

                    <TabThree />
                </div>

            </div>

            {/* Modal for Change Status */}
            {/* <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}

            <Dialog open={isModalOpen1} onClose={() => setIsModalOpen1(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="bg-white p-8 rounded shadow-lg z-50 w-[43em]">
                        <div className="flex justify-between items-center mb-10">

                            <DialogTitle className="text-xl font-semibold">Assign to your team member</DialogTitle>
                            <button onClick={() => setIsModalOpen1(false)} className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300">
                                <Image src={close} alt="Close Icon" width={16} height={16} />
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700">Enter your team member name</label>

                                <select id="status" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2 text-gray-700">
                                    <option value="Name ">Name</option>

                                </select>
                            </div>



                            <div className="flex justify-end mt-20">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen1(false)}
                                    className="mr-2 px-5 py-2  text-[#5027D9] border-2 border-[#5027D9] rounded-lg "
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Add your deactivate logic here
                                        setIsModalOpen1(false);
                                    }}
                                    className="px-5 py-2 bg-[#5027D9] text-white rounded-lg text-sm"
                                >
                                    Close Ticket
                                </button>
                            </div>
                        </form>

                    </DialogPanel>
                </div>
            </Dialog>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="bg-white p-8 rounded shadow-lg z-50 w-[43em]">
                        <div className="flex justify-between items-center mb-10">

                            <DialogTitle className="font-bold text-xl text-[#222222]">Change status</DialogTitle>
                            <button onClick={() => setIsModalOpen(false)} className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300">
                                <Image src={close} alt="Close Icon" width={16} height={16} />
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700">Choose status*</label>

                                <select id="status" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2 text-gray-700">
                                    <option value="Open ">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed bg-[#F0FFF8] text-[#00974F]" className='bg-[#F0FFF8] text-[#00974F] w-2'>Closed</option>
                                </select>
                                <div className="mb-4">
                                    <label htmlFor="totalHours" className="block text-gray-700 mt-4">Enter total hours logged*</label>
                                    <input type="text" id="totalHours" name="totalHours" className="w-full px-3 py-2 border rounded-lg focus:outline-none" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="additionalNotes" className="block text-gray-700">Additional notes</label>
                                    <textarea id="additionalNotes" name="additionalNotes" rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none"></textarea>
                                </div>

                                {/* <div className="flex justify-end">
                                    <button type="button" className="mr-2 px-5 py-2  text-[#5027D9] border-2 border-[#5027D9] rounded-lg " onClick={onClose}>Cancel</button>
                                    <button type="submit" className="px-5 py-2 bg-[#5027D9] text-white rounded-lg text-sm">Close Ticket</button>
                                </div> */}
                            </div>



                            <div className="flex justify-end mt-20">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-2 px-5 py-2  text-[#5027D9] border-2 border-[#5027D9] rounded-lg "
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Add your deactivate logic here
                                        setIsModalOpen(false);
                                    }}
                                    className="px-5 py-2 bg-[#5027D9] text-white rounded-lg text-sm"
                                >
                                    Close Ticket
                                </button>
                            </div>
                        </form>

                    </DialogPanel>
                </div>
            </Dialog>
           

       </div>

    );
};

export default ViewTicketPage;
