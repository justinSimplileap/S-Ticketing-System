import React, { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Image from 'next/image';
import Close from '../../../public/images/closebutton.svg';
import { FormInputs } from '../../types/formTypes'; 

type WorkDomainInputProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

const WorkDomainInput: React.FC<WorkDomainInputProps> = ({ register, errors }) => {
  const [workDomains, setWorkDomains] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      setWorkDomains([...workDomains, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    setWorkDomains(workDomains.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full px-2">
      <label htmlFor="workDomain" className="block mt-6">
        Work Domain
      </label>
      <div className="border-2 border-[#DFEAF2] rounded-md p-2 mt-2 bg-white h-40 cursor-pointer">
        {workDomains.map((domain, index) => (
          <span
            key={index}
            className="inline-block bg-[#E8E3FA] rounded-full pl-5 pr-7 py-3 text-sm text-black mr-2 mb-2"
          >
            {domain}
            <button
              onClick={() => handleRemove(index)}
              className="ml-5 text-black"
            >
              <Image src={Close} alt="Remove" width={10} />
            </button>
          </span>
        ))}
        <input
          id="workDomain"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field p-2 mt-2 w-full border-none focus:outline-none"
        />
      </div>
      <input
        type="hidden"
        {...register('workDomain', { required: true })}
        value={workDomains.join(',')}
      />
      {errors.workDomain && (
        <span role="alert" className="text-red-600">
          Work Domain is required
        </span>
      )}
    </div>
  );
};

export default WorkDomainInput;
