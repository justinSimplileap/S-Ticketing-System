import React, { useState } from 'react';
// import Profile from '';
import Image from 'next/image';
import axios from 'axios';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editProfile' | 'security'>('editProfile');

  const [profileFormData, setProfileFormData] = useState({
    customer_name: '',
    gender: '',
    role: '',
    position: '',
    phone_number: '',
    email: ''
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    password: ''
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Handler for profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileFormData({
      ...profileFormData,
      [e.target.name]: e.target.value
    });
  };

  // Handler for password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordFormData({
      ...passwordFormData,
      [e.target.name]: e.target.value
    });
  };

  // Handler for profile form submission
  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      customer_name: profileFormData.customer_name,
      role: profileFormData.role,
      position: profileFormData.position,
      gender: profileFormData.gender,
      phone_number: profileFormData.phone_number,
      email: profileFormData.email
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put('http://localhost:8000/updateProfile', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        // Reset form data
        setProfileFormData({
          customer_name: '',
          gender: '',
          role: '',
          position: '',
          phone_number: '',
          email: ''
        });
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handler for password form submission
  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      currentPassword: passwordFormData.currentPassword,
      password: passwordFormData.password
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put('http://localhost:8000/changePassword', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Password changed successfully!');
        // Reset password form data
        setPasswordFormData({
          currentPassword: '',
          password: ''
        });
        setPasswordError(null); // Clear any previous error messages
      } else {
        alert('Failed to change password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setPasswordError('Current password is incorrect.');
      } else {
        setPasswordError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'editProfile' ? 'text-[#5027D9] border-b-4 border-[#5027D9]' : 'hover:text-[#5027D9] hover:border-b-4 hover:border-[#5027D9]'}`}
          onClick={() => setActiveTab('editProfile')}
        >
          Edit Profile
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'security' ? 'text-[#5027D9] border-b-4 border-[#5027D9]' : 'hover:text-[#5027D9] hover:border-b-4 hover:border-[#5027D9]'}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      {activeTab === 'editProfile' && (
        <div>
          <div className="flex">
            <div className="w-32 flex justify-center items-start">
              {/* <Image src={Profile} alt="Profile" className="rounded-full object-cover" width={130} height={128} /> */}
            </div>
            <div className="w-3/4 ml-4">
              <form onSubmit={handleProfileSubmit}>
                {/* Profile Form */}
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="customer_name" className="block text-[#232323] font-normal">Full Name<span className="text-red-500">*</span></label>
                    <input type="text" id="customer_name" name="customer_name" className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none" value={profileFormData.customer_name} onChange={handleProfileChange} />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="gender" className="block text-[#232323] font-normal">Gender<span className="text-red-500">*</span></label>
                    <input type="text" id="gender" name="gender" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" value={profileFormData.gender} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="role" className="block text-gray-700">Department<span className="text-red-500">*</span></label>
                    <input type="text" id="role" name="role" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" value={profileFormData.role} onChange={handleProfileChange} />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="position" className="block text-gray-700">Position<span className="text-red-500">*</span></label>
                    <input type="text" id="position" name="position" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" value={profileFormData.position} onChange={handleProfileChange} />
                  </div>
                </div>
                <div>
                  <div className='mt-8'>
                    <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
                  </div>
                  <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                      <label htmlFor="phone_number" className="block text-[#232323] font-normal">Phone Number</label>
                      <input type="text" id="phone_number" name="phone_number" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" value={profileFormData.phone_number} onChange={handleProfileChange} />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="email" className="block text-[#232323] font-normal">Email<span className="text-red-500">*</span></label>
                      <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" value={profileFormData.email} onChange={handleProfileChange} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="px-5 py-3 bg-[#5027D9] text-white rounded-lg">Save details</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="p-4">
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-gray-700">Current Password<span className="text-red-500">*</span></label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2"
                value={passwordFormData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">New Password<span className="text-red-500">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2"
                value={passwordFormData.password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {passwordError && (
              <div className="mb-4 text-red-500">
                {passwordError}
              </div>
            )}
            <div className="flex justify-end">
              <button type="submit" className="px-5 py-3 bg-[#5027D9] text-white rounded-lg">Save changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tabs;
