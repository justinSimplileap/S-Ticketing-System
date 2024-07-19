import Image from "next/image";
import search from "../../../public/images/searchIcon.svg";

type SearchBarProps = {
  setSearchQuery: (query: string) => void;
};

export default function SearchBar({ setSearchQuery }: SearchBarProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-around items-center gap-2">
        <div className="flex justify-between border-2 border-[#8E8E8E] rounded p-2 focus:outline-none px-4 w-[25em] text-sm">
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none"
            onChange={handleInputChange}
          />
          <Image src={search} alt="search" width={20} />
        </div>
      </div>
    </div>
  );
}
