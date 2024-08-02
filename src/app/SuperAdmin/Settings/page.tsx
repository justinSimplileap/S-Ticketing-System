"use client";
import React, { useState, useEffect } from "react";
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
import DisplayedCustomerForm from "../../../Components/common/DisplayedCustomerForm";
import Plus from "../../../../public/images/Plus.svg";
import View from "../../../../public/images/eye.svg";
import Delete from "../../../../public/images/delete.svg";
import ProfilePic from "../../../../public/images/Profile.svg";
import memberpic from "../../../../public/images/unsplash_8YG31Xn4dSw.png";
import DropdownBlack from "../../../../public/images/DropdownBlack.svg";
import info from "../../../../public/images/info-circle_svgrepo.com.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import green from "../../../../public/images/Ellipse262.svg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UUID } from "crypto";
import SuperAdminDetails from "../../../Components/common/SuperAdminDetails";
import { base_url } from "@/utils/constant";
import { useRouter } from "next/navigation";

const designations = ["Manager", "Developer", "Designer", "Analyst", "Intern"];
const role = ["Team", "Admin", "Manager"];

const tabClasses = ({ selected }: { selected: boolean }) =>
  `px-7 text-left w-fit pb-4 text-sm font-medium focus:outline-none border-b-2 ${
    selected
      ? "text-[#5027D9] font-medium border-b-2 border-[#5027D9]"
      : "text-gray-500"
  }`;

interface Customer {
  id: string;
  organization_id: UUID;
  name: string;
  url: string;
  area: string;
  phone: string;
  email: string;
  company_legal_name: string;
  address: string;
  country: string;
  city: string;
  postal_code: string;
  about_company: string;
  work_domain: string;
}

