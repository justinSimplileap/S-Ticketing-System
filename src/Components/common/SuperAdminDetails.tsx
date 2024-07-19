"use client";
import React, { useState, useEffect  } from "react";
import { useForm, SubmitHandler, FieldErrors, UseFormRegister } from "react-hook-form";
import Image from 'next/image';
import Profile from "../../../public/images/Profile.svg";
import Close from "../../../public/images/closebutton.svg";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
type FormInputs = {
  customer_name: string;
  company_legal_name: string;
  email: string;
  phone_number: string;
  company_url: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  about_company: string;
  work_domain: string;
};
type SuperAdminDetailsProps = {
    superAdmin: {
      customer_name: string;
      company_legal_name: string;
      email: string;
      phone_number: string;
      company_url: string;
      address: string;
      city: string;
      country: string;
      postal_code: string;
      about_company: string;
      work_domain: string;
    } | null;
  };
  const SuperAdminDetails: React.FC<SuperAdminDetailsProps> = ({ superAdmin }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>();
    const [workDomains, setWorkDomains] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    if (superAdmin) {
      setValue("customer_name", superAdmin.customer_name);
      setValue("company_legal_name", superAdmin.company_legal_name);
      setValue("email", superAdmin.email);
      setValue("phone_number", superAdmin.phone_number);
      setValue("company_url", superAdmin.company_url);
      setValue("address", superAdmin.address);
      setValue("city", superAdmin.city);
      setValue("country", superAdmin.country);
      setValue("postal_code", superAdmin.postal_code);
      setValue("about_company", superAdmin.about_company);
      const domains = superAdmin.work_domain.split(",");
      setWorkDomains(domains);
      setValue("work_domain", domains.join(","));
    }
  }, [superAdmin, setValue]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newWorkDomains = [...workDomains, inputValue.trim()];
      setWorkDomains(newWorkDomains);
      setInputValue("");
      setValue("work_domain", newWorkDomains.join(","), {
        shouldValidate: true,
      });
    }
  };
  const handleRemove = (index: number) => {
    const newWorkDomains = workDomains.filter((_, i) => i !== index);
    setWorkDomains(newWorkDomains);
    setValue("work_domain", newWorkDomains.join(","), { shouldValidate: true });
  };
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    
    
  };
  return (
    
    <div className="p-5 pt-0">
      <Toaster />
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
              {...register("customer_name", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.customer_name && (
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
              {...register("company_legal_name", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.company_legal_name && (
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
              {...register("company_url", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.company_url && (
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
            {...register("phone_number", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.phone_number && (
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
          <label htmlFor="address" className="block text-sm ">
            Company Address
          </label>
          <input
            id="address"
            type="text"
            {...register("address", { required: true })}
            className="input-field p-2 mt-2 mb-2  w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.address && (
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
            {...register("postal_code", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.postal_code && (
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
            {...register("about_company", { required: true })}
            className="input-field p-2 mt-2 mb-2 w-full h-40 border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {errors.about_company && (
            <span role="alert" className="text-red-600">
              About Company is required
            </span>
          )}
        </div>
        <div className="col-span-2">
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
              {...register("work_domain", { required: true })}
              value={workDomains.join(",")}
            />
            {errors.work_domain && (
              <span role="alert" className="text-red-600">
                Work Domain is required
              </span>
            )}
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
export default SuperAdminDetails;