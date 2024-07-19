"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Button,
} from "@headlessui/react";
import breadcrumbArrow from "../../../../public/images/BreadcrumbArrow.svg";
import Bell from "../../../../public/images/bell.svg";
import userBg from "../../../../public/images/User.svg";
import SearchBar from "../../../Components/common/SearchBar";
import CustomerForm from "../../../Components/common/CustomerForm";
import Plus from "../../../../public/images/Plus.svg";
import View from "../../../../public/images/eye.svg";
import Delete from "../../../../public/images/delete.svg";
import ProfilePic from "../../../../public/images/Profile.svg";
import memberpic from "../../../../public/images/unsplash_8YG31Xn4dSw.png";
import DropdownBlack from "../../../../public/images/DropdownBlack.svg";
import info from "../../../../public/images/info-circle_svgrepo.com.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import green from "../../../../public/images/Ellipse262.svg";

const designations = ["Manager", "Developer", "Designer", "Analyst", "Intern"];

const tabClasses = ({ selected }: { selected: boolean }) =>
  `px-7 text-left w-fit pb-4 text-sm font-medium focus:outline-none border-b-2 ${
    selected
      ? "text-[#5027D9] font-medium border-b-2 border-[#5027D9]"
      : "text-gray-500"
  }`;

interface Customer {
  id: string;
  name: string;
  url: string;
  area: string;
  phone: string;
  email: string;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

// Define a union type for departments
type Department = "Admin" | "Managers" | "Development";

const customers: Customer[] = [
  {
    id: "123",
    name: "Shankara",
    url: "www.example.com",
    area: "IT",
    phone: "123-456-7890",
    email: "john@example.com",
  },
  {
    id: "234",
    name: "Jane Doe",
    url: "www.example.com",
    area: "Marketing",
    phone: "987-654-3210",
    email: "jane@example.com",
  },
];

export default function Settings() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [innerTabIndex, setInnerTabIndex] = useState(0);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setInnerTabIndex(0);
    setShowAddMemberForm(false);
  };

  const handleAddMemberClick = () => {
    setShowAddMemberForm(true);
  };

  const handleCancelAddMember = () => {
    setShowAddMemberForm(false);
  };

  const handleCancelAddCustomer = () => {
    setShowAddCustomerForm(false);
  };

  const handleAddCustomerClick = () => {
    setShowAddCustomerForm(true);
  };

  const [departmentTabs, setDepartmentTabs] = useState([
    "Admin",
    "Managers",
    "Development",
    "Add new",
  ]);

  const employees = {
    Admin: [
      { id: 1, name: "Harsha Sir", role: "Admin", imageUrl: ProfilePic },
      { id: 2, name: "Keshav Sir", role: "Admin", imageUrl: ProfilePic },
    ],
    Managers: [
      { id: 3, name: "Keshav Sir", role: "Manager", imageUrl: ProfilePic },
      { id: 4, name: "Harsha Sir", role: "Manager", imageUrl: ProfilePic },
    ],
    Development: [
      { id: 5, name: "Kashish", role: "Developer", imageUrl: ProfilePic },
      { id: 6, name: "Justin", role: "Developer", imageUrl: ProfilePic },
      { id: 7, name: "Amar", role: "Designer", imageUrl: ProfilePic },
    ],
  };

  const handleAddNewTab = () => {
    const newTabName = `New Department ${departmentTabs.length - 3}`;
    const newTabs = [...departmentTabs];
    newTabs.splice(-1, 0, newTabName); // Insert new tab before "Add new"
    setDepartmentTabs(newTabs);
  };

  // Function to get employees of the selected department
  const getEmployees = (department: string): Employee[] => {
    return employees[department as Department] || [];
  };

  const handlePositionSelect = (position: string) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(selectedPositions.filter((pos) => pos !== position));
    } else {
      setSelectedPositions([...selectedPositions, position]);
    }
  };

  // status management tab

  const colorOptions = [
    { value: "Choose color", color: "" }, // Default option
    { value: "Blue", color: "#3498db" },
    { value: "Green", color: "#2ecc71" },
    { value: "Red", color: "#e74c3c" },
    { value: "Yellow", color: "#f1c40f" },
    // Add more color options as needed
  ];

  const categories = [
    {
      name: "Edit Profile",
    },
    {
      name: "Security",
    },
  ];

  type SecurityInputs = {
    currentPassword: string;
    newPassword: string;
  };

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: securityErrors },
  } = useForm<SecurityInputs>();

  const onSubmitSecurity: SubmitHandler<SecurityInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between shadow-md p-8 sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-3">
          <div className="text-[#2A2C3E] text-xl">
            <Link href="">Settings </Link>
          </div>
          <div>
            <Image src={breadcrumbArrow} alt="breadcrumb" width={25} />
          </div>
          <div className="text-[#2A2C3E] text-xl">Customer Management</div>
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
      </div>

      <div className="px-3 py-10">
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-1 bg-white w-fit text-left p-3 px-7 cursor-pointer pb-0">
            {[
              "Customer Management",
              "Organisation Management",
              "Status Management",
              "Priority Management",
              "Profile Settings",
            ].map((tab, index) => (
              <Tab as="div" key={index} className={tabClasses}>
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {/* Custmer management tab */}
            <TabPanel className="px-10 py-5 bg-white pt-0">
              {selectedCustomer ? (
                <div>
                  <div className="py-7 flex justify-between border-b-2">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {selectedCustomer.name} PVT LTD
                      </h2>
                    </div>
                    {innerTabIndex === 0 ? (
                      <div className="flex gap-5">
                        <Button
                          type="button"
                          className="rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] border-[#5027D9] border-2"
                        >
                          Remove Client
                        </Button>
                        <Button
                          type="submit"
                          className="rounded bg-[#5027D9] py-3 px-16 text-sm text-white"
                        >
                          Save
                        </Button>
                      </div>
                    ) : showAddMemberForm ? (
                      <div className="flex gap-5">
                        <Button
                          type="button"
                          onClick={() => setShowAddMemberForm(false)}
                          className="rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] border-[#5027D9] border-2"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="rounded bg-[#5027D9] py-3 px-7 text-sm text-white"
                        >
                          Save Member
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-5">
                        <Button
                          type="button"
                          onClick={handleAddMemberClick}
                          className="rounded bg-[#5027D9] py-3 px-7 text-sm text-white flex items-center gap-2"
                        >
                          <Image src={Plus} alt="add" width={20} height={20} />
                          Add Member
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex mt-7 mb-10">
                    <div className="w-[15%] pr-4 pl-2 border-r-2">
                      <TabGroup
                        selectedIndex={innerTabIndex}
                        onChange={setInnerTabIndex}
                      >
                        <TabList className="space-y-4 ">
                          {["Edit Profile", "Team Members"].map(
                            (innerTab, index) => (
                              <Tab
                                as="div"
                                key={index}
                                className={({ selected }) =>
                                  `text-left cursor-pointer ${
                                    selected
                                      ? "text-white bg-[#5027D9] p-3"
                                      : "text-[#91919B] p-3"
                                  }`
                                }
                              >
                                {innerTab}
                              </Tab>
                            )
                          )}
                        </TabList>
                      </TabGroup>
                    </div>

                    <div className="w-[85%] p-5">
                      {innerTabIndex === 0 ? (
                        <div>
                          <CustomerForm />
                        </div>
                      ) : showAddMemberForm ? (
                        <div>
                          <h2 className="text-xl font-semibold mb-4">
                            Basic Details
                          </h2>
                          <div className="flex py-5">
                            <div className="w-[20%] pt-10">
                              <Image
                                src={ProfilePic}
                                alt="Profile Pic"
                                className="pr-3"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <label
                                  htmlFor="customerName"
                                  className="block text-sm "
                                >
                                  Customer Name
                                </label>
                                <input
                                  id="customerName"
                                  type="text"
                                  // {...register("customerName", { required: true })}
                                  className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                />
                                {/* {errors.customerName && (
              <span role="alert" className="text-red-600">
                Customer Name is required
              </span>
            )} */}
                              </div>
                              <div>
                                <label
                                  htmlFor="companyName"
                                  className="block text-sm  "
                                >
                                  Gender
                                </label>
                                <input
                                  id="companyName"
                                  type="text"
                                  // {...register("companyName", { required: true })}
                                  className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                />
                                {/* {errors.companyName && (
              <span role="alert" className="text-red-600">
                Company Name is required
              </span>
            )} */}
                              </div>
                              <div>
                                <label
                                  htmlFor="companyUrl"
                                  className="block text-sm "
                                >
                                  Phone number
                                </label>
                                <input
                                  id="companyUrl"
                                  type="url"
                                  // {...register("companyUrl", { required: true })}
                                  className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                />
                                {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                              </div>
                              <div>
                                <label
                                  htmlFor="companyUrl"
                                  className="block text-sm "
                                >
                                  Email
                                </label>
                                <input
                                  id="companyUrl"
                                  type="url"
                                  // {...register("companyUrl", { required: true })}
                                  className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                />
                                {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                              </div>
                              <div>
                                <label
                                  htmlFor="companyUrl"
                                  className="block text-sm "
                                >
                                  Customer Company
                                </label>
                                <input
                                  id="companyUrl"
                                  type="url"
                                  // {...register("companyUrl", { required: true })}
                                  className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                />
                                {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                              </div>
                              <div>
                                <label
                                  htmlFor="designation"
                                  className="block text-sm "
                                >
                                  Designation
                                </label>
                                <select
                                  id="designation"
                                  className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                >
                                  <option value="">Select Designation</option>
                                  {designations.map((designation, index) => (
                                    <option key={index} value={designation}>
                                      {designation}
                                    </option>
                                  ))}
                                </select>
                                {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <table className="min-w-full divide-y divide-gray-200 border-b-0">
                            <thead className="bg-white">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Customer ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Customer Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Company URL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Area of Work
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Email
                                </th>
                                <th className=""></th>
                                <th className=""></th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {customers.map((customer) => (
                                <tr
                                  key={customer.id}
                                  className="cursor-pointer"
                                  onClick={() => handleCustomerClick(customer)}
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5027D9]">
                                    <p className="border-b-2 w-fit border-[#5027D9]">
                                      #{customer.id}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5027D9]">
                                    <p className="border-b-2 w-fit border-[#5027D9]">
                                      {customer.name}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {customer.url}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {customer.area}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {customer.phone}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {customer.email}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {!showAddCustomerForm && (
                    <div className="flex justify-between items-center py-7">
                      <h2 className="text-2xl font-semibold">
                        Customer Management
                      </h2>
                      <div className="flex gap-5">
                        {/* <SearchBar /> */}
                        <div className="flex gap-5">
                          <div>
                            <Button
                              type="button"
                              className="rounded bg-[#5027D9] py-2 px-4 text-sm text-white items-center gap-2  flex"
                              onClick={handleAddCustomerClick}
                            >
                              <Image
                                src={Plus}
                                alt="add"
                                width={22}
                                height={22}
                              />
                              Add customer
                            </Button>
                          </div>
                          {/* c */}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    {showAddCustomerForm ? (
                      <div>
                        <div className="py-7 flex justify-between border-b-2 mb-10">
                          <div>
                            <h2 className="text-2xl font-semibold">
                              Create a new customer
                            </h2>
                          </div>
                          <div className="flex gap-5">
                            <Button
                              type="button"
                              onClick={handleCancelAddCustomer}
                              className="rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] border-[#5027D9] border-2"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="rounded bg-[#5027D9] py-3 px-10 text-sm text-white"
                            >
                              Create Customer
                            </Button>
                          </div>
                        </div>
                        <CustomerForm />
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200 border-b-0">
                        <thead className="bg-white">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                              Customer ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                              Customer Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                              Company URL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                              Area of Work
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                              Email
                            </th>
                            <th className=""></th>
                            <th className=""></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {customers.map((customer) => (
                            <tr
                              key={customer.id}
                              className="cursor-pointer"
                              onClick={() => handleCustomerClick(customer)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5027D9]">
                                <p className="border-b-2 w-fit border-[#5027D9]">
                                  #{customer.id}
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5027D9]">
                                <p className="border-b-2 w-fit border-[#5027D9]">
                                  {customer.name}
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {customer.url}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {customer.area}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {customer.phone}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {customer.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button>
                                  <Image src={View} alt="view" width={20} />
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button>
                                  <Image src={Delete} alt="delete" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </TabPanel>

            {/* Organisation management tab */}
            <TabPanel className="p-10 bg-white">
              {showAddMemberForm ? (
                <div className="flex justify-between items-center py-7">
                  <h2 className="text-2xl font-semibold">Add a new member</h2>
                  <div className="flex gap-5">
                    <Button
                      type="button"
                      className="rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] border-[#5027D9] border-2"
                      onClick={handleCancelAddMember}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="rounded bg-[#5027D9] py-3 px-10 text-sm text-white"
                      onClick={handleAddMemberClick}
                    >
                      Create member
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center py-7 ">
                  <h2 className="text-2xl font-semibold">
                    Organisation Management
                  </h2>
                  <div className="flex gap-5">
                    {/* <SearchBar /> */}
                    <div className="flex gap-5 ">
                      <div>
                        <Button
                          type="button"
                          className="rounded bg-[#5027D9] py-2 px-4 text-sm text-white items-center gap-2  flex"
                          onClick={handleAddMemberClick}
                        >
                          <Image src={Plus} alt="add" width={22} height={22} />
                          Add new member
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showAddMemberForm ? (
                <div className=" mt-7 mb-10">
                  {/* <CustomerForm onCancel={handleCancelAddMember} /> */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Basic Details
                    </h2>
                    <div className="flex py-5 items-center">
                      <div className="w-[20%] ">
                        <Image
                          src={ProfilePic}
                          alt="Profile Pic"
                          className="pr-3"
                          width={150}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div>
                          <label
                            htmlFor="customerName"
                            className="block text-sm "
                          >
                            Full name
                          </label>
                          <input
                            id="customerName"
                            type="text"
                            // {...register("customerName", { required: true })}
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          />
                          {/* {errors.customerName && (
              <span role="alert" className="text-red-600">
                Customer Name is required
              </span>
            )} */}
                        </div>
                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-sm  "
                          >
                            Gender
                          </label>
                          <input
                            id="companyName"
                            type="text"
                            // {...register("companyName", { required: true })}
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          />
                          {/* {errors.companyName && (
              <span role="alert" className="text-red-600">
                Company Name is required
              </span>
            )} */}
                        </div>
                        <div>
                          <label
                            htmlFor="companyUrl"
                            className="block text-sm "
                          >
                            Department
                          </label>
                          <input
                            id="companyUrl"
                            type="url"
                            // {...register("companyUrl", { required: true })}
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          />
                          {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                        </div>
                        <div>
                          <label
                            htmlFor="companyUrl"
                            className="block text-sm "
                          >
                            Position
                          </label>
                          <input
                            id="companyUrl"
                            type="url"
                            // {...register("companyUrl", { required: true })}
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          />
                          {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-semibold py-7">
                      Contact details
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="companyUrl" className="block text-sm ">
                          Phone number
                        </label>
                        <input
                          id="companyUrl"
                          type="url"
                          // {...register("companyUrl", { required: true })}
                          className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                        />
                        {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                      </div>

                      <div>
                        <label htmlFor="companyUrl" className="block text-sm ">
                          Email *
                        </label>
                        <input
                          id="companyUrl"
                          type="url"
                          // {...register("companyUrl", { required: true })}
                          className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                        />
                        {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                      </div>
                    </div>

                    <div className="text-xl font-semibold py-7">
                      Permission settings
                    </div>

                    <div className="flex gap-20">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="manager"
                          checked={selectedPositions.includes("Manager")}
                          onChange={() => handlePositionSelect("Manager")}
                          className="form-checkbox h-5 w-5 text-[#5027D9]"
                        />
                        <label htmlFor="manager" className="ml-2">
                          Manager
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="admin"
                          checked={selectedPositions.includes("Admin")}
                          onChange={() => handlePositionSelect("Admin")}
                          className="form-checkbox h-5 w-5 text-[#5027D9]"
                        />
                        <label htmlFor="admin" className="ml-2">
                          Admin
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex mt-7 mb-10">
                  <div className="w-[15%] pr-4 pl-2 border-r-2">
                    <TabGroup
                      selectedIndex={innerTabIndex}
                      onChange={setInnerTabIndex}
                    >
                      <div className="text-xl pb-7 font-semibold">
                        Department
                      </div>
                      <TabList className="space-y-4 ">
                        {departmentTabs.map((innerTab, index) => (
                          <Tab
                            as="div"
                            key={index}
                            className={({ selected }) =>
                              `text-left cursor-pointer ${
                                selected
                                  ? "text-white bg-[#5027D9] p-3"
                                  : "text-[#91919B] p-3"
                              }`
                            }
                            onClick={
                              innerTab === "Add new"
                                ? handleAddNewTab
                                : undefined
                            }
                          >
                            {innerTab}
                          </Tab>
                        ))}
                      </TabList>
                    </TabGroup>
                  </div>
                  <div className="w-[85%] pl-4">
                    {/* Display the total number of employees */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold pb-3">
                        Total Members:{" "}
                        <span className="text-[#5027D9]">
                          {getEmployees(departmentTabs[innerTabIndex]).length}
                        </span>
                      </h3>
                    </div>
                    {/* Render employees of the selected department */}
                    <div className="grid grid-cols-4 gap-4">
                      {getEmployees(departmentTabs[innerTabIndex]).map(
                        (employee) => (
                          <div
                            key={employee.id}
                            className="flex flex-col items-center justify-between mb-4 p-4 pb-0 border rounded "
                          >
                            <Image
                              src={employee.imageUrl}
                              alt={employee.name}
                              className="w-full h-full"
                            />
                            <div className="bg-white border-t-4 border-[#5027D9] w-[90%] pt-2 mt-1">
                              <h3 className="text-center font-semibold">
                                {employee.name}
                              </h3>
                              <p className="text-sm text-center">
                                {employee.role}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </TabPanel>

            {/* Status management tab */}
            <TabPanel className="p-10 bg-white">
              <div className="flex justify-between items-center pb-7">
                <h2 className="text-2xl font-semibold">Status Management</h2>
                <div className="flex gap-5">
                  {/* <SearchBar /> */}
                  <div className="flex gap-5">
                    <div>
                      <Button
                        type="button"
                        className="rounded bg-[#5027D9] py-2.5 px-14 text-sm text-white items-center gap-2 flex"
                        // onClick={handleAddMemberClick}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[35%]">
                  <select
                    name="statusScale"
                    id="statusScale"
                    className="form-select border-2 border-[#8E8E8E] text-[#8E8E8E] focus:outline-none rounded-md p-3 w-full  bg-no-repeat bg-right appearance-none"
                    style={{
                      backgroundImage: `url(${DropdownBlack.src})`,
                      backgroundSize: "20px",
                      backgroundPosition: "right 0.5rem center",
                    }}
                  >
                    <option value="">Choose status scale level (1-3)</option>
                    <option value="1-2">On 1-2</option>
                    <option value="1-3">On 1-3</option>
                    <option value="1-4">On 1-4</option>
                    <option value="1-5">On 1-5</option>
                    <option value="1-6">On 1-6</option>
                  </select>
                </div>

                <div className="w-[65%] bg-[#FBFBFB] px-8 py-4">
                  <table className="min-w-full bg-white">
                    <thead className="border-b-4 border-[#FBFBFB] text-left text-[#9291A5]">
                      <tr>
                        <th className="px-4 py-2 font-medium">Status Name</th>
                        <th className="px-4 py-2 font-medium">Color</th>
                        <th className="px-4 py-2 font-medium">Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="px-4 py-2">Closed</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full ml-4"
                              style={{ backgroundColor: "#3498db" }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-2">Closed</td>
                      </tr>
                      <tr className="bg-[#FBFBFB]">
                        <td className="px-4 py-2">Active</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full  ml-4"
                              style={{ backgroundColor: "#2ecc71" }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-2">Active</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-2">For review</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full  ml-4"
                              style={{ backgroundColor: "#e74c3c" }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-2">Blue</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="pt-3 pl-2 flex">
                    <Image src={info} alt="" />
                    <p className="text-[#979797] text-sm pl-1">
                      Click on status name to edit
                    </p>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Priority management tab */}
            <TabPanel className="p-10 bg-white">
              <div className="flex gap-4">
                <div className="w-[35%]">
                  <select
                    name="statusScale"
                    id="statusScale"
                    className="form-select border-2 border-[#8E8E8E] text-[#8E8E8E] focus:outline-none rounded-md p-3 w-full  bg-no-repeat bg-right appearance-none"
                    style={{
                      backgroundImage: `url(${DropdownBlack.src})`,
                      backgroundSize: "20px",
                      backgroundPosition: "right 0.5rem center",
                    }}
                  >
                    <option value="">Choose status scale level (1-3)</option>
                    <option value="1-2">On 1-2</option>
                    <option value="1-3">On 1-3</option>
                    <option value="1-4">On 1-4</option>
                    <option value="1-5">On 1-5</option>
                    <option value="1-6">On 1-6</option>
                  </select>
                </div>

                <div className="w-[65%] bg-[#FBFBFB] px-8 py-4">
                  <table className="min-w-full bg-white">
                    <thead className="border-b-4 border-[#FBFBFB] text-left text-[#9291A5]">
                      <tr>
                        <th className="px-4 py-2 font-medium">Priority Name</th>
                        <th className="px-4 py-2 font-medium">Color</th>
                        <th className="px-4 py-2 font-medium">Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="px-4 py-2">Low</td>
                        <td className="px-4 py-2">
                          <select name="color" id="color">
                            <option value="red">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full ml-4 bg-[#3498db]"
                                  // style={{ backgroundColor: "#3498db" }}
                                >
                                  blue
                                </div>
                              </div>
                            </option>
                            <option value="green">
                              <div>
                                <Image
                                  src={green}
                                  alt=""
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </option>
                          </select>
                          {/* <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full ml-4"
                              style={{ backgroundColor: "#3498db" }}
                            ></div>
                          </div> */}
                        </td>
                        <td className="px-4 py-2">Low</td>
                      </tr>
                      <tr className="bg-[#FBFBFB]">
                        <td className="px-4 py-2">Mid</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full  ml-4"
                              style={{ backgroundColor: "#2ecc71" }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-2">Mid</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-2">High</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full  ml-4"
                              style={{ backgroundColor: "#e74c3c" }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 py-2">High</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="pt-3 pl-2 flex">
                    <Image src={info} alt="" />
                    <p className="text-[#979797] text-sm pl-1">
                      Click on priority name to edit
                    </p>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Profile settings tab */}
            <TabPanel className="p-10 bg-white">
              <h2 className="text-2xl font-semibold">Profile Settings</h2>
              <TabGroup>
                <TabList className="flex space-x-1 bg-white text-left p-3 px-7 cursor-pointer pb-0 mt-4">
                  {categories.map((category, index) => (
                    <Tab as="div" key={index} className={tabClasses}>
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className="pt-7">
                      <CustomerForm />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="pt-7 pl-7">
                      <div className="text-xl pb-7 font-medium text-[#333B69]">
                        Change Password
                      </div>
                      <div className="w-1/2">
                        <form onSubmit={handleSubmitSecurity(onSubmitSecurity)}>
                          <div className="mb-4 pb-7">
                            <label
                              htmlFor="currentPassword"
                              className="block mb-2 text-[#6E6E6E]"
                            >
                              Current Password
                            </label>
                            <input
                              id="currentPassword"
                              type="password"
                              {...registerSecurity("currentPassword", {
                                required: true,
                              })}
                              className="input-field p-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none text-[#6E6E6E]"
                            />
                            {securityErrors.currentPassword && (
                              <span role="alert" className="text-red-600">
                                Current Password is required
                              </span>
                            )}
                          </div>
                          <div className="mb-4 pb-7">
                            <label
                              htmlFor="newPassword"
                              className="block mb-2 text-[#6E6E6E]"
                            >
                              New Password
                            </label>
                            <input
                              id="newPassword"
                              type="password"
                              {...registerSecurity("newPassword", {
                                required: true,
                              })}
                              className="input-field p-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none text-[#6E6E6E]"
                            />
                            {securityErrors.newPassword && (
                              <span role="alert" className="text-red-600">
                                New Password is required
                              </span>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="btn-submit rounded bg-[#5027D9] py-3 px-5 text-sm text-white"
                          >
                            Save changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
