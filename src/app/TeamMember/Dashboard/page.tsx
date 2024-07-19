import React from 'react';
import bell from "../../../../public/images/bell.svg"
import user from "../../../../public/images/user.svg"
import Image from "next/image";
import Link from "next/link";
import Icon_Order from "../../../../public/images/Icon_Order.svg";
import Arrow from "../../../../public/images/Arrow 2.svg"
import Rectangle from "../../../../public/images/Rectangle.svg"
import TableTwo from "../../../Components/common/TableTwo"
import group from "../../../../public/images/group.svg"
import warning from "../../../../public/images/warning.svg"
import test from "../../../../public/images/test.svg"
import tick from "../../../../public/images/tick.svg"


const Manager = () => {
    return (
        <div className=''>
            <div className='flex justify-between p-6 bg-[#FFFFFF] drop-shadow-md'>
                <h1 className="font-normal text-xl">Dasboard</h1>
                <div className='flex space-x-4'>
                <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center">
        <Image src={bell} alt="Another Icon" width={20} height={20} />
      </div>
      <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center"></div>
                </div>
            </div>
            <div className='p-6 '>
                <div className=" shadow-lg rounded-md">
                    <h1 className=" p-7 text-[#2A2C3E] text-xl font-bold font-lato ">Summary</h1>
                    <div className="grid grid-cols-4 gap-4 pl-5 pr-5">
                        <div className="bg-[#F7F7F7] p-8  rounded-md  mb-7">
                            <div className="grid grid-cols-2 pb-10">
                                <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={group} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={32} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">75</div>
                                <div className="text-[#696969]">New tickets</div>
                            </div>
                        </div>

                        <div className="bg-[#F7F7F7] p-8 rounded-md mb-7">
                            <div className="grid grid-cols-2 pb-10">
                            <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={warning} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={32} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">75</div>
                                <div className="text-[#696969]">Open tickets</div>
                            </div>
                        </div>
                        <div className="bg-[#F7F7F7] p-8 rounded-md  mb-7">
                            <div className="grid grid-cols-2 pb-10">
                            <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={test} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={32} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">75</div>
                                <div className="text-[#696969]">New tickets</div>
                            </div>
                        </div>

                        <div className="bg-[#F7F7F7] p-8 rounded-md  mb-7">
                            <div className="grid grid-cols-2 pb-10">
                            <div className="w-16 h-16 bg-[#D4C7FF] rounded-full flex items-center justify-center">
                                    <Image src={tick} alt="Order Icon" width={30} height={30} className="rounded-full" />
                                </div>
                                <div className="flex justify-end items-end">
                                    <Image src={Arrow} alt="hhh" width={32} />
                                </div>
                            </div>
                            <div className="pl-5 grid gap-3">
                                <div className="text-4xl text-[#5027D9]">75</div>
                                <div className="text-[#696969]">Closed tickets</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-6'>
                <div className='bg-[#FFFFFF] shadow-md w-1/2 p-3 rounded-lg font-bold'>
                    <h1>Pinned Tickets</h1>
                    <div className='mt-2 '><Image src={Rectangle} alt="notify" /></div>
                </div>
            </div>
            <div className='p-6'>
                <TableTwo />
            </div>
        </div>
    );
};

export default Manager;
