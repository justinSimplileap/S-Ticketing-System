"use client"

import ButtonPurple from "../../Components/common/ButtonPurple";
import Arrow from "../../../public/images/Arrow 2.svg";
import Image from "next/image";
import Circle from "../../../public/images/Icon_Order.svg";
import Table from "../../Components/common/Table";
import Link from "next/link";
import Bell from "../../../public/images/bell.svg";
import userBg from "../../../public/images/User.svg";
import Tabs from "../../Components/common/Tabs";
import Form from "../../Components/common/form";
import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  profile_url: string;
};

export default function Profile() {
  
  const [profilePicture, setProfilePicture] = useState(''); 

  useEffect(() => {
    fetchUser();
  }, []);


  const fetchUser = async () => {
    try {
      const response = await axios.get<{ user: User }>(
        "http://localhost:8000/getUserDetails",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        setProfilePicture(response.data.user.profile_url);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center shadow-md px-8 py-4 sticky top-0 z-50 bg-white">
        <div className="text-[#2A2C3E] text-xl">Profile</div>
        <div className="flex gap-4 justify-center items-center">
          <div>
            <Image src={Bell} alt="hhh" width={25} />
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={profilePicture}
              alt="Profile Picture"
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Tabs starts */}

      <div className="p-2 lg:m-8 m-4 bg-[#F9F9F9] lg:rounded-md">
        <Tabs />
      </div>
    </div>
  );
}
