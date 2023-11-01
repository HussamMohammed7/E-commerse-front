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

export default function Profile() {
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
    <div className='flex items-center mt-[8rem] '>
      <div className='w-1/5 '>
        {/* Left side content */}
        {/* You can place your content for the left side here */}
      </div>
      <section className='flex gap'>
        <div
          className={`bg-[#000000] sm:rounded-lg h-[42vh] mb-[26.5rem]  ${
            open ? 'w-32' : 'w-16'
          } duration-500 text-gray-100 px-3.5`}
        >
          <div className='py-3 flex'>
            <HiMenu
              size={26}
              className='cursor-pointer'
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className=' flex flex-col gap-4 relative '>
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  'mt-5'
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: '20' })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && 'opacity-0 translate-x-28 overflow-hidden'
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && 'hidden'
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className='w-[50rem] min-h-screen '>
        {/* Left side content */}
        {/* You can place your content for the left side here */}
        <div className='shadow overflow-hidden sm:rounded-lg'>
          <div className='px-4 py-5 sm:px-6 bg-[#000000] '>
            <h3 className='text-lg leading-6 font-medium '>
              Profile
            </h3>
            
          </div>
          <div className='border-t border-gray-200'>
            <dl className=''>
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-[#483674] '>
                <dt className='text-sm font-medium  '>
                  First Name
                </dt>
                <dd className='mt-1 text-sm  sm:mt-0 sm:col-span-2'>
                  {user?.firstName}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-[#C2B8DB] text-black	'>
                <dt className='text-sm font-medium '>
                  Last Name 
                </dt>
                <dd className='mt-1 text-sm  sm:mt-0 sm:col-span-2'>
                {user?.lastName}
                </dd>
              </div> 
              <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6  bg-[#483674]'>
                <dt className='text-sm font-medium  '>
                  Email address
                </dt>
                <dd className='mt-1 text-sm  sm:mt-0 sm:col-span-2'>
                {user?.email}
                </dd>
              </div>
              <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-[#C2B8DB] text-black	'>
                <dt className='text-sm font-medium '>password</dt>
                <dd className='mt-1 text-sm  sm:mt-0 sm:col-span-2'>
                {user?.password}

                </dd>
              </div>
              
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
