"use client";
import React, { useEffect } from "react";
import AccountDetailsFrom from "@/Components/common/AccountDetailsFrom";
import toast, { Toaster } from "react-hot-toast";

// Define the interface for form data
interface FormData {
  companyLegalName: string;
  companyURL: string;
  areaOfWork: string;
  phoneNumber: string;
  address: string;
  country: string;
}

const FirstPassword = () => {

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (loginSuccess) {
      toast.success("Login successful!");
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  return (
    <div className="p-8">
    <Toaster />
      <div className=" rounded-md shadow-md">
        <div className="p-5 font-semibold text-xl  py-8">Account Details</div>
        <AccountDetailsFrom />
      </div>
    </div>
  );
};

export default FirstPassword;
