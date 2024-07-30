'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import bell from '../../../../public/images/bell.svg';
import search from '../../../../public/images/search.svg';
import folder from '../../../../public/images/folder.svg';
import TableTwo from '../../../Components/common/TableTwo';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

type Ticket = {
  id: number;
  user_id: number;
  organization_id: number;
  company_legal_name: string;
  ticket_type: string;
  priority: string;
  status: string;
  subject: string;
  details: string;
  details_images_url: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  actions: string;
};

const CustomerOne = () => {
  const searchParams = useSearchParams();
  const [typeValue, setTypeValue] = useState('');
  const [priorityValue, setPriorityValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    const type = searchParams.get('type') || '';
    const priority = searchParams.get('priority') || '';
    const status = searchParams.get('status') || '';

    setTypeValue(type);
    setPriorityValue(priority);
    setStatusValue(status);
    fetchTickets(type, priority, status, searchTerm);
  }, [searchParams, searchTerm]);

  const fetchTickets = async (type: string, priority: string, status: string, search: string) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get<{ body: Ticket[] }>(`http://localhost:8000/allTickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { type, priority, status, company_legal_name: search }, // Pass company_legal_name as a query parameter
      });

      const fetchedTickets = response.data.body;
      setTickets(fetchedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };
const handleSearch = () => {
    fetchTickets(typeValue, priorityValue, statusValue, searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleReset = () => {
    setTypeValue('');
    setPriorityValue('');
    setStatusValue('');
    setSearchTerm('');
    fetchTickets('', '', '', '');
  };

  const handleFilterChange = (type: string, priority: string, status: string) => {
    fetchTickets(type, priority, status, searchTerm);
  };

  const handleExport = () => {
    // Logic for exporting reports
    console.log('Exporting report...');
  };
  const exportTableToExcel = () => {
    const table = document.getElementById('all-tickets-table');
    if (!table) return;

    let csvContent = "";
    const rows = Array.from(table.querySelectorAll("tr"));

    rows.forEach(row => {
      const cols = Array.from(row.querySelectorAll("td, th"));
      const rowData = cols.map(col => (col as HTMLElement).innerText).join(",");
      csvContent += rowData + "\n";
    });

    const dataType = 'text/csv;charset=utf-8;';
    const fileName = 'tickets.csv';
    const downloadLink = document.createElement('a');

    const blob = new Blob([csvContent], { type: dataType });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }


  return (
    <div>
      <div className='flex justify-between p-6 bg-[#FFFFFF] drop-shadow-md'>
        <h1 className='font-medium text-l mt-2 font-lato text-[#000000] tracking-wide'>Ticket Management</h1>
        <div className='flex space-x-4'>
          <div className='w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center'>
            <Image src={bell} alt='bell' width={20} height={20} />
          </div>
          <div className='w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center'></div>
        </div>
      </div>
      <div className='p-6'>
        <div className='flex justify-between items-center mt-4'>
          <h1 className='text-xl font-bold font-lato '>Tickets</h1>
          <div className='flex space-x-4 justify-items-center items-center'>
            <div className='relative flex-grow'>
              <input
                type='text'
                id='companyName'
                name='companyName'
                placeholder='Search '
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none border-slate-400'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <Image src={search} alt='Search Icon' width={20} height={20}   onClick={() => fetchTickets(typeValue, priorityValue, statusValue, searchTerm)}/>
              </div>
            </div>
            <button
              type='button'
              className='flex items-center justify-center px-4 py-2  text-[#5027D9] rounded-lg focus:outline-none border border-[#5027D9]'
              onClick={handleExport}
            >
              <Image src={folder} alt='Export Icon' width={20} height={20} className='mr-2 font-lato' onClick={exportTableToExcel} />
              Export Report
            </button>
          </div>
        </div>
      </div>
      <div className='p-6'>
        <div className='bg-[#F3F3F3] rounded-md p-8'>
          <h1 className='text-sm font-semibold mb-4'>Filter Ticket By</h1>
          <div className='flex space-x-2'>
            <div className='flex-grow'>
              <label htmlFor='type' className='sr-only border border-[#E8E8E8]'>
                Type
              </label>
              <select
                id='type'
                name='type'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none border-slate-400 text-[#8E8E8E]'
                value={typeValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setTypeValue(newValue);
                  handleFilterChange(newValue, priorityValue, statusValue);
                }}
              >
                <option value='' disabled hidden>Type</option>
                <option value='Type 1'>Type 1</option>
                <option value='Type 2'>Type 2</option>
              </select>
            </div>
            <div className='flex-grow'>
              <label htmlFor='priority' className='sr-only'>
                Priority
              </label>
              <select
                id='priority'
                name='priority'
                className='w-full px-3 py-2 border rounded-lg text-[#8E8E8E] focus:outline-none border-slate-400'
                value={priorityValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setPriorityValue(newValue);
                  handleFilterChange(typeValue, newValue, statusValue);
                }}
              >
                <option value='' disabled hidden>Priority</option>
                <option value='Low'>Low</option>
                <option value='Mid'>Medium</option>
                <option value='High'>High</option>
              </select>
            </div>
            <div className='flex-grow'>
              <label htmlFor='status' className='sr-only'>
                Status
              </label>
              <select
                id='status'
                name='status'
                className='w-full px-3 py-2 border rounded-lg text-[#8E8E8E] focus:outline-none border-slate-400'
                value={statusValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setStatusValue(newValue);
                  handleFilterChange(typeValue, priorityValue, newValue);
                }}
              >
                <option value='' disabled hidden>Status</option>
                <option value='Active'>Active</option>
                <option value='Closed'>Closed</option>
              </select>
            </div>
            <button
              type='button'
              className='px-8 py-2 bg-[#5027D9] text-white rounded-lg focus:outline-none'
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className='p-6'>
        <TableTwo tickets={tickets} showUpdated={true} />
      </div>
    </div>
  );
};

export default CustomerOne;
