import React, { useState } from 'react';
import Image from "next/image";
import style from "../../../public/images/style.svg"
import folder from "../../../public/images/folder.svg"
import send from "../../../public/images/send.svg"
import AttachmentTable from "../../Components/common/AttachmentTable"
const TabThree: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'EventsTimeline' | 'Comments' | 'Attachments'>('EventsTimeline');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null); // State to store selected files

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files); // Store selected files in state
    }
  };

  // Function to handle file upload
  const handleFileUpload = () => {
    if (selectedFiles) {
      // Validate file types or perform any other necessary checks

      // Handle file upload logic here (e.g., upload to server, display preview, etc.)
      console.log('Selected files:', selectedFiles);

      // Reset selected files after upload
      setSelectedFiles(null);
    }
  };

  // Function to open file selection dialog
  const openFilePicker = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click(); // Trigger click event on file input element
    }
  };

  return (
    <div className="">
      <div className="flex space-x-4 flex-row mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'EventsTimeline' ? 'text-[#5027D9] border-b-4 border-[#5027D9]' : 'hover:text-[#5027D9] hover:border-b-4 hover:border-[#5027D9]'}`}
          onClick={() => setActiveTab('EventsTimeline')}
        >
          Events Timeline
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Comments' ? 'text-[#5027D9] border-b-4 border-[#5027D9]' : 'hover:text-[#5027D9] hover:border-b-4 hover:border-[#5027D9]'}`}
          onClick={() => setActiveTab('Comments')}
        >
          Comments
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'Attachments' ? 'text-[#5027D9] border-b-4 border-[#5027D9]' : 'hover:text-[#5027D9] hover:border-b-4 hover:border-[#5027D9]'}`}
          onClick={() => setActiveTab('Attachments')}
        >
          Attachments
        </button>
      </div>

      {activeTab === 'EventsTimeline' && (
        <div>
          <h2 className="text-xl mb-4">Events Timeline Content</h2>
          {/* Add your Events Timeline content here */}
        </div>
      )}

      {activeTab === 'Comments' && (
        <div className="ml-4  ">
        <div>
          <h2 className="text-sm font-semibold mt-4 mb-4">Goutham</h2>
          <p className="text-sm">I need some extra details on this</p>

          <div className='flex flex-row'>
  <form className="mt-4 flex-grow flex flex-col justify-between">
    <div className="relative">
      <textarea
        id="comment"
        name="comment"
        className="mt-1 w-full sm:text-sm border border-[#DFEAF2] hover:border-gray-300 focus:outline-none px-3 py-2 rounded-lg"
        placeholder="Add a Comment"
      ></textarea>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <div className="bg-white  rounded-md border border-[#5027D9] ml-2">
          <button
            type="button"
            className="focus:outline-none p-2"
            onClick={() => {
              // Handle click event for Style button
              console.log('Style button clicked');
            }}
          >
            <Image
              src={style}
              alt="Style Icon"
              width={18} 
              height={25}
            />
          </button>
        </div>
        <div className="bg-[#5027D9] rounded-md ml-2">
          <button
            type="button"
            className="focus:outline-none p-2"
            onClick={() => {
              // Handle click event for Send button
              console.log('Send button clicked');
            }}
          >
            <Image
              src={send}
              alt="Send Icon"
              width={20}
            />
          </button>
        </div>
      </div>
    </div>
  </form>
</div>

        
        
      </div>
      </div>
     
      
      
      )}

      {activeTab === 'Attachments' && (

          <div className='p-6'>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">All Uploaded Files</h2>
       {/* Hidden file input element */}
       <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            {/* Button to trigger file selection */}
            <button
              className="bg-[#5027D9] text-white py-2 px-4 rounded-lg"
              onClick={openFilePicker}
            >
              + Add New
            </button>
          </div>
          <AttachmentTable />
        </div>
      )}
    </div>
  );
};

export default TabThree;
