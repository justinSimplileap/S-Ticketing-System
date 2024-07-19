'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import simplileap from "../../../public/images/simplileap_black_logo_2023 1.svg"
import Image from "next/image";

// Define the interface for form data
interface FormData {
  username: string;
  password: string;
}

const FirstPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); // Specify the FormData type here

  const onSubmit = (data: FormData) => { // Explicitly type the data parameter
    console.log(data);
  };

  return (
    <div>
     
    <div className=" lg:w-[80%] lg:p-10 py-10 lg:mt-28 mx-4 flex flex-col " >
    <div className='mb-8 lg:hidden m-auto'>
        <Image src={simplileap} alt="" />
      </div>
      <div className=" lg:w-[100%] font-bold text-2xl m-auto text-center lg:text-left mb-4 lg:mb-0">
        <h1> Reset Password</h1>
      </div>
      <div className='lg:w-[80%]'>
      <div className='mt-5 flex flex-col '>
    <label className='text-light text-[#5E626C] lg:mt-8'> Enter New Password</label>
      <input type="text" id="username" name="username" placeholder="*******" className='border border-slate-400 focus:outline-none  rounded-lg py-2 px-3 mt-2'/>
      </div>
      <div className='mt-5 flex flex-col '>
    <label className='text-light text-[#5E626C] '> Re-enter password</label>
      <input type="text" id="username" name="username" placeholder="*******" className='border border-slate-400 focus:outline-none  rounded-lg py-2 px-3 mt-2'/>
      <div className=' lg:flex lg:justify-end '>
        <button className='bg-[#5027D9] text-white px-8 py-3 rounded-md mt-4 w-full lg:w-1/4'>Next</button>
      </div>
      </div>
      </div>
      
     
      
    </div>
    </div>
    // <div className="w-[100%] md:w-1/2 bg-white flex items-center justify-center p-8 ms-8">
      // <form className="max-w-md w-full">
      //   <h2 className="text-2xl mb-8 font-bold mt-[100px]">Reset Password</h2>
      //   <div className="mb-4">
      //     <label htmlFor="username" className="block text-gray-700 text-sm font-
      //   Plus Jakarta Sans mb-2 ">New password*</label>
      //     <input type="text" id="username" name="username" placeholder="*******" className="w-[100%] px-3 py-2 border rounded-lg focus:outline-none  border-slate-400" />
      //   </div>
      //   <div className="mb-4">
      //     <label htmlFor="username" className="block text-gray-700 text-sm font-
      //   Plus Jakarta Sans mb-2">Re-enter password*</label>
      //     <input type="text" id="username" name="username" placeholder="*******" className="w-[100%] px-3 py-2 border rounded-lg focus:outline-none border-slate-400" />
      //   </div>

      //   <div className="flex justify-end">
      //     <button
      //       type="submit"
      //       className="bg-blue-500 hover:bg-blue-700 text-white  rounded focus:outline-none focus:shadow-outline py-2 px-4 pl-8 pr-8 font-medium "
      //       style={{
      //         // padding:'10px',
      //         borderRadius: '10px',
      //         backgroundColor: '#5027D9',
      //       }}
      //     >
      //       Next
      //     </button>
      //   </div>
      // </form>
    // </div>

  );
};

export default FirstPassword;