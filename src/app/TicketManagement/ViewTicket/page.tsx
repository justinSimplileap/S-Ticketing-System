"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import breadcrumbArrow from '../../../../public/images/BreadcrumbArrow.svg';
import Bell from '../../../../public/images/bell.svg';
import userBg from '../../../../public/images/User.svg';

const Page: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabClasses = ({ selected }: { selected: boolean }) =>
    `px-4 py-2 text-sm font-medium focus:outline-none ${
      selected ? 'text-[#5027D9] border-b-2 border-[#5027D9]' : 'text-gray-500'
    }`;

  return (
    <div className="">
      <div className="flex items-center justify-between shadow-md p-8 sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-3">
          <div className="text-[#2A2C3E] text-xl">
            <Link href="/TicketManagement">Ticket Management </Link>
          </div>
          <div>
            <Image src={breadcrumbArrow} alt="breadcrumb" width={25} />
          </div>
          <div className="text-[#2A2C3E] text-xl">View Ticket</div>
          <div>
            <Image src={breadcrumbArrow} alt="breadcrumb" width={25} />
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <div>
            <Image src={Bell} alt="Notification Bell" width={25} />
          </div>
          <div>
            <Image src={userBg} alt="User" width={50} />
          </div>
        </div>
      </div>

      <div className="bg-[#F9F9F9] p-10 m-10 rounded-md">
        <div className="text-[#2A2C3E] text-2xl mb-6">View Ticket</div>

        <div className="grid grid-cols-3 py-5">
          <div className="pb-5">
            <div className="text-base font-medium">Ticket ID</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">123123123123</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Ticket Type</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">Value</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Created On</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">23/03/1994</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Priority</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">High</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">Status</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">Open</p>
            </div>
          </div>

          <div className="pb-5">
            <div className="text-base font-medium">
              Total Hours Logged on Tickets
            </div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">10H 15M</p>
            </div>
          </div>

          <div className="">
            <div className="text-base font-medium">Raised By</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">Sheik Gulaam</p>
            </div>
          </div>

          <div className="">
            <div className="text-base font-medium">Assigned To</div>
            <div>
              <p className="text-base py-5 text-[#7D7D7D]">Justin Paul</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F9F9] p-10 m-10 rounded-md">
        <div className="pb-10">
          <div className="text-base font-medium pb-2">Subject</div>
          <div>
            <p className="text-sm text-[#7d7d7d] font-light">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>

        <div className="">
          <div className="text-base font-medium pb-2">Request Details</div>
          <div>
            <p className="text-sm text-[#7d7d7d] font-light">
              Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam
              vel congue luctus. Leo diam cras neque mauris ac arcu elit
              ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>

      <div className="m-10 rounded-md">
        <div className="p-10 bg-[#F9F9F9] text-base font-medium rounded-md">Activity</div>

        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-1 bg-white p-3 px-7 cursor-pointer">
            <Tab as="div" className={tabClasses}>Events Timeline</Tab>
            <Tab as="div" className={tabClasses}>Comments</Tab>
            <Tab as="div" className={tabClasses}>Files</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="p-10 bg-white">
              Events content goes here.
            </TabPanel>

            <TabPanel className="p-10 bg-white">Comments content goes here.</TabPanel>
            <TabPanel className="p-10 bg-white">Files content goes here.</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Page;
