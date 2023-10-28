import React, { useState } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { MdLocalGroceryStore, MdOutlineDashboard, MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";

import { Link } from "react-router-dom";
import AdminSideBar from './AdminSideBar';
export default function Admin() {
  return(
    <div className='flex'>
      <AdminSideBar/>
      <div >

      <p className="m-3 text-8xl  font-mono  text-left p-10 mt-20 align-[50rem]  first-letter:font-bold first-letter:text-[#530296]">
            Welcome
            </p>

            </div>
    </div>
  )
}
