"use client";
import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import ProfilePic from "../../../public/images/Group 206.svg";
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import Image from "next/image";
import ProfilePic from "../../../public/images/Profile.svg";
import Close from "../../../public/images/closebutton.svg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AccountDetailsForm from "./AccountDetailsFrom";
import { Button } from "@headlessui/react";
import MemberManagementTable from "../common/MemberManagementTable";

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
    console.log(data); // Replace with your logic to handle form submission
  };

  const onSubmitSecurity: SubmitHandler<SecurityInputs> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/resetPassword",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                className="py-1 px-2 lg:px-3 text-[#9291A5] focus:outline-none focus:border-b-4 focus:border-[#5027D9] focus:text-[#5027D9] data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-none text-xs lg:text-base"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="lg:m-5 mt-5">
            {categories.map(({ name }) => (
              <TabPanel key={name}>
                {name === "Edit Profile" && (
                  <div>
                    <div className=""></div>
                    <div>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 lg:p-2"
                      >
                        <div>
                          <div className="lg:flex lg:py-5">
                            <div className="lg:w-[20%] lg:pt-10">
                              <Image
                                src={ProfilePic}
                                alt="Profile Pic"
                                className="pr-3"
                              />
                            </div>
                            <div className="lg:grid grid-cols-2 gap-4 w-full pt-5 lg:pt-0">
                              <div>
                                <label
                                  htmlFor="memberName"
                                  className="block text-sm "
                                >
                                  Member Name
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
                                <input
                                  id="designation"
                                  className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                                ></input>
                                {/* {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
                              </div>
                            </div>
                          </div>
                          <div className="flex lg:justify-end">
                            <Button
                              type="submit"
                              className="rounded bg-[#5027D9] py-3 px-7 text-sm text-white"
                            >
                              Save Member
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {name === "Security" && (
                  <div className="lg:w-[50%] bg-white lg:p-5 p-3 rounded-md">
                    <div className="text-base lg:text-xl font-medium text-[#343A69]">
                      Change Password
                    </div>
                    <form
                      onSubmit={handleSubmitSecurity(onSubmitSecurity)}
                      className="space-y-4 p-2"
                    >
                      <div className="flex flex-wrap -mx-2">
                        <div className="w-full px-2">
                          <label
                            htmlFor="currentPassword"
                            className="block mt-6 lg:text-base text-sm text-[#6E6E6E]"
                          >
                            Current Password{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            {...registerSecurity("currentPassword", {
                              required: true,
                            })}
                            className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                          />
                          {securityErrors.currentPassword && (
                            <span role="alert" className="text-red-600">
                              Current Password is required
                            </span>
                          )}
                        </div>
                        <div className="w-full px-2">
                          <label
                            htmlFor="newPassword"
                            className="block mt-6 lg:text-base text-sm text-[#6E6E6E]"
                          >
                            New Password <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            {...registerSecurity("newPassword", {
                              required: true,
                            })}
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
