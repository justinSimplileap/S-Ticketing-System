"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import addticket from "../../../../public/images/add.svg";
import Bell from "../../../../public/images/bell.svg";
import userBg from "../../../../public/images/User.svg";
import breadcrumbArrow from "../../../../public/images/BreadcrumbArrow.svg";
import DropdownArrow from "../../../../public/images/dropdown-arrow_svgrepo.com.svg";
import Link from "next/link";
import { Button } from "@headlessui/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/Components/common/Loader";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { base_url } from "@/utils/constant";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Page() {
  const [ticketType, setTicketType] = useState("Select Ticket Type");
  const [priority, setPriority] = useState("Select Priority");
  const [subject, setSubject] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [text, setText] = useState('');
  const [editorHtml, setEditorHtml] = useState("");
  const textInput = useRef(null);

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

  const handleTextAreaChange = (html: any) => {
    setEditorHtml(html);
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

  // const handleRequestDetailsChange = (
  //   e: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setRequestDetails(e.target.value);
  //   setErrors({ ...errors, requestDetails: false });
  // };

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

  // const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setText(e.target.value);
  //   setErrors({ ...errors, requestDetails: false });
  // };

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
    if (editorHtml.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        editorHtml: true,
      }));
      valid = false;
    }
    return valid;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("ticket_type", ticketType);
      formData.append("priority", priority);
      formData.append("subject", subject);
      formData.append("details", editorHtml);

      console.log({ selectedFiles });

      selectedFiles.forEach((file) => formData.append("files", file));

      try {
        const response = await axios.post(
          `${base_url}/addTickets`,
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
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="">
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

      <div className="p-10 mx-10 my-12 bg-[#F9F9F9] rounded-md h-screen shadow-md">
        <div className="text-[#2A2C3E] text-2xl mb-6">New Ticket</div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label htmlFor="ticketType" className="block text-[#5E626C] pb-2">
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
              <label htmlFor="priority" className="block text-[#5E626C] pb-2">
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

          <div className="flex flex-col gap-0 my-2">
            <label
              htmlFor="requestDetails"
              className="block text-[#5E626C] pb-2"
            >
              Request Details <span className="text-red-600 text-md">*</span>
            </label>
            <ReactQuill
              id="requestDetials"
              value={editorHtml}
              onChange={handleTextAreaChange}
              theme="snow"
              className={"h-[100px] my-5"}
              modules={modules}
              formats={formats}
            />

            {errors.requestDetails && (
              <p className="text-red-500 text-xs mt-1">
                Please enter request details
              </p>
            )}
          </div>

          <div className="rounded-md bg-[#F0ECFB] p-8 my-3">
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
            <div className="mt-4">
              {selectedFiles.length > 0 && (
                <div>
                  <h2 className="text-md font-medium text-lg">
                    Attached Files:
                  </h2>
                  <ul className="list-disc pl-5">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="text-[#5E626C]">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-5 justify-end">
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
        {loading && <Loader />}
      </div>
    </div>
  );
}
