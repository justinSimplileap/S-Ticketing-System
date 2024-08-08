'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import Image from 'next/image';
import logo from "../../../../public/images/logo.svg";
import cover from "../../../../public/images/cover.png";
import reset from "../../../../public/images/reset.svg";
import { usePathname, useRouter } from "next/navigation";
import axios from 'axios';
import { base_url } from '@/utils/constant';
import Loader from '@/Components/common/Loader';

// Define the interface for form data
interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const value = parts[parts.length - 1];
  console.log(value);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // setLoading(true)
    console.log(data);
    if (data.newPassword !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${base_url}/changePassword`, {
        email: value,  
        newPassword: data.newPassword,
      });
      if (response.status==200){
        setLoading(true);
        router.push("/login")
      }

      // console.log(response);
      
    } catch (error) {
      console.error('Failed to change password:', error);
      
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="relative w-1/2 h-screen">
        <Image src={cover} alt="Background" layout="fill" objectFit="cover" className="absolute" />
        <div className="absolute top-10 w-full flex justify-center">
          <Image src={logo} alt="Logo" width={100} height={100} className="object-contain h-48 w-40" />
        </div>
        <div className="absolute top-40 w-full flex justify-center ">
          <Image src={reset} alt="reset" className="3xl:w-[50%]" />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <form className="max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl mb-8 text-center font-bold">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-Plus Jakarta Sans mb-2">New password*</label>
            <input
              type="password"
              id="newPassword"
              {...register('newPassword', { required: true })}
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none border-slate-400"
            />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-Plus Jakarta Sans mb-2">Re-enter password*</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: true })}
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none border-slate-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline px-8 py-5 font-medium"
              style={{
                borderRadius: '10px',
                backgroundColor: '#5027D9',
              }}
            >
              Reset Password
            </button>
          </div>
        </form>
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
