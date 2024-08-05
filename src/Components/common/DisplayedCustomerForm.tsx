"use client";
import React, { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import Image from "next/image";
import Profile from "../../../public/images/Profile.svg";
import Close from "../../../public/images/closebutton.svg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { base_url } from "@/utils/constant";
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
interface DisplayedCustomerFormProps {
  selectedUserId: string | null;
  selectedUserName: string | null;
  selectedUserEmail: string | null;
  selectedUserPhone: string | null;
  selectedUserUrl: string | null;
  selectedUserArea: string | null;
  selectedUserCompanyName: string | null;
  selectedUserAddress: string | null;
  selectedUserCity: string | null;
  selectedUserCountry: string | null;
  selectedUserPostalCode: string | null;
  selectedUserAbout: string | null;
  selectedUserWorkDomain: string | null;
  selectedUserProfilePic: string | null;
}
const DisplayedCustomerForm: React.FC<DisplayedCustomerFormProps> = ({
  selectedUserId,
  selectedUserName,
  selectedUserProfilePic,
  selectedUserEmail,
  selectedUserPhone,
  selectedUserUrl,
  selectedUserArea,
  selectedUserCompanyName,
  selectedUserAddress,
  selectedUserCity,
  selectedUserCountry,
  selectedUserPostalCode,
  selectedUserAbout,
  selectedUserWorkDomain,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();
  const [workDomains, setWorkDomains] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    if (selectedUserWorkDomain) {
      const initialWorkDomains = selectedUserWorkDomain.split(",");
      setWorkDomains(initialWorkDomains);
      setValue("work_domain", initialWorkDomains.join(","), {
        shouldValidate: true,
      });
    }
  }, [selectedUserWorkDomain, setValue]);
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


  const [profileImage, setProfileImage] = useState<globalThis.File | null>(null);


  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
  try {
    console.log(data);
    
    if (!selectedUserId) {
      toast.error("User ID is missing.");
      return;
    }

    const formData = new FormData();

    // Append existing data to the FormData object
    formData.append("id", selectedUserId.toString());
    formData.append("customer_name", data.customer_name);
    formData.append("company_legal_name", data.company_legal_name);
    formData.append("company_url", data.company_url);
    formData.append("phone_number", data.phone_number.toString());
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("postal_code", data.postal_code);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("about_company", data.about_company);
    formData.append("work_domain", data.work_domain);

    // Append the profile image if it exists
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const response = await axios.put(
      `${base_url}/updateCustomer`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data', // Specify that the request body is FormData
        },
      }
    );

    toast.success("Customer updated successfully");
    console.log("Customer updated successfully:", response.data);
    location.reload();
  } catch (error) {
    console.error("Error updating customer:", error);
    toast.error("Failed to update customer");
  }
};

  const onDelete = async () => {
    try {
      if (!selectedUserId) {
        toast.error("User ID is missing.");
        return;
      }
      const response = await axios.delete(
        `${base_url}/deleteCustomer/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      toast.success("Customer deleted successfully");
      console.log("Customer deleted successfully:", response.data);
  
      router.push("/SuperAdmin/Settings"); 
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    }
  };
  


  return (
    <div className="p-5 pt-0">
      <Toaster />
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Basic Details</div>
        <div className="text-xl font-semibold">
          User ID : <span className=" text-[#5027D9]">{selectedUserId}</span>
        </div>
      </div>
      <div className="flex py-5 items-center">
      <div className="w-[20%]">
          <div className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer">
            <Image
             src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : (selectedUserProfilePic || Profile) 
            }
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
            <label htmlFor="customerName" className="block text-sm ">
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              defaultValue={selectedUserName || ""}
              {...register("customer_name")}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {/* {errors.customer_name && (
              <span role="alert" className="text-red-600">
                Customer Name is required
              </span>
            )} */}
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm  ">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              defaultValue={selectedUserCompanyName || ""}
              {...register("company_legal_name")}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {/* {errors.company_legal_name && (
              <span role="alert" className="text-red-600">
                Company Name is required
              </span>
            )} */}
          </div>
          <div className="col-span-2">
            <label htmlFor="companyUrl" className="block text-sm ">
              Company URL
            </label>
            <input
              id="companyUrl"
              type="url"
              defaultValue={selectedUserUrl || ""}
              {...register("company_url")}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            {/* {errors.company_url && (
              <span role="alert" className="text-red-600">
                Company URL is required
              </span>
            )} */}
          </div>
        </div>
      </div>
      <div className="text-xl font-semibold py-7">Contact Details</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label htmlFor="phoneNumber" className="block text-sm ">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            defaultValue={selectedUserPhone || ""}
            {...register("phone_number")}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {/* {errors.phone_number && (
            <span role="alert" className="text-red-600">
              Phone Number is required
            </span>
          )} */}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm ">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={selectedUserEmail || ""}
            {...register("email")}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {/* {errors.email && (
            <span role="alert" className="text-red-600">
              Email is required
            </span>
          )} */}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm ">
            Company Address
          </label>
          <input
            id="address"
            type="text"
            defaultValue={selectedUserAddress || ""}
            {...register("address")}
            className="input-field p-2 mt-2 mb-2  w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {/* {errors.address && (
            <span role="alert" className="text-red-600">
              Company Address is required
            </span>
          )} */}
        </div>
        <div>
          <label htmlFor="city" className="block text-sm ">
            City
          </label>
          <input
            id="city"
            type="text"
            defaultValue={selectedUserCity || ""}
            {...register("city")}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {/* {errors.city && (
            <span role="alert" className="text-red-600">
              City is required
            </span>
          )} */}
        </div>
        <div>
          <label htmlFor="country" className="block text-sm ">
            Country
          </label>
          <input
            id="country"
            type="text"
            defaultValue={selectedUserCountry || ""}
            {...register("country")}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {/* {errors.country && (
            <span role="alert" className="text-red-600">
              Country is required
            </span>
          )} */}
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm ">
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            defaultValue={selectedUserPostalCode || ""}
            {...register("postal_code")}
            className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {/* {errors.postal_code && (
            <span role="alert" className="text-red-600">
              Postal Code is required
            </span>
          )} */}
        </div>
        <div className="col-span-2">
          <label htmlFor="aboutCompany" className="block text-sm ">
            About Company
          </label>
          <textarea
            id="aboutCompany"
            defaultValue={selectedUserAbout || ""}
            {...register("about_company")}
            className="input-field p-2 mt-2 mb-2 w-full h-40 border-2 border-[#DFEAF2] rounded-md focus:outline-none"
          />
          {/* {errors.about_company && (
            <span role="alert" className="text-red-600">
              About Company is required
            </span>
          )} */}
        </div>
        <div className="col-span-2">
          <label htmlFor="workDomain" className="block mt-6">
            Work Domain
          </label>
          <div className="border-2 border-[#DFEAF2] rounded-md p-2 mt-2 bg-white h-40 cursor-pointer">
            {workDomains.map((domain, index) => (
              <span
                key={index}
                // defaultValue={selectedUserWorkDomain || ""}
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
            {...register("work_domain")}
            value={workDomains.join(",")}
          />
          {/* {errors.work_domain && (
              <span role="alert" className="text-red-600">
                Work Domain is required
              </span>
            )} */}
        </div>
        <div className="flex justify-end w-full mt-6 col-span-2 gap-5">
          <button
            type="submit"
            className="btn-submit ml-auto block rounded bg-[#5027D9] py-3 px-5 text-sm text-white"
          >
            Update details
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] border-[#5027D9] border-2"
          >
            Remove Customer
          </button>
        </div>
      </form>
    </div>
  );
};
export default DisplayedCustomerForm;