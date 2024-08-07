
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientComponent from "@/Components/common/ClientComponent";
// import PassSidebar from '../Components/Pass'
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "iService - Simplileap",
  description: "Ticketing System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
}


// import { useEffect, useState, type ReactNode } from "react";
// import { usePathname } from "next/navigation";
// import Sidebar from "@/Components/common/Sidebar";
// import TopBar from "@/Components/common/TopBar";
// type Props = {
//   children: ReactNode;
//   title: string;
// };
// const routesArray = ["/login", ];
// const Layout = ({ children, title }: Props) => {
//   const pathName = usePathname();
//   return (
//     <>
//         <div className="flex h-[100vh]">
//           <div className="">
//             {!routesArray.includes(pathName) && <Sidebar />}
//           </div>
//           <div className="w-full overflow-y-auto bg-[#F9F9F9]">
//             <div className="sticky top-0 z-50">
//               {!routesArray.includes(pathName) && <TopBar  />}
//             </div>
//             <div>{children}</div>
//           </div>
//         </div>
//     </>
//   );
// };
// export default Layout;



