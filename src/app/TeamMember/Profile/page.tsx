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
     <div className='flex justify-between p-6 bg-[#FFFFFF] drop-shadow-md'>
        <h1 className="font-medium text-l mt-2">Ticket Management</h1>
        <div className='flex space-x-4'>
          <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center">
            <Image src={bell} alt="bell" width={20} height={20} />
          </div>
          <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center"></div>
        </div>
      </div>
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
