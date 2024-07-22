"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import axios, { AxiosResponse } from "axios";
import { useRouter, usePathname } from "next/navigation";
import addticket from "../../../../../public/images/add.svg";
import sendComment from "../../../../../public/images/sendComment.svg";
import sendAttachment from "../../../../../public/images/Attachment.svg";
import { base_url } from "@/utils/constant";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/Components/common/Loader";

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

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const value = parts[parts.length - 1];

  const tabClasses = ({ selected }: { selected: boolean }) =>
    `px-4 py-2 text-sm font-medium focus:outline-none ${
      selected ? "text-[#5027D9] border-b-2 border-[#5027D9]" : "text-gray-500"
    }`;

  useEffect(() => {
    fetchTickets();
    fetchComments();
  }, []);

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

      setComments(response.data.ticket);

      console.log("response", response);
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
        const user = response.data.user;

        setTicketId(ticketDetails.id);
        setTicketType(ticketDetails.ticket_type);
        setCreatedOn(new Date(ticketDetails.createdAt).toLocaleDateString());
        setPriority(ticketDetails.priority);
        setStatus(ticketDetails.status);
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

  // Render section Script for rendering html to normal
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

  return (
    <div className="">
      <Toaster />
      <div className="bg-[#F9F9F9] p-10 m-10 rounded-md">
        <div className="text-[#2A2C3E] text-2xl mb-6">View Ticket</div>

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
            <div className="text-base font-medium">
              Total Hours Logged on Tickets
            </div>
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
              <p className="text-base py-5 text-[#7D7D7D]">{assignedTo}</p>
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
              Events content goes here.
            </TabPanel>

            <TabPanel className="p-5 lg:p-7 bg-white">
              <div className="bg-[#F9F9F9] p-10 m-10 rounded-md">
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
                        {/* Assuming there are no attachments in the provided response */}
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
    </div>
  );
};

export default Page;
