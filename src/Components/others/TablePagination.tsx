import React from 'react'
import Image from 'next/image';
import NextIcon from "../../../public/images/Next.svg";
import PreviosIcon from "../../../public/images/Previous.svg";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-10 mb-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-6"
      >
        <Image src={PreviosIcon} alt='previousIcon' width={6} height={6}/>
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-2  mx-2 border rounded-full ${index + 1 === currentPage ? 'bg-[#5027d9] text-white' : ''}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='ml-6'
      >
        <Image src={NextIcon} alt='nextIcon' width={6} height={6}/>
      </button>
    </div>
  )
}

export default TablePagination