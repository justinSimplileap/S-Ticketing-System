"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios, { AxiosResponse } from "axios";
// import TabThree from "../../../../Components/common/TabThree";
// import AttachmentTable from "../../../Components/common/AttachmentTable";
// import NextBreadCrumb from "../../../../Components/common/NextBreadCrumb";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import addticket from "../../../../../../public/images/add.svg";
import sendComment from "../../../../../../public/images/sendComment.svg";
import sendAttachment from "../../../../../../public/images/Attachment.svg";
import { base_url } from "@/utils/constant";
import edit from "../../../../../../public/images/edit.svg";
import close from "../../../../../../public/images/close.svg";
import Ellipse from "../../../../../../public/images/Ellipse262.svg";
import toast, { Toaster } from "react-hot-toast";
interface UploadedFile {
  filename: string;
  fileUrl: string;
  uploadedOn: string;
}

type User = {
  company_legal_name: string;
};
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
  customer_name: string;
};
type Member = {
  id: number;
  customer_name: string;
};

interface Comment {
  user: string;
  text: string;
  attachments: File[];
  comment_description: string;
  comment_by: string;
  commentedOn: string;
}

interface Event {
  id: number;
  user_id: string;
  ticket_id: number;
  organization_id: string;
  company_legal_name: string;
  event_by: string;
  event_details: string;
  createdAt: string;
  updatedAt: string;
}

const ViewTicketPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ticketId, setTicketId] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [customer_name, setRaisedBy] = useState("");
  const [assigned_to, setAssignedTo] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<string>("");
  const [formTotalHours, setFormTotalHours] = useState(totalHours);
  const [formAdditionalNotes, setFormAdditionalNotes] = useState("");
  const [projectName, setProjectName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [commentedOn, setCommentedOn] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");


   console.log("Current formStatus:", formStatus);

  const handleHoursChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setHours(value);
  };

  const handleMinutesChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value >= 0 && value < 60) {
      setMinutes(value);
    }
  };
  console.log("teamMembers: ", teamMembers);

  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const value = parts[parts.length - 1];

  const tabClasses = ({ selected }: { selected: boolean }) =>
    `px-4 py-2 text-sm font-medium focus:outline-none ${
      selected ? "text-[#5027D9] border-b-2 border-[#5027D9]" : "text-gray-500"
    }`;

  useEffect(() => {
    fetchComments();
    fetchUser();
    fetchEvents();
    fetchTickets();
    fetchMembers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get<{ event: Event[] }>(
        `${base_url}/getEventDetails/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        console.log(response.data.event);
        setEvents(response.data.event);
        console.log("events", events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

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
        setProjectName(response.data.user.company_legal_name);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${base_url}/fetchComments/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const commentsData = response.data.ticket.map((comment: any) => ({
        ...comment,
        commentedOn: new Date(comment.createdAt).toLocaleString(),
      }));

      setComments(commentsData.reverse());
    } catch (error) {}
  };

  const fetchTickets = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${base_url}/ViewTickets/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        console.log("sss", response.data.body[0]);
        const ticketDetails = response.data.body[0];
        // const ticketDetails = response.data.body[0].;
        // // console.log("tt", ticketDetails);
        // // const user = response.data.user;

        setTicketId(response.data.body[0].id);
        setTicketType(response.data.body[0].ticket_type);
        setCreatedOn(
          new Date(response.data.body[0].createdAt).toLocaleDateString()
        );
        setPriority(response.data.body[0].priority);
        setStatus(response.data.body[0].status);
        setAssignedTo(ticketDetails.assigned_to);
        setRaisedBy(response.data.body[0].customer_name);
        setSubject(response.data.body[0].subject);
        setDescription(response.data.body[0].details);
        setProjectName(ticketDetails.company_legal_name);
        setTotalHours(ticketDetails.hours_logged);

        const filesData = response.data.body[0].details_images_url.map(
          (url: string) => {
            const filename = url.split("/").pop();
            const uploadedOn = new Date(
              ticketDetails.createdAt
            ).toLocaleDateString();
            return { filename, fileUrl: url, uploadedOn };
          }
        );

        console.log("filesData", filesData);
        setUploadedFiles(filesData);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${base_url}/teamMembers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        console.log("response: ", response);
        console.log(response.data);
        setTeamMembers(response.data);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const downloadFile = (url: string, filename: string) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/octet-stream",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Download error:", error));
  };

  const renderSections = (content: string) => {
    const sections = content.split(/<\/?h[1-6]>/g);
    return sections.map((section, index) => (
      <div key={index}>
        {section.startsWith("<h") ? (
          <h2
            className="my-4 text-lg font-medium"
            dangerouslySetInnerHTML={{ __html: section }}
          />
        ) : (
          <p dangerouslySetInnerHTML={{ __html: section }} />
        )}
      </div>
    ));
  };

  const handleAddComment = async () => {
    try {
      const formData = new FormData();

      formData.append("comment_description", newComment);

      attachments.forEach((file) => {
        formData.append("attachment", file);
      });

      const response = await axios.post(
        `${base_url}/addComment/${value}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Comment Added successfully");

      console.log("Comment added successfully:", response.data);
      fetchComments();
      setNewComment("");
      setAttachments([]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddAttachment = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setAttachments(Array.from(event.target.files));
    }
  };

  const handleStatusChange = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("called");

    const formattedHours = hours.padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");
    const combinedValue = `${formattedHours}HRS${formattedMinutes}MINS`;
    console.log("Formatted Value to Save:", combinedValue);

    try {
      const response = await axios.put(
        `${base_url}/updateTicket/${ticketId}`,
        {
          status: formStatus,
          totalHours: combinedValue,
          additionalNotes: formAdditionalNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchTickets();
        setStatus(formStatus);
        setTotalHours(formTotalHours);
        setIsStatusModalOpen(false);
      }

      toast.success("Ticket updated successfully");
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("Failed to update ticket");
    }
  };

  const handleAssign = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedMember = teamMembers.find(
      (member) => member.id === selectedPerson
    );
    if (selectedMember) {
      console.log("Assigned to:", selectedMember.customer_name);
      // Here you can perform further actions, like sending the assigned person's data to the backend.
      setAssignedTo(selectedMember.customer_name); // Update the assignedTo state
      setIsAssignModalOpen(false); // Close the modal
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-300";
      case "medium":
        return "text-purple-300";
      case "low":
        return "text-green-300";
      default:
        return "text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-red-300";
      case "closed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      {/* <NextBreadCrumb items={breadcrumbItems} /> */}

      {/* View Ticket Section */}
      <div className="p-4 md:p-8">
        <div className="p-4 md:p-6 bg-[#F9F9F9] drop-shadow-md">
          <div className="flex flex-row md:flex-row justify-between items-start md:items-center mb-4 md:mb-8">
            <h1 className="text-lg md:text-2xl font-semibold text-[#222222] mb-4 md:mb-0">
              View Ticket
            </h1>
            <button
              className="bg-[#5027D9] text-white py-2 px-4 rounded"
              onClick={() => setIsStatusModalOpen(true)}
            >
              Change Status
            </button>
          </div>

          {/* Ticket Info */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 mb-4 md:mb-8 pt-2">
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Ticket ID:</p>
              <p className="text-[#7D7D7D]">{ticketId}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Ticket Type:</p>
              <p className="text-[#7D7D7D] md:inline">{ticketType}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[#2A2C3E] font-medium">Created On:</p>
              <p className="text-[#7D7D7D] md:inline">{createdOn}</p>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Priority:</p>
               <p className={`text-[#7D7D7D] md:inline ${getPriorityColor(priority)}`}>
                {priority}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Status:</p>
              <p className={`text-[#7D7D7D] md:inline ${getStatusColor(status)}`}>
                {status}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Total Hours Logged:</p>
              <p className="text-[#7D7D7D] md:inline">{totalHours}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Raised By:</p>
              <p className="text-[#7D7D7D] md:inline">{customer_name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Assigned To:</p>
              <p className="text-[#7D7D7D] md:inline">{assigned_to}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[#2A2C3E] font-medium">Project Name:</p>
              <p className="text-[#7D7D7D] md:inline">{projectName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="p-4 md:p-6 bg-[#F9F9F9] drop-shadow-md">
          <div className="flex flex-col">
            <p className="text-[#2A2C3E] font-medium">Subject</p>
            <p className="text-[#7D7D7D] mt-2">{subject}</p>
          </div>
          <div className="flex flex-col mt-6">
            <p className="text-[#2A2C3E] font-medium">Request Details</p>
            <p className="text-[#7D7D7D] font-normal mt-2">
              {" "}
              {renderSections(description)}
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Change Status */}
      <Dialog
        open={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="bg-white p-8 rounded shadow-lg z-50 w-[43em]">
            <div className="flex justify-between items-center mb-10">
              <DialogTitle className="font-bold text-xl text-[#222222]">
                Change status
              </DialogTitle>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300"
              >
                <Image src={close} alt="Close Icon" width={16} height={16} />
              </button>
            </div>
            <form onSubmit={handleStatusChange}>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700">
                  Choose status*
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2 text-gray-700"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                >
                   <option value="" disabled>Select status</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="totalHours"
                  className="block text-gray-700 mt-4"
                >
                  Enter total hours logged*
                </label>
                <input
                  type="text"
                  id="hours"
                  name="hours"
                  className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none"
                  value={hours}
                  onChange={handleHoursChange}
                  placeholder="Hours"
                />
                <input
                  type="text"
                  id="minutes"
                  name="minutes"
                  className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none"
                  value={minutes}
                  onChange={handleMinutesChange}
                  placeholder="Minutes"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="additionalNotes"
                  className="block text-gray-700"
                >
                  Additional notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  value={formAdditionalNotes}
                  onChange={(e) => setFormAdditionalNotes(e.target.value)}
                ></textarea>
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
      <Dialog
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="bg-white p-8 rounded shadow-lg z-50 w-[43em]">
            <div className="flex justify-between items-center mb-10">
              <DialogTitle className="font-bold text-xl text-[#222222]">
                Assign
              </DialogTitle>
              <Image
                src={close}
                alt="Close Icon"
                width={20}
                height={20}
                onClick={() => setIsAssignModalOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <form onSubmit={handleAssign}>
              <div className="flex items-center justify-center">
                <select
                  id="dropdown"
                  className="block w-full p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={selectedPerson || ""}
                  onChange={(e) => setSelectedPerson(Number(e.target.value))}
                >
                  <option value="" disabled>
                    Select a person
                  </option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.customer_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-10 flex justify-center space-x-10">
                <button
                  type="button"
                  className="bg-[#E4E4E4] text-[#000000] px-8 py-3 rounded-md"
                  onClick={() => setIsAssignModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5027D9] text-[#FFFFFF] px-8 py-3 rounded-md"
                >
                  Assign
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
      <div className="p-4 md:p-8 rounded-md ">
        <div className="md:p-8 p-4 bg-[#F9F9F9] text-base font-medium rounded-md">
          Activity
        </div>
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-1 bg-white md:p-4 cursor-pointer">
            <Tab as="div" className={tabClasses}>
              Events Timeline
            </Tab>
            <Tab as="div" className={tabClasses}>
              Comments
            </Tab>
            <Tab as="div" className={tabClasses}>
              Files
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className=" bg-white">
              <div className="sm:p-4 p-3">
                <div className="m-2 sm:m-3 rounded-md">
                  <div className="grid sm:gap-5 gap-3">
                    <div className="pb-3 sm:pb-5 w-full">
                      <div>
                        {events.length > 0 ? (
                          <ul className="space-y-2 whitespace-nowrap">
                            {events
                              .sort((a, b) => {
                                return (
                                  new Date(b.createdAt).getTime() -
                                  new Date(a.createdAt).getTime()
                                );
                              })
                              .map((event, index) => {
                                const eventDate = new Date(
                                  event.createdAt
                                ).toLocaleString();
                                return (
                                  <li
                                    key={index}
                                    className="text-[#5027D9] flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 cursor-pointer w-full"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <Image
                                        src={Ellipse}
                                        alt="ellipse"
                                        width={15}
                                        height={15}
                                      />
                                      <span>{event.event_details}</span>
                                    </div>
                                    <span className="text-gray-400">
                                      on {eventDate}
                                    </span>
                                  </li>
                                );
                              })}
                          </ul>
                        ) : (
                          <p className="text-gray-500">No events available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="p-5 lg:p-7 bg-white">
              <div className="  rounded-md">
                <div>
                  {comments.map((comment: Comment, index: number) => (
                    <div
                      key={index}
                      className="pb-5 flex justify-start items-center gap-2"
                    >
                      <div className="bg-[#041444] rounded-full md:w-12 md:h-12 w-10 h-8 flex items-center justify-center text-white md:mr-6">
                        {comment.comment_by.charAt(0)}
                      </div>
                      <div className="flex w-full justify-between gap-2">
                        <div>
                          <p className="font-bold text-[#4B4B4B] whitespace-nowrap">
                            {comment.comment_by}
                          </p>
                          <p className="text-[#4B4B4B]">
                            {comment.comment_description
                              .split(" ")
                              .map((word, idx) =>
                                word.startsWith("@") ? (
                                  <span
                                    key={idx}
                                    className="text-[#F5862D] font-bold"
                                  >
                                    {word}{" "}
                                  </span>
                                ) : (
                                  <span key={idx}>{word} </span>
                                )
                              )}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {comment.commentedOn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-end justify-between lg:mt-10 border rounded p-1 ">
                  <div className="w-full mr-2 m-auto">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                      className="w-full lg:p-4 focus:outline-none "
                    />
                    {attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-base font-medium">
                          Selected Attachments:
                        </p>
                        <div className="list-disc list-inside">
                          {attachments.map((file, index) => (
                            <div className="grid grid-cols-3" key={index}>
                              <div className="text-sm text-gray-500">
                                {file.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="attachment"
                        className="hidden"
                        onChange={handleAttachmentChange}
                        multiple
                      />
                      <label htmlFor="attachment" className="cursor-pointer">
                        <button
                          className="bg-white text-white p-4 rounded-md border-[#5027D9] border"
                          onClick={handleAddAttachment}
                        >
                          <Image
                            src={sendAttachment}
                            alt=""
                            width={25}
                            className="w-[40px] sm:w-[50px] md:w-[35px]"
                          />
                        </button>
                      </label>
                    </div>
                    <div className="">
                      <button
                        onClick={handleAddComment}
                        className="bg-[#5027D9] text-white p-4 rounded border-[#5027D9] border"
                      >
                        <Image
                          src={sendComment}
                          alt=""
                          width={25}
                          className="w-[40px] sm:w-[50px] md:w-[35px]"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="md:p-10 p-5 bg-white">
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold text-sm md:text-base">
                  All Uploaded Files
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 min-w-[500px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs text-gray-500 uppercase"
                      >
                        Filename
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs text-gray-500 uppercase"
                      >
                        Uploaded On
                      </th>
                      <th scope="col" className="relative px-2 py-2">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {uploadedFiles.map((file, index) => (
                      <tr key={index}>
                        <td className="px-2 py-1 text-xs text-gray-500 truncate max-w-[150px]">
                          {file.filename}
                        </td>
                        <td className="px-2 py-1 text-xs text-gray-500">
                          {file.uploadedOn}
                        </td>
                        <td className="px-2 py-1 text-xs text-right">
                          <button
                            onClick={() =>
                              downloadFile(file.fileUrl, file.filename)
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ViewTicketPage;
