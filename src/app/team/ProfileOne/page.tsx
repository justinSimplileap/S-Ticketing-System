'use client';
import bell from "../../../../public/images/bell.svg"
import Image from "next/image";
import TabTwo from '../../../Components/common/TabTwo'
import Link from "next/link";
// import Bell from "../../../public/images/bell.svg"
// import userBg from "../../../public/images/User.svg"


export default function Page() {
  return (
    <div className="">
   
      <div>

      </div>
      <div className="mt-10 ml-8 mr-8">
        <h1 className="text-2xl text-[#1D1C2B] font-bold">Profile</h1>
      </div>

     {/* Tabs starts */}

      <div className="p-2 m-8 bg-[#F9F9F9]">
       <TabTwo/>
      </div>

    </div>
  );
}
