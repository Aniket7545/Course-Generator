"use client"

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from "react";
import { useClerk } from "@clerk/nextjs";
import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineShieldCheck,
  HiOutlinePower,
} from "react-icons/hi2";

function SideBar() {
  const { UserCourseList, setUserCourseList } = useContext(UserCourseListContext);
  const { signOut } = useClerk();
  const router = useRouter();
  const path = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push("/"); // Redirect to home page after logout
  };

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <HiOutlineShieldCheck />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <HiOutlinePower />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={"/logo.svg"} width={160} height={100} alt="Logo" />
      <hr className="my-5" />
      <ul>
        {Menu.map((item, index) => (
          <li key={item.id}>
            {item.path ? (
              <Link href={item.path}>
                <div
                  className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3
                    ${item.path === path && 'bg-gray-100 text-black'}`}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <h2>{item.name}</h2>
                </div>
              </Link>
            ) : (
              <div
                onClick={item.onClick}
                className="flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3"
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(UserCourseList.length/5)*100} />
        <h2 className="text-sm my-2">{UserCourseList.length} Out of 5 Course created</h2>
        <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited course generation</h2>
      </div>
    </div>
  );
}

export default SideBar;