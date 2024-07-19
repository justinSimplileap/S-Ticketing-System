import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Bell from "../../../public/images/bell.svg";
import userBg from "../../../public/images/User.svg";
import breadcrumbArrow from "../../../public/images/breadcrumbArrow.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Hamburger from "../../../public/images/Hamburger.svg";

const formatBreadcrumbName = (name: string) => {
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
};

const generateBreadcrumbs = (pathname: string) => {
  const pathParts = pathname.split("/").filter((part) => part);
  const breadcrumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    return { name: formatBreadcrumbName(part), href };
  });
  return breadcrumbs;
};

interface TopBarProps {
  setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
  isSidebarExpanded: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  setIsSidebarExpanded,
  isSidebarExpanded,
}) => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex justify-between items-center shadow-md px-8 py-5 sticky top-0 z-50 bg-[#2A2C3E] lg:bg-white w-[100%] ">
      <div className="flex gap-2 items-center text-[#17192b] text-xl ">
        <Image
          src={Hamburger}
          alt="Toggle Sidebar"
          width={40}
          className="lg:hidden"
          onClick={toggleSidebar}
        />
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="lg:flex hidden items-center ">
            <Link href={crumb.href} className="text-black">
              {crumb.name}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2">
                <Image
                  src={breadcrumbArrow}
                  alt="breadcrumb"
                  width={20}
                  height={20}
                />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center items-center">
        <div>
          <Image src={Bell} alt="Notification Bell" width={25} />
        </div>
        <div>
          <Image src={userBg} alt="User Profile" width={50} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
