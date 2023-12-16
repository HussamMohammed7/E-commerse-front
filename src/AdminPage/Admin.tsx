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



export default function Admin() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const user = state.user.user;  
  console.log(user);
  console.log('admin page role:', user?.role);

  useEffect(() => {

    const decodedUser = getDecodedTokenFromStorage(); // Retrieve decoded user from storage
    console.log('Decoded User:', decodedUser);
    console.log('admin page role:', user?.role);
    if (user == null || user.role !== 'admin') {
      console.log('Logging in as:', user);
      navigate('/');
    }
  }, [user, navigate]);

  

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
