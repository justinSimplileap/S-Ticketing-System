"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import cover from "../../../public/images/cover.png";
import Illustration from "../../../public/images/Illustration.svg";
import toast, { Toaster } from "react-hot-toast";
import logoWhite from "../../../public/images/sidebarLogo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/Components/common/Loader";
import { base_url } from "@/utils/constant";
// Define the interface for form data
interface FormData {
  username: string;
  password: string;
}

interface User {
  onBoarded: boolean
  role: string
}

interface LoginResponseData {
  token: string;
  user: User;
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    
    try {
      setLoading(true)
      const response: AxiosResponse<LoginResponseData> = await axios.post(
        `${base_url}/login`,
        {
          email: data.username,
          password: data.password,
        }
      );

      

      if (response.status === 200) {
        const token  = response.data.token;
        localStorage.setItem('token', token)
        toast.success("Login successful!");
        const responseData = response.data;
        

        if (responseData?.user?.role === "1") {
          router.push("/SuperAdmin");

        }else if (responseData?.user?.role === "4" && responseData?.user?.onBoarded === false){
          router.push("/AccountDetails")
        } else if (responseData?.user?.role === "4" && responseData?.user?.onBoarded === true){
          router.push("/Dashboard")
        } else if (responseData?.user?.role === "3" && responseData?.user?.onBoarded === false){
          router.push("/Onboard/AccountDetails")
        } else if (responseData?.user?.role === "3" && responseData?.user?.onBoarded === true){
          router.push("/team/ManagerDashboard")
        } else {
          toast.error("Error logging in. Please check your credentials.");
        }

        // if (responseData?.user?.onBoarded === false && ) {
        //   console.log("Login successful:", response.data);
        //   localStorage.setItem("token", response.data.token);
        //   setLoading(false)
        //   router.push("/AccountDetails");
        // } else {
        //   console.log("Login successful:", response.data);
        //   localStorage.setItem("token", response.data.token);

        //   localStorage.setItem("token", response.data.token);
        //   setLoading(false)
        //   router.push("/Dashboard");

          
        // }
      }
    } catch (error) {
      toast.error("Error logging in. Please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="h-screen grid grid-cols-2">

        {/* left side  */}
        <div className=" relative h-full flex flex-col items-center">
          <Image
            src={cover}
            alt="Background"
            layout="fill"
            className="absolute z-[-1]"
          />
          <div className="flex justify-center items-center mt-28 mb-28">
            <Image src={logoWhite} alt="Logo" height={50} />
          </div>
          <div className="">
            <Image src={Illustration} alt="Illustration" height={300} />
          </div>

          <div className="flex justify-center mt-14">
            <h1 className="text-white text-3xl font-bold ">
              Ticket Management System
            </h1>
          </div>
          <div className="flex justify-center items-center text-white mt-14 w-[80%]">
            Streamline your ticketing process: Efficient, intuitive, and
            reliable ticket management for seamless service.
          </div>
        </div>


        {/* right side  */}

        {/* ========================================== */}
        <div className=" flex flex-col justify-center items-center gap-14 w-[70%] mx-auto h-full">
          <div className="text-3xl font-bold text-center text-black">
            Welcome to <br></br>Ticket Management System
          </div>
          <div className="flex flex-col justify-start w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                    validate: {
                      noSpaces: (value) =>
                        !/\s/.test(value) ||
                        "Username should not contain spaces",
                    },
                  })}
                  id="username"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs ">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: {
                      noSpaces: (value) =>
                        !/\s/.test(value) ||
                        "Password should not contain spaces",
                    },
                  })}
                  id="password"
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-2"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs ">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center p-6">
                <button
                  type="submit"
                  className="bg-[#5027d9] hover:bg-blue-700 text-white py-4 px-10 rounded-xl focus:outline-none focus:shadow-outline font-xs"
                >
                  LOG IN
                </button>
              </div>
              <div className="text-sm mt-4 flex justify-center gap-3">
                <Link href="/reset">Forgot Password?</Link>
                <span className="text-gray-500">|</span>
                <Link href="/reset" className="font-bold underline">
                  RESET PASSWORD
                </Link>
              </div>
            </form>
            {loading && (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;