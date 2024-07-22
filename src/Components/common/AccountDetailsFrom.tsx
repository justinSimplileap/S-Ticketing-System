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
import { File } from "buffer";
import { base_url } from "@/utils/constant";

type FormInputs = {
  customerName: string;
  companyName: string;
  phoneNumber: string;
  companyUrl: string;
  companyAddress: string;
  city: string;
  country: string;
  postalCode: string;
  aboutCompany: string;
  workDomain: string;
  profileImage: File | null;
};

interface UserDetailsResponse {
  user: {
    email: string;
    customer_name: string;
    company_legal_name: string;
    company_url: string;
    phone_number: string;
    address: string;
    country: string;
    city: string;
    postal_code: string;
    about_company: string;
    work_domain: string;
    profile_url: string;
  };
}

const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const AccountDetailsForm: React.FC = () => {
  const pathname = usePathname();

  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState<globalThis.File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get<UserDetailsResponse>(
        `${base_url}/getUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        setUserEmail(response.data.user.email);
        setValue("customerName", response.data.user.customer_name);
        setValue("companyName", response.data.user.company_legal_name);
        setValue("companyUrl", response.data.user.company_url);
        setValue("phoneNumber", response.data.user.phone_number);
        setValue("companyAddress", response.data.user.address);
        setValue("city", response.data.user.city);
        setValue("country", response.data.user.country);
        setValue("postalCode", response.data.user.postal_code);
        setValue("aboutCompany", response.data.user.about_company);
        setWorkDomains(response.data.user.work_domain.split(","));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file)); 
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
      const formData = new FormData();

      // Append profile image if it exists
      if (profileImage) {
        formData.append("files", profileImage);
      }

      // Append other form data
      formData.append("customer_name", data.customerName);
      formData.append("company_legal_name", data.companyName);
      formData.append("company_url", data.companyUrl);
      formData.append("phone_number", data.phoneNumber.toString());
      formData.append("address", data.companyAddress);
      formData.append("postal_code", data.postalCode);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("about_company", data.aboutCompany);
      formData.append("work_domain", data.workDomain);

      const response = await axios.put(
        `${base_url}/updateAccountDetails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Form submitted successfully:", response.data);
      toast.success("Account details updated successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update account details");
    }
  };

  return (
    <div className="p-5 pt-0">
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl font-semibold">Basic Details</div>
        <div className="flex py-5 items-center">
          <div className="w-[20%]">
            <div className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer">
              <Image
                // src={profileImage ? URL.createObjectURL(profileImage) : Profile}
                src={profileImageUrl || Profile}
                alt="Profile Pic"
                layout="fill"
                objectFit="cover"
                onClick={() => {
                  const uploadInput = document.getElementById("uploadImage");
                  if (uploadInput) {
                    uploadInput.click();
                  }
                }}
              />
            </div>
            <input
              id="uploadImage"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
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
              Country <span className="text-red-500 text-base">*</span>
            </label>
            <select
              id="country"
              {...register("country", { required: true })}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
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
