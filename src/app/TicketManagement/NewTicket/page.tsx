"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import addticket from "../../../../public/images/add.svg";
import Bell from "../../../../public/images/bell.svg";
import userBg from "../../../../public/images/User.svg";
import breadcrumbArrow from "../../../../public/images/BreadcrumbArrow.svg";
import DropdownArrow from "../../../../public/images/dropdown.svg"
import Link from "next/link";
import { Button } from "@headlessui/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Delete from "../../../../public/images/delete_white.svg";

export default function Page() {
  const [ticketType, setTicketType] = useState("Select Ticket Type");
  const [priority, setPriority] = useState("Select Priority");
  const [subject, setSubject] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [text, setText] = useState('');
  const [editorHtml, setEditorHtml] = useState("");

  const [errors, setErrors] = useState({
    ticketType: false,
    priority: false,
    subject: false,
    requestDetails: false,
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const handleTextAreaChange = (html: string) => {
    console.log("Text Area Changed:", html);
    setEditorHtml(html);
    setErrors({ ...errors, requestDetails: false });
  };

  const [loading, setLoading] = useState(false);

  const handleTicketTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketType(e.target.value);
    setErrors({ ...errors, ticketType: false });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
    setErrors({ ...errors, priority: false });
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    setErrors({ ...errors, subject: false });
  };

  const handleRequestDetailsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRequestDetails(e.target.value);
    setErrors({ ...errors, requestDetails: false });
  };

  const handleAddNewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleFileDelete = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setTicketType("Select Ticket Type");
    setPriority("Select Priority");
    setSubject("");
    setRequestDetails("");
    setSelectedFiles([]);
    setErrors({
      ticketType: false,
      priority: false,
      subject: false,
      requestDetails: false,
    });
  };

  const validateForm = () => {
    let valid = true;
    if (ticketType === "Select Ticket Type") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ticketType: true,
      }));
      valid = false;
    }
    if (priority === "Select Priority") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        priority: true,
      }));
      valid = false;
    }
    if (subject.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subject: true,
      }));
      valid = false;
    }
    if (requestDetails.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        requestDetails: true,
      }));
      valid = false;
    }
    return valid;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("ticket_type", ticketType);
      formData.append("priority", priority);
      formData.append("subject", subject);
      formData.append("details", requestDetails);
      selectedFiles.forEach((file) => formData.append("files", file));

      try {
        const response = await axios.post(
          "http://localhost:8000/addNewTicket",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as needed
            },
          }
        );
        toast.success("New Ticket Added Successfully");

        handleCancel();
      } catch (error) {
        console.error("Error adding new ticket:", error);
      }
    }
  };

  return (
    <div>
      <Toaster />
      {/* <div className="flex items-center justify-between shadow-md p-8 sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-3">
          <div className="text-[#2A2C3E] text-xl">
            <Link href="/TicketManagement">Ticket Management </Link>
          </div>
          <div>
            <Image src={breadcrumbArrow} alt="breadcrumb" width={25} />
          </div>
          <div className="text-[#2A2C3E] text-xl">New Ticket</div>
          <div>
            <Image src={breadcrumbArrow} alt="breadcrumb" width={25} />
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <div>
            <Image src={Bell} alt="Notification Bell" width={25} />
          </div>
          <div>
            <Image src={userBg} alt="User" width={50} />
          </div>
        </div>
      </div> */}

      <div className="px-3 py-4 lg:p-7 mx-5 my-8 bg-[#F9F9F9] lg:rounded-md h-full shadow-md">
        <div className="text-[#2A2C3E] text-2xl mb-6">New Ticket</div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="lg:grid lg:grid-cols-2 gap-3">
            <div>
              <label htmlFor="ticketType" className="block text-[#5E626C] pb-2 pt-3 lg:pt-0">
                Ticket Type <span className="text-red-600 text-md">*</span>
              </label>
              <div className="flex items-center border border-gray-300 bg-white rounded-md">
                <select
                  id="ticketType"
                  name="ticketType"
                  value={ticketType}
                  onChange={handleTicketTypeChange}
                  className={`mt-1 text-[#5E626C] w-full p-2 px-3 bg-white rounded-md appearance-none focus:outline-none ${
                    errors.priority ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="Select Priority">Choose Ticket Type</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Type 3">Type 3</option>
                </select>
                {errors.ticketType && (
                  <p className="text-red-500 text-xs mt-1">
                    Please select a ticket type
                  </p>
                )}
                <div className="pr-3">
                  <Image src={DropdownArrow} alt="drop" width={20} />
                </div>
              </div>
            </div>

            <div className="">
              <label htmlFor="priority" className="block text-[#5E626C] pb-2 pt-3 lg:pt-0">
                Priority <span className="text-red-600 text-md">*</span>
              </label>
              <div className="flex items-center border border-gray-300 bg-white rounded-md">
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={handlePriorityChange}
                  className={`mt-1 text-[#5E626C] w-full p-2 px-3 bg-white rounded-md appearance-none focus:outline-none ${
                    errors.priority ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="Select Priority">Choose Priority Type</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-xs mt-1">
                    Please select a priority
                  </p>
                )}
                <div className="pr-3">
                  <Image src={DropdownArrow} alt="drop" width={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="subject" className="block text-[#5E626C] pb-2">
              Subject <span className="text-red-600 text-md">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              placeholder="Enter Subject"
              onChange={handleSubjectChange}
              className={`mt-1 text-[#5E626C] w-full p-2 px-3 border bg-white rounded-md ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a subject
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="requestDetails"
              className="block text-[#5E626C] pb-2"
            >
              Request Details <span className="text-red-600 text-md">*</span>
            </label>
            <textarea
              id="requestDetails"
              name="requestDetails"
              rows={4}
              value={requestDetails}
              placeholder="Enter request details"
              onChange={handleRequestDetailsChange}
              className={`mt-1 text-[#5E626C] w-full p-2 px-3 border bg-white rounded-md ${
                errors.requestDetails ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.requestDetails && (
              <p className="text-red-500 text-xs mt-1">
                Please enter request details
              </p>
            )}
          </div>

          <div className="rounded-md bg-[#F0ECFB] lg:p-8 p-3">
            <div className="flex justify-between items-center ">
              <div>
                <h1 className="text-md font-medium text-lg">Attach files</h1>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleAddNewClick}
              >
                <div>
                  <Image src={addticket} alt="Add new" width={20} />
                </div>
                <div className="text-[#5027D9] text-lg">Add new</div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <div className="rounded-md bg-[#F0ECFB]">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
              <div className="mt-4">
                {selectedFiles.length > 0 && (
                  <div>
                    <h2 className="text-md font-medium text-lg"></h2>
                    <div className="lg:grid lg:grid-cols-3 gap-8">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-white border-2 border-[#D9D9D9] rounded-xl shadow-md mb-3"
                        >
                          <span className="text-black text-sm py-3 px-2 lg:py-4 lg:px-3">
                            {file.name}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => handleFileDelete(index)}
                            className="bg-[#5027D9] rounded-r-md border-r lg:py-4 lg:px-3 py-3 px-2"
                          >
                            <Image src={Delete} alt="delete" width={25}/>
                          </button>
                          </div>
                          
                        
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-5 lg:justify-end">
            <div>
              <Button
                type="button"
                onClick={handleCancel}
                className="flex rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] items-center gap-2 border-[#5027D9] border-2"
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                className="flex rounded bg-[#5027D9] py-3 px-7 text-sm text-white items-center gap-2"
              >
                Raise ticket
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
