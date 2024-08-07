import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import Profile from "../../../public/images/Profile.svg";
import Close from "../../../public/images/close.svg";
import toast, { Toaster } from "react-hot-toast";
import ProfilePic from "../../../public/images/Profile.svg";
import { Button } from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";
import { File } from "buffer";
import { base_url } from "@/utils/constant";
import Plus from "../../../public/images/Plus.svg";

interface AddClientTeamMemberFormProps {
  organizationId: string;
  company_legal_name: string;
}

const AddClientTeamMemberForm: React.FC<AddClientTeamMemberFormProps> = ({
  organizationId,
  company_legal_name,
}) => {
  const [profileImage, setProfileImage] = useState<globalThis.File | null>(
    null
  );
  const designations = [
    "Manager",
    "Developer",
    "Designer",
    "QA",
    "Intern",
    "Other",
  ];

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddClientMember = async (data: any) => {
    console.log("Data received from form submission:", data);

    // Create a new FormData object
    const formData = new FormData();

    // Append form data
    formData.append("organization_id", organizationId);
    formData.append("customer_name", data.customer_name);
    formData.append("company_legal_name", data.company_legal_name);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("designation", data.designation);
    formData.append("role", "Client Team");

    // Append profile image if it exists
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      console.log("Form data to be sent to server:", formData);

      const response = await axios.post(
        `${base_url}/addClientTeamMember`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

  return (
    <div>
      <Toaster />
      <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
      <form onSubmit={handleSubmit(handleAddClientMember)}>
        <div className="flex py-5">
          <div className="w-[20%]">
            <div className="relative w-20 h-20 rounded-full overflow-hidden cursor-pointer">
              <Image
                src={profileImage ? URL.createObjectURL(profileImage) : Profile}
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
                {...register("customer_name", {
                  required: true,
                })}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.customer_name && (
                <span className="text-red-600">Customer Name is required</span>
              )}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender", { required: true })}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-600">Gender is required</span>
              )}
            </div>
            <div>
              <label htmlFor="companyUrl" className="block text-sm ">
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
                <span className="text-red-600">Phone Number is required</span>
              )}
            </div>
            <div>
              <label htmlFor="companyUrl" className="block text-sm ">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div>
              <label htmlFor="companyUrl" className="block text-sm ">
                Customer Company
              </label>
              <input
                id="customerCompany"
                type="text"
                defaultValue={company_legal_name}
                disabled
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
              <label htmlFor="password" className="block text-sm ">
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
              <label htmlFor="designation" className="block text-sm ">
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
                <span className="text-red-600">Designation is required</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="rounded bg-[#5027D9] py-3 px-7 text-sm text-white flex items-center gap-2"
          >
            <Image src={Plus} alt="add" width={20} height={20} />
            Add Member
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddClientTeamMemberForm;
