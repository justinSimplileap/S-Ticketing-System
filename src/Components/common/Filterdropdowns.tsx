"use client";
import Image from "next/image";
import DropdownArrow from "../../../public/images/dropdown.svg";
import { Button } from "@headlessui/react";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


interface Client {
  id: number;
  customer_name: string;
}
interface DropdownFiltersProps {
  typeValue: string;
  setTypeValue: (value: string) => void;
  priorityValue: string;
  setPriorityValue: (value: string) => void;
  statusValue: string;
  setStatusValue: (value: string) => void;
  customerName: string;
  setCustomerName: (value: string) => void;
  clients: Client[];
  handleReset: () => void;
  fetchTickets: () => void; 
}

const DropdownFilters: React.FC<DropdownFiltersProps> = ({
  typeValue,
  setTypeValue,
  priorityValue,
  setPriorityValue,
  statusValue,
  setStatusValue,
  customerName,
  setCustomerName,
  clients,
  handleReset,
  fetchTickets,
}) => {

  const pathname = usePathname()
  console.log("this is path",pathname)


  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>, setValue: (value: string) => void) => {
    setValue(e.target.value);
    fetchTickets();
  };

  return (
    <div className="lg:grid grid-cols-5 gap-2 font-normal mt-2">
      <div className="relative">
        <select
          name="type"
          id="type"
          value={typeValue}
          onChange={(e) => handleChange(e, setTypeValue)}
          className="w-[100%] p-2 pl-3 pr-8 border-2 border-[#E8E8E8] rounded-md text-[#8E8E8E] appearance-none bg-white"
        >
          <option value="Type">Type</option>
          <option value="Type 1">Type 1</option>
          <option value="Type 2">Type 2</option>
          <option value="Type 3">Type 3</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <Image src={DropdownArrow} alt="drop" width={20} />
        </div>
      </div>

      <div className="relative">
        <select
          name="priority"
          id="priority"
          value={priorityValue}
          onChange={(e) => handleChange(e, setPriorityValue)}
          className="w-[100%] p-2 pl-3 pr-8 border-2 border-[rgb(232,232,232)] rounded-md text-[#8E8E8E] appearance-none bg-white"
        >
          <option value="Priority">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none ">
          <Image src={DropdownArrow} alt="drop" width={20} />
        </div>
      </div>

      <div className="relative">
        <select
          name="status"
          id="status"
          value={statusValue}
          onChange={(e) => handleChange(e, setStatusValue)}
          className="w-[100%] p-2 pl-3 pr-8 border-2 border-[#E8E8E8] rounded-md text-[#8E8E8E] appearance-none bg-white"
        >
          <option value="Status">Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <Image src={DropdownArrow} alt="drop" width={20} />
        </div>
      </div>

      {pathname === "/SuperAdmin/TicketManagement" && (
        <div className="relative">
          <select
            name="customer"
            id="customer"
            value={customerName}
            onChange={(e) => handleChange(e, setCustomerName)}
            className="w-[100%] p-2 pl-3 pr-8 border-2 border-[#E8E8E8] rounded-md text-[#8E8E8E] appearance-none bg-white"
          >
            <option value="CustomerName">Customer Name</option>
            {clients.map((client) => (
              <option key={client.id} value={client.customer_name}>
                {client.customer_name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <Image src={DropdownArrow} alt="drop" width={20} />
          </div>
        </div>
      )}

      <Button
        onClick={handleReset}
        className="w-[100%] flex justify-center rounded bg-[#5027D9] py-2 px-10 text-sm text-white items-center gap-2  lg:w-fit my-2 lg-my-0"
      >
        Reset
      </Button>
    </div>
  );
};

export default DropdownFilters;
