'use client'
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { useRouter,usePathname } from 'next/navigation';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axios, { AxiosResponse } from "axios";
import TabThree from "../../../../Components/common/TabThree";
import AttachmentTable from "../../../../Components/common/AttachmentTable";
import NextBreadCrumb from "../../../../Components/common/NextBreadCrumb";

import edit from "../../../../../public/images/edit.svg";
import close from "../../../../../public/images/close.svg";
import { base_url } from "@/utils/constant";

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

const ViewTicketPage: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
  const [ticketId, setTicketId] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [raisedBy, setRaisedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    
    const router = useRouter();

    const pathname = usePathname();
    const parts = pathname.split("/");
    const value = parts[parts.length - 1];

    
    // Mock ticket data (replace with actual data fetching logic)
    // const ticket: Ticket = {
    //     id: '#1234',
    //     type: 'Bug',
    //     createdOn: 'January 9, 2022',
    //     priority: 'High',
    //     status: 'Open',
    //     totalHours: '5 hours',
    //     raisedBy: 'John Doe',
    //     assignedTo: 'Jane Smith',
    //     subject: 'Issue with login functionality',
    //     requestDetails: 'User is unable to log in with correct credentials. The issue seems to be related to the authentication service.'
    // };

    useEffect(() => {
        fetchTickets();
      }, []);
    
      const fetchTickets = async () => {
        try {
          const response: AxiosResponse<any> = await axios.get(
            `${base_url}/viewTicket/${value}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    
          if (response) {
            console.log(response.data.body[0])
            // const ticketDetails = response.data.ticketDetails[0];
            // console.log("tt", ticketDetails);
            // const user = response.data.user;
    
            setTicketId(response.data.body[0].id);
            setTicketType(response.data.body[0].ticket_type);
            setCreatedOn(new Date(response.data.body[0].createdAt).toLocaleDateString());
            setPriority(response.data.body[0].priority);
            setStatus(response.data.body[0].status);
            setRaisedBy(response.data.body[0].customer_name);
            setSubject(response.data.body[0].subject);
            setDescription(response.data.body[0].details);
    
            const filesData = response.data.ticketDetails[0].details_images_url.map(
              (url: string, index: number) => ({
                filename: `File ${index + 1}`,
                uploadedOn: new Date().toLocaleDateString(),
                fileUrl: url,
              })
            );
          
          }
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      };
    
      
     
    

    return (
        <div>
            

            {/* View Ticket Section */}
            <div className="p-8">
                <div className='p-6 bg-[#F9F9F9] drop-shadow-md'>
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-semibold text-[#222222]">View Ticket</h1>
                        <button
                            className="bg-[#5027D9] text-white py-2 px-4 rounded"
                            onClick={() => setIsStatusModalOpen(true)}
                        >
                            Change status
                        </button>
                    </div>

                    {/* Ticket Info */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Ticket ID:</p>
                            <p className="text-[#7D7D7D]">{ticketId}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Ticket Type:</p>
                            <p className="text-[#7D7D7D]">{ticketType}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Created On:</p>
                            <p className="text-[#7D7D7D]">{createdOn}</p>
                        </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Priority:</p>
                            <p className="text-[#7D7D7D]">{priority}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Status:</p>
                            <p className="text-[#7D7D7D]">{status}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Total Hours Logged:</p>
                            <p className="text-[#7D7D7D]">{totalHours}</p>
                        </div>
                    </div>

                    {/* Raised By & Assigned To */}
                    <div className="grid grid-cols-3">
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Raised By:</p>
                            <p className="text-[#7D7D7D]">{raisedBy}</p>
                        </div>
                        <div>
                            <p className="text-[#2A2C3E] font-medium">Assigned To:</p>
                            <div className='flex space-x-3'>
                                <p className="text-[#7D7D7D]">{assignedTo}</p>
                                <Image 
                                    src={edit} 
                                    alt="Edit Icon" 
                                    width={20} 
                                    height={20} 
                                    onClick={() => setIsAssignModalOpen(true)} 
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-8'>
                <div className="bg-[#F9F9F9] p-6 drop-shadow-md">
                    <div className='flex flex-col'>
                        <p className="text-[#2A2C3E] font-medium">Subject</p>
                        <p className="text-[#7D7D7D] mt-2">{subject}</p>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <p className="text-[#2A2C3E] font-medium">Request Details</p>
                        <p className="text-[#7D7D7D] font-normal mt-2">{description}</p>
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
            <Dialog open={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="bg-white p-8 rounded shadow-lg z-50 w-[43em]">
                        <div className="flex justify-between items-center mb-10">
                            <DialogTitle className="font-bold text-xl text-[#222222]">Change status</DialogTitle>
                            <button onClick={() => setIsStatusModalOpen(false)} className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300">
                                <Image src={close} alt="Close Icon" width={16} height={16} />
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-gray-700">Choose status*</label>
                                <select id="status" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2 text-gray-700">
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed" className='bg-[#F0FFF8] text-[#00974F]'>Closed</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="totalHours" className="block text-gray-700 mt-4">Enter total hours logged*</label>
                                <input type="text" id="totalHours" name="totalHours" className="w-full px-3 py-2 border rounded-lg focus:outline-none" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="additionalNotes" className="block text-gray-700">Additional notes</label>
                                <textarea id="additionalNotes" name="additionalNotes" rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none"></textarea>
                            </div>
                            <div className="flex justify-end mt-20">
                                <button
                                    type="button"
                                    onClick={() => setIsStatusModalOpen(false)}
                                    className="mr-2 px-5 py-2 text-[#5027D9] border-2 border-[#5027D9] rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => setIsStatusModalOpen(false)}
                                    className="px-5 py-2 bg-[#5027D9] text-white rounded-lg text-sm"
                                >
                                    Change Status
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Modal for Assigning */}
            <Dialog open={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="bg-white p-8 rounded shadow-lg z-50 w-[43em]">
                        <div className="flex justify-between items-center mb-10">
                            <DialogTitle className="font-bold text-xl text-[#222222]">Assign To</DialogTitle>
                            <button onClick={() => setIsAssignModalOpen(false)} className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300">
                                <Image src={close} alt="Close Icon" width={16} height={16} />
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="assignTo" className="block text-gray-700">Choose person*</label>
                                <select id="assignTo" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2 text-gray-700">
                                    <option value="Jane Smith">Jane Smith</option>
                                    <option value="John Doe">John Doe</option>
                                    <option value="Alice Johnson">Alice Johnson</option>
                                    <option value="Bob Brown">Bob Brown</option>
                                </select>
                            </div>
                            <div className="flex justify-end mt-20">
                                <button
                                    type="button"
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="mr-2 px-5 py-2 text-[#5027D9] border-2 border-[#5027D9] rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="px-5 py-2 bg-[#5027D9] text-white rounded-lg text-sm"
                                >
                                    Assign
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
