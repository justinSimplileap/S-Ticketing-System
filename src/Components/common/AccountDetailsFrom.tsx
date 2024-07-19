"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import Profile from "../../../public/images/Profile.svg";
import Close from "../../../public/images/close.svg";
import toast, { Toaster } from "react-hot-toast";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type FormInputs = {
  customerName: string;
  companyName: string;
  phoneNumber: number;
  companyUrl: string;
  companyAddress: string;
  city: string;
  country: string;
  postalCode: string;
  aboutCompany: string;
  workDomain: string;
};

interface UserDetailsResponse {
  user: {
    email: string;
  };
}

const AccountDetailsForm: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();


  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get<UserDetailsResponse>(
        "http://localhost:8000/getUserDetails",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        setUserEmail(response.data.user.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSkipButton =
    pathname === "/AccountDetails" ? (
      <Link href="/Dashboard">
        <button className="block text-sm text-[#5027D9]">Skip for now</button>
      </Link>
    ) : null;

  const saveOrNextButton =
    pathname === "/AccountDetails" ? (
      <button
        type="submit"
        className="btn-submit ml-auto block rounded bg-[#5027D9] py-4 px-14 text-sm text-white"
      >
        Next
      </button> 
    ) : (
      <button
        type="submit"
        className="btn-submit ml-auto block rounded bg-[#5027D9] py-4 px-14 text-sm text-white"
      >
        Save Details
      </button>
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();
  const [workDomains, setWorkDomains] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newWorkDomains = [...workDomains, inputValue.trim()];
      setWorkDomains(newWorkDomains);
      setInputValue("");
      setValue("workDomain", newWorkDomains.join(","), {
        shouldValidate: true,
      });
    }
  };

  const handleRemove = (index: number) => {
    const newWorkDomains = workDomains.filter((_, i) => i !== index);
    setWorkDomains(newWorkDomains);
    setValue("workDomain", newWorkDomains.join(","), { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Form data:", data); // Log form data to console
    try {
      const response = await axios.post(
        "http://localhost:8000/addAccountDetails",
        {
          customer_name: data.customerName,
          company_legal_name: data.companyName,
          company_url: data.companyUrl,
          phone_number: data.phoneNumber,
          address: data.companyAddress,
          postal_code: data.postalCode,
          country: data.country,
          city: data.city,
          about_company: data.aboutCompany,
          work_domain: data.workDomain,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store token in localStorage
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      toast.success("Account details added successfully");

      router.push("/Dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-5 pt-0">
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl font-semibold">Basic Details</div>
        <div className="flex py-5 items-center">
          <div className="w-[20%]">
            <Image src={Profile} alt="Profile Pic" className="pr-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label htmlFor="customerName" className="block text-sm">
                Customer Name <span className="text-red-500 text-base">*</span>
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
              <label htmlFor="companyName" className="block text-sm">
                Customer Company{" "}
                <span className="text-red-500 text-base">*</span>
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
              <label htmlFor="companyUrl" className="block text-sm">
                Company URL
              </label>
              <input
                id="companyUrl"
                type="url"
                {...register("companyUrl", {
                  required: true,
                  pattern: {
                    value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/,
                    message: "Please enter a valid URL",
                  },
                })}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.companyUrl && (
                <span role="alert" className="text-red-600">
                  {errors.companyUrl.message || "Company URL is required"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-xl font-semibold py-7">Contact Details</div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number should only contain numbers",
                },
              })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.phoneNumber && (
              <span role="alert" className="text-red-600">
                {errors.phoneNumber.message || "Phone Number is required"}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              disabled={true}
              placeholder={userEmail}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="companyAddress" className="block text-sm">
              Company Address
            </label>
            <input
              id="companyAddress"
              type="text"
              {...register("companyAddress", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.companyAddress && (
              <span role="alert" className="text-red-600">
                Company Address is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor="city" className="block text-sm">
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
            <label htmlFor="country" className="block text-sm">
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
            <label htmlFor="postalCode" className="block text-sm">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              {...register("postalCode", {
                required: true,
                pattern: {
                  value: /^\d{5,8}$/,
                  message: "Please enter a valid postal code",
                },
              })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {errors.postalCode && (
              <span role="alert" className="text-red-600">
                Postal Code is required
              </span>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="aboutCompany" className="block text-sm">
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
          <div className="flex justify-end w-full mt-6 col-span-2">
            <div className="flex justify-between items-center gap-14">
              {renderSkipButton}

              {saveOrNextButton}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;