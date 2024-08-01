"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Profile from "../../../../public/images/Profile.svg";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AccountDetails: React.FC = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    gender: '',
    position: '',
    role: '',
    phone_number: '',
    email: ''
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8000/getUserAccountDetails', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          // Update the form data with the fetched user data
          setFormData(response.data);
        } else {
          console.error('Failed to fetch user data:', response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      customer_name: formData.customer_name,
      gender: formData.gender,
      position: formData.position,
      role: formData.role,
      phone_number: formData.phone_number,
      email: formData.email
    };

    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put('http://localhost:8000/AccountDetails', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        router.push('/team/ManagerDashboard'); // Redirect to dashboard
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };


  const handleSkip = () => {
    router.push('/team/ManagerDashboard'); // Redirect to dashboard
  };

  return (
    <div className="p-8">
      <div className="bg-[#FFFFFF] shadow-md p-8 border border-[#EBEBEE] rounded">
        <div className="text-xl font-semibold font-lato text-[#222222]">Account Details</div>
        <div className="text-xl font-semibold font-lato mt-8 text-[#000000]">Basic Details</div>
        <div className="flex py-5 items-center">
          <div className="w-[20%]">
            <Image src={Profile} alt="Profile Pic" className="pr-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <label htmlFor="customer_name" className="block text-sm text-[#232323] font-lato">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                id="customer_name"
                name="customer_name"
                type="text"
                value={formData.customer_name}
                onChange={handleChange}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                required
              />
              <span role="alert" className="text-red-600">
                Customer Name is required
              </span>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm text-[#232323] font-lato">
                Gender <span className="text-red-500">*</span>
              </label>
              <input
                id="gender"
                name="gender"
                type="text"
                value={formData.gender}
                onChange={handleChange}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
                required
              />
              <span role="alert" className="text-red-600">
                Gender is required
              </span>
            </div>
            <div>
              <label htmlFor="department" className="block text-sm text-[#232323] font-lato">
                Department
              </label>
              <input
                id="department"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              <span role="alert" className="text-red-600">
                Department is required
              </span>
            </div>
            <div>
              <label htmlFor="position" className="block text-sm text-[#232323] font-lato">
                Position
              </label>
              <input
                id="position"
                name="position"
                type="text"
                value={formData.position}
                onChange={handleChange}
                className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
              />
              <span role="alert" className="text-red-600">
                Position is required
              </span>
            </div>
          </div>
        </div>

        <div className="text-xl font-semibold py-7 font-lato text-[#000000]">Contact Details</div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone_number" className="block text-sm text-[#232323] font-lato">
              Phone Number
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            <span role="alert" className="text-red-600">
              Phone Number is required
            </span>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-[#232323] font-lato">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field p-2 mt-2 mb-2 w-full border-2 border-[#DFEAF2] rounded-md focus:outline-none"
            />
            <span role="alert" className="text-red-600">
              Email is required
            </span>
          </div>

          <div className="flex justify-end w-full mt-6 col-span-2 text-[#5027D9]">
            <button type="button" onClick={handleSkip}>Skip For Now</button>
            <button
              type="submit"
              className="btn-submit ml-auto block rounded bg-[#5027D9] py-3 px-8 text-sm text-white"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
