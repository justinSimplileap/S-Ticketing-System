'use client';
import Image from 'next/image';
import logo from "../../../../public/images/logo.svg";
import { useForm } from 'react-hook-form';
import Illustration from "../../../../public/images/Illustration.svg";
import toast, { Toaster } from 'react-hot-toast';
import cover from "../../../../public/images/cover.png";
import btn from "../../../../public/images/btn.svg"

interface FormData {
  username: string;
  password: string;
}

const LayoutComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  return (
   
    <div className="flex h-screen ">
      {/* Left side with background image */}
      <div className="relative w-1/2 h-screen">
        <Image src={cover} alt="Logo" layout="fill" objectFit="cover" className="absolute"/>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8">
          <Image src={logo} alt="Logo" width={200} height={100} />
        </div>
        {/* Image below the logo */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-44 w-full flex flex-col items-center">
          <Image src={Illustration} alt="Illustration" className="w-[50%] max-w-lg" />
          {/* Heading and paragraph */}
          <div className="text-center mt-11 w-3/4">
            <h1 className="text-2xl font-bold text-[#FFFFFF] font-lato">Ticket Management System</h1>
            <p className="text-lg text-[#F5F5F5] mt-8 leading-relaxed font-lato">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-10 bg-white">
        <h1
          className="  mb-6 text-center font-lato text-[#242424] mt-8 w-1/2 font-bold text-3xl"
         
        >
          Welcome to Ticket Management System
        </h1>
        <form>
          <div className="mb-4 relative">
            <label
              className="block text-[#5E626C]  font-light mb-2 text-base font-lato"
              htmlFor="username"
            
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              {...register("username", { required: true })}
              id="username"
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none border-[#7F7F7F]" 
             
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-xs italic">Username is required.</p>}
          </div>
          <div className="mb-4 relative">
          <label
              className="block text-[#5E626C]  font-light mb-2 text-base font-lato "
              htmlFor="username"
            
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              {...register("password", { required: true })}
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight font-lato focus:outline-none border-[#7F7F7F]"
              style={{
                width: '520px',
              }}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs italic font-lato">Password is required.</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{
                width: '153px',
                height: '56px',
                borderRadius: '8px',
                backgroundColor: '#5027D9',
              }}
            >
              LOGIN
            </button>
          </div>
          <div className="text-sm mt-8 flex justify-center">
            <a href="#" className="text-[#424242] hover:underline mr-2 font-lato">Forgot password?</a>
            <span className="text-gray-500">|</span>
            <a href="#" className=" hover:underline ml-2 text-[#212121] font-semibold font-lato">RESET PASSWORD</a>
          </div>
          <div className=" flex items-center justify-center">
  <Image src={btn} alt="Icon" className="mt-8" />
</div>
        </form>
      </div>
    </div>
  );
};

export default LayoutComponent;
