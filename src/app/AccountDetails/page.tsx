"use client";
import React from "react";
import AccountDetailsFrom from "@/Components/common/AccountDetailsFrom";

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

  return (
    <div className="p-8">
      <div className=" rounded-md shadow-md">
        <div className="p-5 font-semibold text-xl  py-8">Account Details</div>
        <AccountDetailsFrom />
      </div>
    </div>
  );
};

export default FirstPassword;
