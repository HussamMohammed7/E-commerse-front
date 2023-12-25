import React, { useEffect, useState } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { MdLocalGroceryStore, MdOutlineDashboard, MdOutlineLocalGroceryStore } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";

import AdminSideBar from './AdminSideBar';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { getDecodedTokenFromStorage } from '../utils/token';
import { toast } from 'react-toastify';



export default function Admin() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const user = state.user.user;  
  console.log(user);
  console.log('admin page role:', user?.role);

  const navigate = useNavigate();
  console.log("user",user)
  

  const userToken = getDecodedTokenFromStorage();
  const role = userToken?.role;

 useEffect(() => {

  if(!userToken && role != 'admin') {
    // Handle case when user is not logged in
    toast.error("You don't have permission ", {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })

    navigate('/login');

 }
},  [navigate]);
  

  return(
    <div className='flex'>
      <AdminSideBar/>
      <div >

      <p className="m-3 text-8xl  font-mono  text-left p-10 mt-20 align-[50rem]  first-letter:font-bold first-letter:text-[#530296]">
            Welcome {user?.first_name} {user?.last_name}
            </p>


            </div>
    </div>
  )
}
