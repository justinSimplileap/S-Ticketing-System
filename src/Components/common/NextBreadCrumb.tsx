'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bell from '../../../public/images/bell.svg';
import Arrow from '../../../public/images/BreadcrumbArrow.svg';

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ items }) => {
  return (
    <div className="flex justify-between items-center p-6 bg-[#FFFFFF] drop-shadow-md">
      <div className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link href={item.href}>
                <h1 className="font-normal text-[#000000]">{item.label}</h1>
              </Link>
            ) : (
              <span className="font-normal">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <Image src={Arrow} alt="Breadcrumb Arrow" width={20} height={20} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex space-x-4">
        <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center">
          <Image src={bell} alt="Bell Icon" width={20} height={20} />
        </div>
        <div className="w-10 h-10 bg-[#F8F9FA] rounded-md flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;
