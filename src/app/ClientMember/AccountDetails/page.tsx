'use client';
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from 'next/image';
import Profile from "../../../../public/images/Profile.svg";

// Define types for form inputs
type FormInputs = {
  customerName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  customerCompany: string;
  designation: string;
};

const CustomerForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data); // Replace with your logic to handle form submission
  };

  return (
    <div className="p-8">
      <div className="bg-[#FFFFFF] shadow-md p-8 border border-[#EBEBEE] rounded">
        <div className="text-xl font-semibold font-lato text-[#222222]">Account Details</div>
        <div className="text-xl font-semibold font-lato mt-8 text-[#000000]">Basic Details</div>
        <div className="flex flex-col md:flex-row py-5 items-center">
          <div className="w-full md:w-[20%] mb-6 md:mb-0 md:mr-6">
            <Image src={Profile} alt="Profile Pic" className="pr-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="mb-4">
              <label htmlFor="customerName" className="block text-sm text-[#232323] font-lato">
                Member Name <span className="text-red-500">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                {...register("customerName", { required: true })}
                className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.customerName && (
                <span role="alert" className="text-red-600">
                  Member Name is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm text-[#232323] font-lato">
                Gender <span className="text-red-500">*</span>
              </label>
              <input
                id="gender"
                type="text"
                {...register("gender", { required: true })}
                className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.gender && (
                <span role="alert" className="text-red-600">
                  Gender is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm text-[#232323] font-lato">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="text"
                {...register("phoneNumber", { required: true })}
                className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.phoneNumber && (
                <span role="alert" className="text-red-600">
                  Phone Number is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-[#232323] font-lato">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="text"
                {...register("email", { required: true })}
                className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.email && (
                <span role="alert" className="text-red-600">
                  Email is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="customerCompany" className="block text-sm text-[#232323] font-lato">
                Customer Company <span className="text-red-500">*</span>
              </label>
              <input
                id="customerCompany"
                type="text"
                {...register("customerCompany", { required: true })}
                className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.customerCompany && (
                <span role="alert" className="text-red-600">
                  Customer Company is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="designation" className="block text-sm text-[#232323] font-lato">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                id="designation"
                type="text"
                {...register("designation", { required: true })}
                className="input-field p-2 mt-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.designation && (
                <span role="alert" className="text-red-600">
                  Designation is required
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end md:mt-6">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="btn-submit bg-[#5027D9]  px-3 py-4 text-sm text-white rounded-md focus:outline-none md:py-3 px-8 "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
