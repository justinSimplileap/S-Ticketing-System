"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import axios, { AxiosResponse } from "axios";
import { useRouter, usePathname } from "next/navigation";
import addticket from "../../../../../../public/images/add.svg";
import sendComment from "../../../../../../public/images/sendComment.svg";
import sendAttachment from "../../../../../../public/images/Attachment.svg";
import { base_url } from "@/utils/constant";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/Components/common/Loader";
import Ellipse from "../../../../../../public/images/Ellipse262.svg";
import close from "../../../../../../public/images/close.svg";
import edit from "../../../../../../public/images/edit.svg";

interface UploadedFile {
  filename: string;
  fileUrl: string;
  uploadedOn: string;
}

interface Comment {
  user: string;
  text: string;
  attachments: File[];
  comment_description: string;
  comment_by: string;
  commentedOn: string;
}

type User = {
  company_legal_name: string;
};

type Member = {
  id: number;
  customer_name: string;
};

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

const Page: React.FC = () => {
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
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [commentedOn, setCommentedOn] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<string>("");
  const [formTotalHours, setFormTotalHours] = useState(totalHours);
  const [formAdditionalNotes, setFormAdditionalNotes] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const value = parts[parts.length - 1];

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

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

  const tabClasses = ({ selected }: { selected: boolean }) =>
    `px-4 py-2 text-sm font-medium focus:outline-none ${
      selected ? "text-[#5027D9] border-b-2 border-[#5027D9]" : "text-gray-500"
    }`;

  useEffect(() => {
    fetchTickets();
    fetchComments();
    fetchUser();
    fetchEvents();
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
        `${base_url}/superAdminFetchComments/${value}`,
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
        `${base_url}/viewTicketDetails/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        const ticketDetails = response.data.ticketDetails[0];
        console.log("these are details n", ticketDetails);
        const user = response.data.user;

        setTicketId(ticketDetails.id);
        setTicketType(ticketDetails.ticket_type);
        setCreatedOn(new Date(ticketDetails.createdAt).toLocaleDateString());
        setPriority(ticketDetails.priority);
        setStatus(ticketDetails.status);
        setTotalHours(ticketDetails.hours_logged);
        setAssignedTo(ticketDetails.assigned_to);
        setRaisedBy(user.customer_name);
        setSubject(ticketDetails.subject);
        setDescription(ticketDetails.details);

        const uploadedFiles = ticketDetails.details_images_url.map(
          (url: string) => {
            const filename = url.split("/").pop();
            const uploadedOn = new Date(
              ticketDetails.createdAt
            ).toLocaleDateString();
            return { filename, fileUrl: url, uploadedOn };
          }
        );

        setUploadedFiles(uploadedFiles);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
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
      location.reload()
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

  const updateTicket = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleAssign = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedPerson === null) {
      alert("Please select a team member.");
      return;
    }

    const selectedMember = teamMembers.find(
      (member) => member.id === selectedPerson
    );

    if (selectedMember) {
      console.log("Assigned to:", selectedMember.customer_name);

      setAssignedTo(selectedMember.customer_name);
      setIsAssignModalOpen(false);

      try {
        const response = await axios.put(
          `${base_url}/updateTicket/${ticketId}`,
          {
            assignedTo: selectedMember.customer_name,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Ticket updated:", response.data);
        toast.success("Ticket updated successfully!");
      } catch (error) {
        console.error("Error updating ticket:", error);
        toast.error("Failed to update the ticket.");
      }
    } else {
      alert("Selected member not found.");
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${base_url}/users/Organisation`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="">
      <Toaster />
      <div className="bg-[#F9F9F9] p-10 m-10 rounded-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-[#222222]">View Ticket</h1>
          <button
            className="bg-[#5027D9] text-white py-2 px-4 rounded"
            onClick={() => setIsStatusModalOpen(true)}
          >
            Change status
          </button>
        </div>
        <div className="grid grid-cols-3 py-5">
          <div className="pb-5">
            <div className="text-base font-medium">Ticket ID</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">{ticketId}</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Ticket Type</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">{ticketType}</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Created On</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">{createdOn}</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Priority</div>
            <div>
              <p className={`text-base py-5 ${getPriorityColor(priority)}`}>
                {priority}
              </p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Status</div>
            <div>
              <p className={`text-base py-5 ${getStatusColor(status)}`}>
                {status}
              </p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Hours Logged</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">{totalHours}</p>
            </div>
          </div>

          <div className="">
            <div className="text-base font-medium">Raised By</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">{raisedBy}</p>
            </div>
          </div>

          <div className="">
            <div className="text-base font-medium">Assigned To</div>
            <div>
              <div className="flex space-x-3">
                <p className="text-base py-5 text-[#7D7D7D]">{assignedTo}</p>
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
          <div className="">
            <div className="text-base font-medium">Project Name</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">{projectName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F9F9] p-10 m-10 rounded-md">
        <div className="pb-10">
          <div className="text-base font-medium pb-2">Subject</div>
          <div>
            <p className="text-sm text-[#7d7d7d] font-light">{subject}</p>
          </div>
        </div>

        <div className="">
          <div className="text-base font-medium pb-2">Request Details</div>
          <div>
            <p className="text-sm text-[#7d7d7d] font-light">
              {renderSections(description)}
            </p>
          </div>
        </div>
      </div>

      <div className="m-10 rounded-md">
        <div className="p-10 bg-[#F9F9F9] text-base font-medium rounded-md">
          Activity
        </div>

        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-1 bg-white p-3 px-7 cursor-pointer">
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
            <TabPanel className="p-10 bg-white">
              <div className="p-4">
                <div className="bg-[#F9F9F9] p-10 m-3 rounded-md">
                  <div className="grid gap-5">
                    <div className="pb-5 w-full">
                      <div className="text-base font-medium">Events</div>
                      <div>
                        {events.length > 0 ? (
                          <ul className="space-y-2">
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
                                    className="text-[#5027D9] flex items-center space-x-2 cursor-pointer w-full"
                                  >
                                    <Image
                                      src={Ellipse}
                                      alt="ellipse"
                                      width={15}
                                      height={15}
                                    />
                                    <span>{event.event_details}</span>
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
              <div className="bg-[#F9F9F9] p-10 m-5 rounded-md">
                <div className="text-base font-medium pb-5">Comments</div>
                <div>
                  {comments.map((comment: Comment, index: number) => (
                    <div
                      key={index}
                      className="pb-5 flex justify-start items-center"
                    >
                      <div className="bg-[#041444] rounded-full w-12 h-12 flex items-center justify-center text-white mr-6">
                        {comment.comment_by.charAt(0)}
                      </div>
                      <div className="flex w-full justify-between">
                        <div>
                          <p className="font-bold text-[#4B4B4B]">
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
                          className="bg-white text-white lg:p-4 rounded-md border-[#5027D9] border"
                          onClick={handleAddAttachment}
                        >
                          <Image src={sendAttachment} alt="" width={25} />
                        </button>
                      </label>
                    </div>
                    <div className="">
                      <button
                        onClick={handleAddComment}
                        className="bg-[#5027D9] text-white p-4 rounded border-[#5027D9] border"
                      >
                        <Image src={sendComment} alt="" width={25} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="p-7 bg-white">
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold">All Uploaded Files</div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div>
                    <Image src={addticket} alt="Add new" width={20} />
                  </div>
                  <div className="text-[#5027D9] text-lg">Add new</div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Filename
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Uploaded On
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Download</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {uploadedFiles.map((file, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {file.filename}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.uploadedOn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            downloadFile(file.fileUrl, file.filename)
                          }
                          className="text-[#5027D9] hover:text-[#5027D9] underline"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>

      {/* change status popup */}

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
            <form onSubmit={updateTicket}>
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

      {/* assign team member popup */}

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
                    Select a team Member
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
    </div>
  );
};

export default Page;
