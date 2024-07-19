import React, { useState } from 'react';
import Profile from '../../../public/images/Profile.svg';
import Image from 'next/image';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editProfile' | 'security'>('editProfile');

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
              <Image src={Profile} alt="Profile" className="rounded-full object-cover" width={130} height={128} />
            </div>
            <div className="w-3/4 ml-4">

              <form>
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="fullname" className="block text-[#232323] font-normal">Full Name*</label>
                    <input type="text" id="fullname" name="fullname" className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none" />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="gender" className="block text-[#232323] font-normal">Gender*</label>
                    <select id="gender" name="gender" className="w-full px-3 py-2 border rounded-lg focus:outline-none text-[#545454] font-normal mt-2">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="department" className="block text-gray-700">Department*</label>
                    <input type="text" id="department" name="department" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="position" className="block text-gray-700">Position*</label>
                    <input type="text" id="position" name="position" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" />
                  </div>
                </div>
                {/* <div className='mt-10 '>
              <h2 className="text-xl font-bold mb-4 ">Contact Details</h2>
              </div>
              <div className="flex space-x-4 mb-4 ">
                <div className="w-1/2">
                  <label htmlFor="phone" className="block text-[#232323] font-normal">Phone Number</label>
                  <input type="text" id="phone" name="phone" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="email" className="block text-[#232323] font-normal">Email*</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-3 bg-[#5027D9] text-white rounded-lg">Save details</button>
              </div> */}
              </form>
            </div>
          </div>
          <div>
            <div className=' mt-8'>
              <h2 className="text-lg font-semibold mb-4 ">Contact Details</h2>
            </div>
            <div className="flex space-x-4 mb-4 ">
              <div className="w-1/2">
                <label htmlFor="phone" className="block text-[#232323] font-normal">Phone Number</label>
                <input type="text" id="phone" name="phone" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" />
              </div>
              <div className="w-1/2">
                <label htmlFor="email" className="block text-[#232323] font-normal">Email*</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none mt-2" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-5 py-3 bg-[#5027D9] text-white rounded-lg">Save details</button>
            </div>
          </div>
        </div>
      )}


      {activeTab === 'security' && (
        <div className="p-4">
          {/* <h2 className="text-xl mb-4">Security</h2> */}
          <form >
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-gray-700">Current Password</label>
              <input type="password" id="currentPassword" name="currentPassword" className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none" />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
              <input type="password" id="newPassword" name="newPassword" className="w-3/4 px-3 py-2 border rounded-lg focus:outline-none" />
            </div>
            <div className=" self-end">
              <button type="submit" className="px-5 py-3 bg-[#5027D9] text-white rounded-lg">Change password</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tabs;
