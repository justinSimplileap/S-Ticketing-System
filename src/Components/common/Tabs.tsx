"use client";
import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useForm, SubmitHandler, FieldErrors, UseFormRegister } from "react-hook-form";
import Image from 'next/image';
import ProfilePic from "../../../public/images/Profile.svg";
import Close from "../../../public/images/closebutton.svg"
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import AccountDetailsForm from "./AccountDetailsFrom";
import { Button } from "@headlessui/react";
import MemberManagementTable from "../common/MemberManagementTable"

// Define types for form inputs
type FormInputs = {
  email: string;
  companyName: string;
  phoneNumber: string;
  companyUrl: string;
  companyAddress: string;
  city: string;
  country: string;
  postalCode: string;
  aboutCompany: string;
  workDomain: string;
};

type SecurityInputs = {
  currentPassword: string;
  newPassword: string;
};

// Define props for WorkDomainInput component
type WorkDomainInputProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

const WorkDomainInput: React.FC<WorkDomainInputProps> = ({ register, errors }) => {
  const [workDomains, setWorkDomains] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setWorkDomains([...workDomains, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    setWorkDomains(workDomains.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full lg:px-2">
      <label htmlFor="workDomain" className="block mt-6">
        Work Domain
      </label>
      <div className="border-2 border-[#DFEAF2] rounded-md p-2 mt-2 bg-white h-40 cursor-pointer">
        {workDomains.map((domain, index) => (
          <span
            key={index}
            className="inline-block bg-[#E8E3FA] rounded-full lg:pl-5 lg:pr-7 lg:py-3 py-2 pl-3 pr-5 text-sm  text-black mr-2 mb-2 "
          >
            {domain}
            <button
              onClick={() => handleRemove(index)}
              className="ml-5 text-black"
            >
              <Image src={Close} alt="hhh" width={10} />
            </button>
          </span>
        ))}
        <input
          id="workDomain"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field p-2 mt-2 w-full border-none focus:outline-none"
        />
      </div>
      <input
        type="hidden"
        {...register("workDomain", { required: true })}
        value={workDomains.join(",")}
      />
      
    </div>
  );
};

const Example: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: securityErrors },
  } = useForm<SecurityInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  const onSubmitSecurity: SubmitHandler<SecurityInputs> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/resetPassword',
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Reset password executed successfully");
      }
    } catch (error) {
      toast.error("Error in resetting the password");
      console.log("error in resetting the password");
    }
  };

  const categories = [
    {
      name: "Edit Profile",
      posts: [],
    },
    {
      name: "Member management",
      posts: [],
    },
    {
      name: "Security",
      posts: [],
    },
  ];

  return (
    <div className="w-full p-2">
      <div className="w-full max-w">
        <TabGroup>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `py-1 px-3 text-[#9291A5] focus:outline-none ${
                    selected ? "border-b-4 border-[#5027D9] text-[#5027D9]" : ""
                  }`
                }
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="lg:m-5 mt-5">
            {categories.map(({ name }) => (
              <TabPanel key={name}>
                
                {name === "Edit Profile" && (
                  <AccountDetailsForm />
                )}
                {name === "Member management" && (
                  <div>
                    
                    

                    <div><MemberManagementTable/></div>
                  </div>
                )}
                {name === "Security" && (
                  <div className="lg:w-[50%] bg-white lg:p-5 p-3 rounded-md">
                    <div className="text-base lg:text-xl font-medium text-[#343A69]">Change Password</div>
                    <form onSubmit={handleSubmitSecurity(onSubmitSecurity)} className="space-y-4 p-2">
                      <div className="flex flex-wrap -mx-2">
                        <div className="w-full px-2">
                          <label htmlFor="currentPassword" className="block mt-6 lg:text-base text-sm text-[#6E6E6E]">
                            Current Password <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            {...registerSecurity("currentPassword", { required: true })}
                            className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          />
                          {securityErrors.currentPassword && (
                            <span role="alert" className="text-red-600">
                              Current Password is required
                            </span>
                          )}
                        </div>
                        <div className="w-full px-2">
                          <label htmlFor="newPassword" className="block mt-6 lg:text-base text-sm text-[#6E6E6E]">
                            New Password  <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            {...registerSecurity("newPassword", { required: true })}
                            className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          />
                          {securityErrors.newPassword && (
                            <span role="alert" className="text-red-600">
                              New Password is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-start lg:justify-end w-full  lg:p-3">
                        <button
                          type="submit"
                          className="btn-submit lg:ml-auto block rounded bg-[#5027D9] py-3 px-5 text-sm text-white"
                        >
                          Save changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Example;
