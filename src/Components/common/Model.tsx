// Modal.tsx
import React, { FC } from 'react';
import Image from 'next/image';
import close from "../../../public/images/close.svg"

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  
}

const Model: FC<ModelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 w-full" onClick={onClose}></div>
      <div className="bg-white p-8 rounded shadow-lg z-50 w-[43em]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Change Ticket Status</h2>
          <button onClick={onClose} className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300">
            <Image src={close}alt="Close Icon" width={16} height={16} />
          </button>
        </div>
        
        {/* Form for changing status */}
        <form>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700">Choose status*</label>
            <select id="status" className="w-full px-3 py-2 border rounded-lg focus:outline-none">
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="totalHours" className="block text-gray-700">Enter total hours logged*</label>
            <input type="text" id="totalHours" name="totalHours" className="w-full px-3 py-2 border rounded-lg focus:outline-none" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="additionalNotes" className="block text-gray-700">Additional notes</label>
            <textarea id="additionalNotes" name="additionalNotes" rows={3} className="w-full px-3 py-2 border rounded-lg focus:outline-none"></textarea>
          </div>
          
          <div className="flex justify-end">
            <button type="button" className="mr-2 px-5 py-2  text-[#5027D9] border-2 border-[#5027D9] rounded-lg " onClick={onClose}>Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#5027D9] text-white rounded-lg text-sm">Close Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;
