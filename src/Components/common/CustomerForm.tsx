"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldErrors, UseFormRegister } from "react-hook-form";
import Image from 'next/image';
import Profile from "../../../public/images/Profile.svg";
import Close from "../../../public/images/closebutton.svg";

// Define types for form inputs
type FormInputs = {
  customerName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  companyUrl: string;
  companyAddress: string;
  city: string;
  country: string;
  postalCode: string;
  aboutCompany: string;
  workDomain: string;
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
    <div className="w-full px-2">
      <label htmlFor="workDomain" className="block mt-6">
        Work Domain
      </label>
      <div className="border-2 border-[#DFEAF2] rounded-md p-2 mt-2 bg-white h-40 cursor-pointer">
        {workDomains.map((domain, index) => (
          <span
            key={index}
            className="inline-block bg-[#E8E3FA] rounded-full pl-5 pr-7 py-3 text-sm text-black mr-2 mb-2"
          >
            {domain}
            <button
              onClick={() => handleRemove(index)}
              className="ml-5 text-black"
            >
              <Image src={Close} alt="Remove" width={10} />
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
      {errors.workDomain && (
        <span role="alert" className="text-red-600">
          Work Domain is required
        </span>
      )}
    </div>
  );
};

const CustomerForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data); // Replace with your logic to handle form submission
  };

  return (
    <div className="p-5 pt-0">
      <div className="text-xl font-semibold">Basic Details</div>
      <div className="flex py-5 items-center">
        <div className="w-[20%]">
          <Image src={Profile} alt="Profile Pic" className="pr-3"  />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label htmlFor="customerName" className="block text-sm ">
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              {...register("customerName", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.customerName && (
              <span role="alert" className="text-red-600">
                Customer Name is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm  ">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              {...register("companyName", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.companyName && (
              <span role="alert" className="text-red-600">
                Company Name is required
              </span>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="companyUrl" className="block text-sm ">
              Company URL
            </label>
            <input
              id="companyUrl"
              type="url"
              {...register("companyUrl", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.companyUrl && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-xl font-semibold py-7">Contact Details</div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm ">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.phoneNumber && (
            <span role="alert" className="text-red-600">
              Phone Number is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm ">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.email && (
            <span role="alert" className="text-red-600">
              Email is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="companyAddress" className="block text-sm ">
            Company Address
          </label>
          <input
            id="companyAddress"
            type="text"
            {...register("companyAddress", { required: true })}
            className="input-field p-2 mt-2 mb-2  w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.companyAddress && (
            <span role="alert" className="text-red-600">
              Company Address is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="city" className="block text-sm ">
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("city", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.city && (
            <span role="alert" className="text-red-600">
              City is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="country" className="block text-sm ">
            Country
          </label>
          <input
            id="country"
            type="text"
            {...register("country", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.country && (
            <span role="alert" className="text-red-600">
              Country is required
            </span>
          )}
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm ">
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            {...register("postalCode", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.postalCode && (
            <span role="alert" className="text-red-600">
              Postal Code is required
            </span>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="aboutCompany" className="block text-sm ">
            About Company
          </label>
          <textarea
            id="aboutCompany"
            {...register("aboutCompany", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full h-40 border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.aboutCompany && (
            <span role="alert" className="text-red-600">
              About Company is required
            </span>
          )}
        </div>
        <div className="col-span-2">
        <WorkDomainInput register={register} errors={errors} />
        </div>
        <div className="flex justify-end w-full mt-6 col-span-2">
          <button
            type="submit"
            className="btn-submit ml-auto block rounded bg-[#5027D9] py-3 px-5 text-sm text-white"
          >
            Save details
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
