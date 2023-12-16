import React, { useEffect, useState } from 'react';
import { HiMenu, HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineUser, AiOutlineHistory } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { usersRequest,usersSuccess } from '../redux/slices/userSlice';
import axios from 'axios';
import { RootState } from '../redux/store';
import { AiOutlineClose } from 'react-icons/ai';
import api from '../api';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { useDispatch, useSelector } from 'react-redux';
import { useSelect } from '@material-tailwind/react';
export default function ProfileOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    const menus = [
      { name: 'Users', link: '/profile', icon: AiOutlineUser },
      { name: 'Orders', link: '/profile/profile-order', icon: AiOutlineHistory },
    ];
    const [open, setOpen] = useState(false);
  
    const handleGetUsers = async () => {
      dispatch(usersRequest());
  
      const res = await api.get('/mock/e-commerce/users.json');
      dispatch(usersSuccess(res.data));
    }
  
    useEffect(() => {
      handleGetUsers();
    }, []);
  
    const user = useSelector((state: RootState) => state.user.user); // Get logged-in user
  
    
    console.log(user);
    console.log('role:', user?.role);
  
    useEffect(() =>{
    if (user == null || user.role !== 'visitor') {
      console.log('Logging in as:', user);
      navigate('/')
    
    }
  },[]
    )



    return (
      <div className="pb-10">
        <div className="text-white p-4 px-10  text-[60px] text-left">
          Orders
          <p className="text-[20px]">
          View the delivery status for items and your order history
          </p>
          
          <input
      type="text"
      placeholder="Search for order"
      className="border border-gray-300 bg-[#D6D6D6] text-[30px] placeholder:text-[#674ea7] text-[#20124d] 
      px-4 py-2  focus:outline-none focus:border-[#20124d] focus:ring-[#20124d] focus:ring-1"
      
    />
     <select className="bg-[#D6D6D6] p-3  text-[#20124d] ml-10  text-[26px] border-2 border-[#20124d]">
    <option value="last 3 months">Last 3 months</option>
    <option value="last 6 months">Last 6 months</option>
    <option value="last year">Last year</option>
    <option value="last 2 years">Last 2 years</option>
    <option value="last 3 years">Last 3 years</option>
  </select>

          <h2 className="text-white text-[30px] mt-10">Your Cards</h2>
        </div>
  
        <div className="shadow-2xl w-[90%] item-center mx-auto p-10 border-[#20124d] border-t-2 border-b-2 text-left shadow-xl2 text-purple bg-[#D6D6D6]">
          <div className="mb-2 p-2 ">
            <p className="flex items-center">
              <span className="flex-grow ">type:</span>
              <span className="flex-grow">Ending in </span>
              <span className="flex-grow">Expiry:</span>
  
              <span className="ml-10 cursor-pointer">
  
                Delete card
                </span>
               
            </p>
  
          </div>
        </div>
      </div>
    )
  }
  