interface Client {
  id: number;
  user_id: number;
  organization_id: UUID;
  customer_name: string;
  company_legal_name?: string;
  company_url?: string;
  area_of_work?: string;
  phone_number?: string;
  email: string;
  password: string;
  address?: string;
  country?: string;
  city?: string;
  postal_code?: string;
  about_company?: string;
  work_domain?: string;
  profile_url?: string;
  role: string;
  onBoarded: boolean;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientTeamMember {
  id: number;
  user_id: number;
  organization_id: number;
  customer_name: string;
  designation: string;
  role: string;
  email: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  designation: string;
}

const convertClientToCustomer = (client: Client): Customer => {
  return {
    id: client.id.toString(),
    organization_id: client.organization_id,
    name: client.customer_name,
    url: client.company_url || "",
    area: client.area_of_work || "",
    phone: client.phone_number || "",
    email: client.email,
    company_legal_name: client.company_legal_name || "",
    address: client.address || "",
    city: client.city || "",
    country: client.country || "",
    postal_code: client.postal_code || "",
    about_company: client.about_company || "",
    work_domain: client.work_domain || "",
  };
};

const Department: { [key: string]: string } = {
  "1": "Admin",
  "2": "Manager",
  "3": "Developer",
  "4": "Designer",
};

export default function Settings() {
  useEffect(() => {
    fetchClients();
  }, []);

  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [clientTeam, setClientTeam] = useState<ClientTeamMember[]>([]);
  const [organizationId, setOrganizationId] = useState<string>("");

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${base_url}/viewAllClients`);

      setClients(response.data.clients);
    } catch (error) {
      console.error("Error fetching clients", error);
    }
  };

  const fetchClientTeam = async (orgId: string) => {
    try {
      const response = await axios.post(
        `${base_url}/getClientTeam`,
        { organization_id: orgId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setClientTeam(response.data.clientTeam);
    } catch (error) {
      console.error("Error fetching client team:", error);
    }
  };
  const [innerTabIndex, setInnerTabIndex] = useState(0);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  // for the diplayed customer form
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );
  const [selectedUserPhone, setSelectedUserPhone] = useState<string | null>(
    null
  );
  const [selectedUserUrl, setSelectedUserUrl] = useState<string | null>(null);
  const [selectedUserArea, setSelectedUserArea] = useState<string | null>(null);
  const [selectedUserCompanyName, setSelectedUserCompanyName] = useState<
    string | null
  >(null);
  const [selectedUserAddress, setSelectedUserAddress] = useState<string | null>(
    null
  );
  const [selectedUserCity, setSelectedUserCity] = useState<string | null>(null);
  const [selectedUserCountry, setSelectedUserCountry] = useState<string | null>(
    null
  );
  const [selectedUserPostalCode, setSelectedUserPostalCode] = useState<
    string | null
  >(null);
  const [selectedUserAbout, setSelectedUserAbout] = useState<string | null>(
    null
  );
  const [selectedUserWorkDomain, setSelectedUserWorkDomain] = useState<
    string | null
  >(null);
  // const [selectedUserCompanyName, setSelectedUserCompanyName] = useState<string | null>(null);

  const [employees, setEmployees] = useState<{ [key: string]: Employee[] }>({
    Admin: [],
    Manager: [],
    Developer: [],
    Designer: [],
  });

  const [selectedTab, setSelectedTab] = useState<string>("Admin");

  useEffect(() => {
    if (innerTabIndex === 1 && organizationId) {
      fetchClientTeam(organizationId);
    }
  }, [innerTabIndex, organizationId]);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSelectedUserId(customer.id);
    setSelectedUserName(customer.name);
    setSelectedUserEmail(customer.email);
    setSelectedUserPhone(customer.phone);
    setSelectedUserUrl(customer.url);
    setSelectedUserArea(customer.area);
    setSelectedUserCompanyName(customer.company_legal_name);
    setSelectedUserAddress(customer.address);
    setSelectedUserCity(customer.city);
    setSelectedUserCountry(customer.country);
    setSelectedUserPostalCode(customer.postal_code);
    setSelectedUserAbout(customer.about_company);
    setSelectedUserWorkDomain(customer.work_domain);
    setOrganizationId(customer.organization_id);

    console.log("this is selected", customer);
    console.log("customer id", customer.id);
    console.log("customer name", customer.url);

    setInnerTabIndex(0);
    setShowAddMemberForm(false);
  };

  useEffect(() => {
    if (innerTabIndex === 1 && organizationId) {
      fetchClientTeam(organizationId);
    }
  }, [innerTabIndex, organizationId]);

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

  // const {
  //   register: registerSecurity,
  //   handleSubmit: handleSubmitSecurity,
  //   formState: { errors: securityErrors },
  // } = useForm<SecurityInputs>();

  const handleAddClientMember = async (data: any) => {
    console.log("Data received from form submission:", data);
    try {
      const formData = {
        organization_id: organizationId,
        customer_name: data.customer_name,
        company_legal_name: data.company_legal_name,
        password: data.password,
        gender: data.gender,
        phone_number: data.phone_number,
        email: data.email,
        designation: data.designation,
        role: "Client Team",
      };

      console.log("Form data to be sent to server:", formData);

      const response = await axios.post(
        `${base_url}/addClientTeamMember`,
        formData
      );

      if (response) {
        toast.success("Client member added successfully");
        location.reload();
      }
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error("Failed to add team member");
    }
  };

  const handleDeleteMember = async (user_id: any) => {
    try {
      const response = await axios.delete(
        `${base_url}/deleteClientTeamMember/${user_id}`
      );
      if (response) {
        toast.success("Team member deleted successfully!");
        setClientTeam((prev) =>
          prev.filter((member) => member.user_id !== user_id)
        );
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddMemberForm = async (data: any) => {
    console.log("formdata1", data);
    try {
      const formData = {
        customer_name: data.customer_name,
        gender: data.gender,
        phone_number: data.phone_number,
        email: data.email,
        designation: data.position,
        password: data.password,
        role: data.role,
      };
      console.log("formdata", formData);
      const response = await axios.post(`${base_url}/addTeamMember`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        console.log("sadfasdfasd", response);
        toast.success("team member added successfully");
        // debugger
        // router.refresh()
        location.reload()

      }
    } catch (error) {
      toast.error("failed to add team member");
    }
  };

  const [superAdmin, setSuperAdmin] = useState(null);

  useEffect(() => {
    const fetchSuperAdminDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/superadmin/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuperAdmin(response.data);
      } catch (error) {
        console.error("Error fetching super admin details", error);
      }
    };

    fetchSuperAdminDetails();
  }, []);

  const Department: { [key: string]: string } = {
    "Super Admin": "Admin",
    Manager: "Manager",
    Developer: "Developer",
    Designer: "Designer",
  };
  const departmentTabs = ["Admin", "Manager", "Developer", "Designer"];

  useEffect(() => {
    const getSuperAdminOrganisation = async () => {
      try {
        const response = await axios.get(`${base_url}/users/Organisation`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const mappedEmployees = response.data.reduce(
          (acc: { [key: string]: Employee[] }, employee: any) => {
            const department = Department[employee.designation] || "Others";
            console.log("deparments", department);
            console.log("dessssss", employee.designation);
            const formattedEmployee: Employee = {
              id: employee.id,
              name: employee.customer_name,
              role: employee.designation,
              designation: employee.designation,
              imageUrl: employee.profile_url || ProfilePic, // Use default image if profile_url is null
            };

            if (!acc[department]) {
              acc[department] = [];
            }
            acc[department].push(formattedEmployee);
            return acc;
          },
          {}
        );

        setEmployees(mappedEmployees);
        console.log(response);
      } catch (error) {
        console.error("Error fetching super admin details", error);
      }
    };

    getSuperAdminOrganisation();
  }, []);

  const handlePositionSelect = (position: string) => {
    const currentPositions = getValues("role") || [];
    const newPositions = currentPositions.includes(position)
      ? currentPositions.filter((pos) => pos !== position)
      : [...currentPositions, position];

    setSelectedPositions(newPositions);
    setValue("role", newPositions);
  };

  const handleTabClick = (department: string) => {
    // console.log("depa", department);
    setSelectedTab(department);
    console.log("sele", selectedTab);
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

  type addMemberInputs = {
    customer_name: string;
    gender: string;
    designation: string;
    password: string;
    // position: string;
    phone_number: number;
    email: string;
    role: string[];
  };

  const {
    register: registerMember,
    formState: { errors: memberErrors },
    setValue,
    getValues,
  } = useForm<addMemberInputs>();

  const onSubmitSecurity: SubmitHandler<SecurityInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Toaster />
      <div className="px-3 py-7">
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-1 bg-white w-fit text-left p-3 px-7 cursor-pointer pb-0">
            {[
              "Customer Management",
              "Organisation Management",
              // "Status Management",
              // "Priority Management",
              "Profile Settings",
            ].map((tab, index) => (
              <Tab as="div" key={index} className={tabClasses}>
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {/* Custmer management tab */}
            <TabPanel className="px-7 py-5 bg-white pt-0">
              {selectedCustomer ? (
                <div>
                  <div className="py-5 flex items-center justify-between border-b-2">
                    <div>
                      <h2 className="text-2xl font-semibold pl-3">
                        {selectedCustomer.name}
                      </h2>
                    </div>
                    {innerTabIndex === 0 ? (
                      <div className="flex gap-5">
                        {/* <Button
                          type="button"
                          className="rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] border-[#5027D9] border-2"
                        >
                          Remove Client
                        </Button> */}
                        {/* <Button
                          type="submit"
                          className="rounded bg-[#5027D9] py-3 px-16 text-sm text-white"
                        >
                          Save
                        </Button> */}
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
                        {/* <Button
                          type="submit"
                          className="rounded bg-[#5027D9] py-3 px-7 text-sm text-white"
                        >
                          Save Member
                        </Button> */}
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

                  <div className="flex mt-5 mb-10">
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

                    <div className="w-[85%] p-3">
                      {innerTabIndex === 0 ? (
                        <div>
                          {/* form displaying individual customer */}
                          {selectedCustomer && (
                            <DisplayedCustomerForm
                              selectedUserId={selectedUserId}
                              selectedUserName={selectedUserName}
                              selectedUserEmail={selectedUserEmail}
                              selectedUserPhone={selectedUserPhone}
                              selectedUserUrl={selectedUserUrl}
                              selectedUserArea={selectedUserArea}
                              selectedUserCompanyName={selectedUserCompanyName}
                              selectedUserAddress={selectedUserAddress}
                              selectedUserCity={selectedUserCity}
                              selectedUserCountry={selectedUserCountry}
                              selectedUserPostalCode={selectedUserPostalCode}
                              selectedUserAbout={selectedUserAbout}
                              selectedUserWorkDomain={selectedUserWorkDomain}
                            />
                          )}
                        </div>
                      ) : showAddMemberForm ? (
                        // form to add a new client member

                        <div>
                          <Toaster />
                          <h2 className="text-xl font-semibold mb-4">
                            Basic Details
                          </h2>
                          <form onSubmit={handleSubmit(handleAddClientMember)}>
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
                                    {...register("customer_name", {
                                      required: true,
                                    })}
                                    className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                  />
                                  {errors.customer_name && (
                                    <span className="text-red-600">
                                      Customer Name is required
                                    </span>
                                  )}
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
                                    {...register("gender", { required: true })}
                                    className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                  />
                                  {errors.gender && (
                                    <span className="text-red-600">
                                      Gender is required
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <label
                                    htmlFor="companyUrl"
                                    className="block text-sm "
                                  >
                                    Phone number
                                  </label>
                                  <input
                                    id="phoneNumber"
                                    type="number"
                                    {...register("phone_number", {
                                      required: true,
                                    })}
                                    className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                  />
                                  {errors.phone_number && (
                                    <span className="text-red-600">
                                      Phone Number is required
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <label
                                    htmlFor="companyUrl"
                                    className="block text-sm "
                                  >
                                    Email
                                  </label>
                                  <input
                                    id="email"
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                  />
                                  {errors.email && (
                                    <span className="text-red-600">
                                      Email is required
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <label
                                    htmlFor="companyUrl"
                                    className="block text-sm "
                                  >
                                    Customer Company
                                  </label>
                                  <input
                                    id="customerCompany"
                                    type="text"
                                    {...register("company_legal_name", {
                                      required: true,
                                    })}
                                    className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                  />
                                  {errors.company_legal_name && (
                                    <span className="text-red-600">
                                      Customer Company is required
                                    </span>
                                  )}
                                </div>

                                <div>
                                  <label
                                    htmlFor="password"
                                    className="block text-sm "
                                  >
                                    Password
                                  </label>
                                  <input
                                    id="password"
                                    type="text"
                                    {...register("password", {
                                      required: true,
                                    })}
                                    className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                  />
                                  {errors.company_legal_name && (
                                    <span className="text-red-600">
                                      Customer Members password is required
                                    </span>
                                  )}
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
                                    {...register("designation", {
                                      required: true,
                                    })}
                                    className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                  >
                                    <option value="">Select Designation</option>
                                    {designations.map((designation, index) => (
                                      <option key={index} value={designation}>
                                        {designation}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.designation && (
                                    <span className="text-red-600">
                                      Designation is required
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                type="submit"
                                className="rounded bg-[#5027D9] py-3 px-7 text-sm text-white flex items-center gap-2"
                              >
                                <Image
                                  src={Plus}
                                  alt="add"
                                  width={20}
                                  height={20}
                                />
                                Add Member
                              </Button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <div>
                          <Toaster />
                          <table className="min-w-full divide-y divide-gray-200 border-b-0">
                            <thead className="bg-white">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Member ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Member Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Designation
                                </th>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Area of Work
                                </th> */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                  Delete
                                </th>
                              </tr>
                            </thead>

                            {/* table of clients team */}
                            <tbody className="bg-white">
                              {clientTeam.map((member) => (
                                <tr
                                  key={member.user_id}
                                  // className="cursor-pointer"
                                  // onClick={() => handleTeamMemberClick(member)}
                                >
                                  <td className="px-6 py-4 whitespace-normal text-sm text-[#5027D9]">
                                    <p className="border-b-2 w-fit border-[#5027D9]">
                                      {member.id}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 whitespace-normal text-sm text-[#5027D9]">
                                    <p className="border-b-2 w-fit border-[#5027D9]">
                                      {member.customer_name}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                    {member.designation}
                                  </td>
                                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                    {member.phone_number}
                                  </td>
                                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                    {member.email}
                                  </td>
                                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button>
                                      <Image src={View} alt="view" width={20} />
                                    </button>
                                  </td> */}
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                      onClick={() =>
                                        handleDeleteMember(member.user_id)
                                      }
                                    >
                                      <Image src={Delete} alt="delete" />
                                    </button>
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
                        <div className="py-5 flex justify-between items-center border-b-2 mb-10">
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
                          {clients.map((client) => (
                            <tr
                              key={client.id}
                              className="cursor-pointer"
                              onClick={() =>
                                handleCustomerClick(
                                  convertClientToCustomer(client)
                                )
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5027D9]">
                                <p className="border-b-2 w-fit border-[#5027D9]">
                                  #{client.id}
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5027D9]">
                                <p className="border-b-2 w-fit border-[#5027D9]">
                                  {client.customer_name}
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {client.company_url}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {client.phone_number}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {client.email}
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
            <TabPanel className="p-5 bg-white">
              {showAddMemberForm ? (
                <div className="flex justify-between items-center py-5">
                  <h2 className="text-2xl font-semibold">Add a new member</h2>
                  <div className="flex gap-5"></div>
                </div>
              ) : (
                <div className="flex justify-between items-center py-7">
                  <h2 className="text-2xl font-semibold">
                    Organisation Management
                  </h2>
                  <div className="flex gap-5">
                    <Button
                      type="button"
                      className="rounded bg-[#5027D9] py-2 px-4 text-sm text-white items-center gap-2 flex"
                      onClick={handleAddMemberClick}
                    >
                      <Image src={Plus} alt="add" width={22} height={22} />
                      Add new member
                    </Button>
                  </div>
                </div>
              )}

              {showAddMemberForm ? (
                <div className="mt-7 mb-10">
                  <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
                  <form onSubmit={handleSubmit(handleAddMemberForm)}>
                    <div className="flex py-5 items-center">
                      <div className="w-[20%]">
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
                            htmlFor="customer_name"
                            className="block text-sm"
                          >
                            Full name
                          </label>
                          <input
                            id="customer_name"
                            type="text"
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                            {...register("customer_name", {
                              required: true,
                            })}
                          />
                        </div>
                        <div>
                          <label htmlFor="gender" className="block text-sm">
                            Gender
                          </label>
                          <select
                            id="gender"
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                            {...register("gender", {
                              required: true,
                            })}
                          >
                            <option value="">Select a gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {/* <input
                            id="gender"
                            type="text"
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                            {...register("gender", {
                              required: true,
                            })}
                          /> */}
                        </div>
                        <div>
                          <label htmlFor="position" className="block text-sm">
                            Position
                          </label>
                          {/* <input
                            id="position"
                            type="text"
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                            {...register("position", {
                              required: true,
                            })}
                          /> */}
                          <select
                            id="position"
                            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                            {...register("position", {
                              required: true,
                            })}
                          >
                            <option value="">Select a position</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-semibold py-7">
                      Contact details
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone_number" className="block text-sm">
                          Phone number
                        </label>
                        <input
                          id="phone_number"
                          type="text"
                          className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          {...register("phone_number", {
                            required: true,
                          })}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          {...register("email", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="text-xl font-semibold py-7">
                      Permission settings
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                      <div>
                        <label htmlFor="password" className="block text-sm">
                          Role of member
                        </label>
                        <select
                          id="role"
                          {...register("role", {
                            required: true,
                          })}
                          className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                        >
                          <option value="">Select Role</option>
                          {role.map((role, index) => (
                            <option key={index} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm">
                          Password
                        </label>
                        <input
                          id="password"
                          type="text"
                          className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          {...register("password", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="pt-5">
                      <Button
                        type="button"
                        className="rounded bg-transparent py-3 px-7 mr-5 text-sm text-[#5027D9] border-[#5027D9] border-2"
                        onClick={handleCancelAddMember}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="rounded bg-[#5027D9] py-3 px-10 text-sm text-white"
                      >
                        Create member
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex mt-5 mb-10">
                  <div className="w-[15%] pr-4 pl-2 border-r-2">
                    <TabGroup
                      selectedIndex={innerTabIndex}
                      onChange={setInnerTabIndex}
                    >
                      <div className="text-xl pb-7 font-semibold">
                        Department
                      </div>
                      <TabList className="space-y-4">
                        {departmentTabs.map((tab, index) => (
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
                            onClick={() => handleTabClick(tab)}
                          >
                            {tab}
                          </Tab>
                        ))}
                      </TabList>
                    </TabGroup>
                  </div>

                  <div className="m-4">
                    {employees[selectedTab] &&
                    employees[selectedTab].length > 0 ? (
                      <div className="grid grid-cols-3 gap-4">
                        {employees[selectedTab].map((employee) => (
                          <div
                            key={employee.id}
                            className="flex flex-col items-center justify-between mb-4 p-4 border rounded"
                          >
                            <Image
                              src={employee.imageUrl}
                              alt={employee.name}
                              width={100}
                              height={100}
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
                        ))}
                      </div>
                    ) : (
                      <p>No employees in this department</p>
                    )}
                  </div>
                </div>
              )}
            </TabPanel>

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
                      <SuperAdminDetails superAdmin={superAdmin} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="pt-7 pl-7">
                      <div className="text-xl pb-7 font-medium text-[#333B69]">
                        Change Password
                      </div>
                      <div className="w-1/2">
                        {/* <form onSubmit={handleSubmitSecurity(onSubmitSecurity)}>
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
                        </form> */}
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
