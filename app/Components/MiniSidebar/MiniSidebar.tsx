"use client";
import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import { color } from "framer-motion";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MiniSidebar() {
  const pathname = usePathname();

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#0b52d6" : "#71717a";
  };
  const getBgColor = (link: string) => {
    return pathname === link ? true : false;
  };

  const [authenticated, setAuthenticated] = React.useState<string | null>(null);

  React.useEffect(() => {
      const auth = localStorage.getItem("userAuthenticated");
      setAuthenticated(auth);
    }, []);

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
      color: getStrokeColor("/"),
      bgcolor: getBgColor("/")

    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
      color: getStrokeColor("/completed"),
      bgcolor: getBgColor("/completed")
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
      color: getStrokeColor("/pending"),
      bgcolor: getBgColor("/pending")
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
      color: getStrokeColor("/overdue"),
      bgcolor: getBgColor("/overdue")
    },
  ];

  if (authenticated == "true") {
    return (
      <div className="basis-[5rem] flex flex-col bg-[#ffffff]">
        <div className="flex items-center justify-start h-[5rem] pl-[2rem]">
          <Image src="/logo.png" width={50} height={50} className="rounded-[.5rem]" alt="logo" />
          <h1 className="text-[1.4rem] font-bold pl-[12px]">TASK MANAGER</h1>
        </div>
        <div className="mt-16 w-[20rem] flex-1 flex flex-col items-center justify-between">
          <ul className="flex flex-col w-[100%]">
            {navItems.map((item, index) => (
              <li key={index} className={`flex justify-start relative group my-[2px] mx-[6px] rounded-[12px] border-2 ${item.bgcolor ? 'border-[#0b52d6]' : 'border-[#ffffff]'} bg-[#efefef]`}>
                <Link href={item.link} className={`px-4 py-2 flex items-center h-12 w-[100%]`}>
                <span className="mr-[20px]">{item.icon}</span>
                <span className={`text-[${item.color}] font-medium`}>{item.title}</span>
                </Link>
                {/* Hover Tooltip */}
                {/* <span className="u-triangle top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#0b52d6] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </span> */}
              </li>
            ))}
          </ul>
  
          {/* <div className="mb-[1.5rem]">
            <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31]  p-2 rounded-full">
              <IconDeleteAll strokeColor="#EB4E31" />
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default MiniSidebar;
