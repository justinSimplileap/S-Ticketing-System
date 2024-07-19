import React, { useState } from "react";
import member from "../../../public/images/Profile.svg";
import Image from "next/image";
import Delete from "../../../public/images/delete.svg";
import axios from "axios";
import { Button } from "@headlessui/react";

const MemberTable: React.FC = () => {
  const [members, setMembers] = useState([
    {
      Email: "shivraj@gmail.com",
      Member_id: "123",
      Member_name: "shivraj",
      Organisation_name: "ShivrajCo.",
      Profile: member,
    },
    {
      Email: "shivraj@gmail.com",
      Member_id: "124",
      Member_name: "raj",
      Organisation_name: "RajCo.",
      Profile: member,
    },
    {
      Email: "shivraj@gmail.com",
      Member_id: "125",
      Member_name: "john",
      Organisation_name: "JohnCo.",
      Profile: member,
    },
    {
      Email: "shivraj@gmail.com",
      Member_id: "126",
      Member_name: "doe",
      Organisation_name: "DoeCo.",
      Profile: member,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMember, setNewMember] = useState({
    Email: "",
    Member_id: "",
    Member_name: "",
    Organisation_name: "",
    Profile: member,
    Phone: "",
    Customer_company: "",
    Designation: ""
  });

  const handleDelete = (memberId: string) => {
    const updatedMembers = members.filter(
      (member) => member.Member_id !== memberId
    );
    setMembers(updatedMembers);
  };

  // const handleDelete = async (memberId: string) => {
  //     try {
  //         await axios.delete(`http://localhost:8000/members/${memberId}`);

  //         const updatedMembers = members.filter(member => member.Member_id !== memberId);
  //         setMembers(updatedMembers);
  //     } catch (error) {
  //         console.error('There was an error deleting the member!', error);
  //     }
  // };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers([...members, newMember]);
    setShowForm(false);
    setNewMember({
      Email: "",
      Member_id: "",
      Member_name: "",
      Organisation_name: "",
      Profile: member,
      Phone: "",
      Customer_company: "",
      Designation: ""
    });
  };

  return (
    <div className="overflow-x-auto ">
      {showForm ? (
        <div>
          <h2 className="text-xl font-medium mt-10">Add New Member</h2>
          <form onSubmit={handleAddMember} className="mt-10">
            <div className="flex items-center">
              <div className=" w-[20%] m-auto">
                <Image src={member} alt=""/>
              </div>
              <div className="w-[80%]">
                <div className="grid grid-cols-2 gap-5">
                  <div className="">
                    <label className="block">Member Name</label>
                    <input
                      type="text"
                      value={newMember.Member_name}
                      placeholder="Full name"
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          Member_name: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-2 my-2 w-[100%] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <div>
                      <label className="block">Gender</label>
                      <input
                        type="text"
                        value={newMember.Member_name}
                        placeholder="Male"
                        onChange={(e) =>
                          setNewMember({
                            ...newMember,
                            Member_name: e.target.value,
                          })
                        }
                        className=" border rounded px-2 py-2 my-2 w-[100%]  focus:outline-none"
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block">Phone number</label>
                    <input
                      type="number"
                      value={newMember.Phone}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          Phone: e.target.value,
                        })
                      }
                      className=" border rounded px-2 py-2 my-2 w-[100%]  focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block">Email</label>
                    <input
                      type="email"
                      value={newMember.Email}
                      onChange={(e) =>
                        setNewMember({ ...newMember, Email: e.target.value })
                      }
                      className=" border rounded px-2 py-2 my-2 w-[100%]  focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block">Customer Company</label>
                    <input
                      type="text"
                      disabled={true}
                      value={newMember.Customer_company}
                      placeholder="Shankara pvt ltd"
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          Customer_company: e.target.value,
                        })
                      }
                      className=" border rounded px-2 py-2 my-2 w-[100%]  focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block">Designation</label>
                    <input
                      type="text"
                      value={newMember.Designation}
                      placeholder="Client operation manager"
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          Designation: e.target.value,
                        })
                      }
                      className=" border rounded px-2 py-2 my-2 w-[100%]  focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 justify-end gap-4 flex">
              <Button
                type="submit"
                className="rounded bg-[#5027D9] py-3 px-7 text-sm text-white"
              >
                Create
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded bg-transparent py-3 px-7 text-sm text-[#5027D9] border-[#5027D9] border-2"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-between pb-7">
            <div className="text-xl font-medium">Members</div>
            <div>
              <Button
                onClick={() => setShowForm(true)}
                className="flex rounded bg-[#5027D9] py-2 px-4 text-sm text-white items-center gap-2"
              >
                Add new members
              </Button>
            </div>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 pr-4 border-b-2 border-[#F9F9F9] font-normal text-[#9291A5]">
                  Member ID
                </th>
                <th className="py-2 px-4 border-b-2 border-[#F9F9F9] font-normal text-[#9291A5]">
                  Profile Image
                </th>
                <th className="py-2 px-4 border-b-2 border-[#F9F9F9] font-normal text-[#9291A5] text-left">
                  Member name
                </th>
                <th className="py-2 px-4 border-b-2 border-[#F9F9F9] font-normal text-[#9291A5] text-left">
                  Organization name
                </th>
                <th className="py-2 px-4 border-b-2 border-[#F9F9F9] font-normal text-[#9291A5] text-left">
                  Email ID
                </th>
                <th className="py-2 px-4 border-b-2 border-[#F9F9F9] font-normal text-[#9291A5] text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr className="" key={index}>
                  <td className="py-2 px-4 border-b-2 border-[#F9F9F9] text-[#5027D9]">
                    {member.Member_id}
                  </td>
                  <td className="py-2 px-4 border-b-2 border-[#F9F9F9]">
                    <Image
                      src={member.Profile}
                      alt={member.Member_name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b-2 border-[#F9F9F9] text-[#5027D9]">
                    {member.Member_name}
                  </td>
                  <td className="py-2 px-4 border-b-2 border-[#F9F9F9]">
                    {member.Organisation_name}
                  </td>
                  <td className="py-2 px-4 border-b-2 border-[#F9F9F9]">
                    {member.Email}
                  </td>
                  <td className="py-2 px-4 border-b-2 border-[#F9F9F9]">
                    <button
                      className="text-white px-4 py-1 rounded"
                      onClick={() => handleDelete(member.Member_id)}
                    >
                      <Image src={Delete} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MemberTable;
