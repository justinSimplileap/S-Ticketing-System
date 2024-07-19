'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Image from 'next/image';
import logo from "../../../public/images/logo.svg"
import cover from "../../../public/images/cover.png"
import reset from "../../../public/images/reset.svg"
import Simplileap from "../../../public/images/simplileap_black_logo_2023 1.svg"
// Define the interface for form data
interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); // Specify the FormData type here

  const onSubmit = (data: FormData) => { // Explicitly type the data parameter
    console.log(data);
  };

  return (
    <div className="h-screen flex md:flex-row flex-col ">
      <div className="relative w-1/2 h-screen hidden md:block">
        <Image src={cover} alt="Background" layout="fill" objectFit="cover" className="absolute" />
        <div className="absolute top-10 w-full flex justify-center">
          <Image src={logo} alt="Logo" width={100} height={100} className="object-contain h-48 w-40" />
        </div>
        <div className="absolute top-40 w-full flex justify-center ">
          <Image src={reset} alt="reset" className="3xl:w-[50%]" />
        </div>


        {/* <div className="flex-grow flex items-center justify-center">
                  <img src="/illustration.svg" className="h-90" alt="Illustration" /> 
                </div> */}
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="block md:hidden mb-8 mt-10">
          {/* Mobile logo */}
          <Image src={Simplileap} alt="Logo"/>
        </div>
        <form className="max-w-md w-full">
          <h2 className="text-2xl mb-8 text-center font-bold ">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm  mb-2">Enter Your Email
            <span className="text-red-500 ">*</span>
            </label>
            <input type="text" id="username" name="username" placeholder="user@mail.com" className="w-full px-3 py-2 border rounded-lg focus:outline-none border-[#D1D1D1]" />
          </div>
          <div className="mb-4 text-center md:text-left">
            <p className="md:font-light text-[#2A2A2A] md:text-[#2A2A2A] font-semibold text-sm md:text-sm">We will send a password reset link to your registered email ID</p>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded focus:outline-none focus:shadow-outline px-3 py-3 md:px-8 md:py-5 font-medium  w-full md:w-auto "
              style={{
                // padding:'10px',
                borderRadius: '10px',
                backgroundColor: '#5027D9',
              }}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;