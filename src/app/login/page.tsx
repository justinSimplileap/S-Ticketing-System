"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import cover from "../../../public/images/cover.png";
import Illustration from "../../../public/images/newIllustration2.png";
import toast, { Toaster } from "react-hot-toast";
import logoWhite from "../../../public/images/sidebarLogo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/Components/common/Loader";
import { base_url } from "@/utils/constant";
import logoBlack from "../../../public/images/simplileap_black_logo_2023 1.svg";

// Define the interface for form data
interface FormData {
  username: string;
  password: string;
}

interface User {
  onBoarded: boolean;
  role: string;
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
      setLoading(true);
      const response: AxiosResponse<LoginResponseData> = await axios.post(
        `${base_url}/login`,
        {
          email: data.username,
          password: data.password,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Save token to local storage
        localStorage.setItem("token", token);

        // Determine the redirect route based on role and onboarding status
        let redirectPath = "";

        if (user.role === "1") {
          redirectPath = "/SuperAdmin";
        } else if (user.role === "4" || user.role === "2") {
          redirectPath = user.onBoarded ? "/Dashboard" : "/AccountDetails";
        } else if (user.role === "3") {
          redirectPath = user.onBoarded ? "/TeamMember/Dashboard" : "/AccountDetails";
        } else {
          toast.error("Error logging in. Please check your credentials.");
          setLoading(false);
          return; // Exit early if there is an error
        }

        // Successful login toast and redirection
        toast.success("Login successful!");
        localStorage.setItem("role", user.role);
        router.push(redirectPath);
      } else {
        toast.error("Error logging in. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="h-screen grid grid-cols-1 md:grid-cols-2">
        {/* left side  */}
        <div className="hidden md:flex relative h-full justify-center items-center">
          <Image
            src={cover}
            alt="Background"
            layout="fill"
            className="absolute z-[-1] brightness-50"
          />
          <div>
            <Image src={Illustration} alt="Illustration" height={650} width={650} />
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col justify-center items-center md:gap-14 gap-3 md:w-[70%] w-[100%] mx-auto h-screen overflow-hidden">
          <div className="flex justify-center items-center mb-[33px]">
            <Image src={logoBlack} alt="Logo" height={200} width={200} />
          </div>
          <div className="md:text-3xl text-2xl font-bold text-center text-black md:mb-0 mb-[33px]">
            Welcome to <br />Ticket Management System
          </div>
          <div className="flex flex-col justify-start w-full md:pl-0 md:pr-0 pl-3 pr-3 md:pb-0 pb-3">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Email <span className="text-red-500">*</span>
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
                  className="appearance-none border rounded w-full py-[0.938rem] px-3 text-gray-700 leading-tight focus:outline-none mb-2 text-sm shadow-[0px_0px_10px_rgba(0,0,0,0.05)] pl-[1rem]"
                  placeholder="Enter your email"
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
                  className="shadow-[0px_0px_10px_rgba(0,0,0,0.05)] appearance-none border rounded w-full py-[0.938rem] px-3 text-gray-700 leading-tight focus:outline-none mb-2 text-sm pl-[1rem]"
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
                  className="bg-[linear-gradient(107deg,_#3430a7,_#a432df)] hover:bg-[linear-gradient(107deg,_#3430a7,_#a432df)] text-white pt-[14px] pb-[15px] px-10 rounded-[5px] focus:outline-none focus:shadow-outline font-xs md:w-[10rem] w-full text-sm"
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
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
