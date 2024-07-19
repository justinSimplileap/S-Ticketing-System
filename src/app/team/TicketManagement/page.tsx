"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import bell from '../../../../public/images/bell.svg';
import search from "../../../../public/images/search.svg";
import folder from "../../../../public/images/folder.svg";
import TableThree from "../../../Components/common/TableThree";

const CustomerOne = () => {
  const [typeValue, setTypeValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

  useEffect(() => {
    // Any client-side initialization can go here
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleReset = () => {
    setTypeValue('');
    setPriorityValue('');
    setStatusValue('');
  };

  const handleSearch = () => {
    console.log('Search clicked');
  };

  const handleExport = () => {
    console.log('Export clicked');
  };

  return (
    <div>
      <div className='flex justify-between p-6 bg-[#FFFFFF] drop-shadow-md'>
        <h1 className="font-medium text-l mt-2 font-lato text-[#000000] tracking-wide">Ticket Management</h1>
        <div className='flex space-x-4'>
          <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center">
            <Image src={bell} alt="bell" width={20} height={20} />
          </div>
          <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center"></div>
        </div>
      </div>
      <div className='p-6'>
        <div className='flex justify-between items-center mt-4'>
          <h1 className="text-xl font-bold font-lato ">Tickets</h1>
          <div className='flex space-x-4 justify-items-center items-center'>
            <div className="relative flex-grow">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Search"
                className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none border-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Image src={search} alt="Search Icon" width={20} height={20} />
              </div>
            </div>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2  text-[#5027D9] rounded-lg focus:outline-none border border-[#5027D9]"
              onClick={handleExport}
            >
              <Image src={folder} alt="Export Icon" width={20} height={20} className="mr-2 font-lato" />
              Export Report
            </button>
          </div>
        </div>
      </div>
      <div className='p-6'>
        <div className=" bg-[#F3F3F3] rounded-md  p-8 ">
          <h1 className="text-sm font-semibold mb-4">Filter Ticket By</h1>
          <div className='flex space-x-2'>
            <div className="flex-grow">
              <label htmlFor="type" className="sr-only border border-[#E8E8E8]">Type</label>
              <select
                id="type"
                name="type"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none border-slate-400 text-[#8E8E8E]"
                value={typeValue}
                onChange={(e) => setTypeValue(e.target.value)}
              >
                <option value="">Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </select>
            </div>
            <div className="flex-grow">
              <label htmlFor="priority" className="sr-only">Priority</label>
              <select
                id="priority"
                name="priority"
                className="w-full px-3 py-2 border rounded-lg text-[#8E8E8E] focus:outline-none border-slate-400"
                value={priorityValue}
                onChange={(e) => setPriorityValue(e.target.value)}
              >
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex-grow">
              <label htmlFor="status" className="sr-only">Status</label>
              <select
                id="status"
                name="status"
                className="w-full px-3 py-2 border rounded-lg text-[#8E8E8E] focus:outline-none border-slate-400"
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
              >
                <option value="">Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <button
              type="button"
              className="px-8 py-2 bg-[#5027D9]  text-white rounded-lg focus:outline-none"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className='p-6'>
      <TableThree role="team" /> /
      </div>
    </div>
  );
};

export default CustomerOne;
