import React, { useEffect, useState } from 'react'
import { HiMenu, HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineUser, AiOutlineHistory } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { usersRequest, usersSuccess } from '../redux/slices/userSlice'
import axios from 'axios'
import { RootState } from '../redux/store'
import { AiOutlineClose } from 'react-icons/ai'
import api from '../api'
import { ConfirmDialog } from 'primereact/confirmdialog' // To use <ConfirmDialog> tag
import { useDispatch, useSelector } from 'react-redux'
import { useSelect } from '@material-tailwind/react'
import ProfileAddress from './ProfileAddress'
import ProfilePayment from './ProfilePayment'
import ProfileOrder from './ProfileOrder'
import ProfileInformation from './ProfileInformation'

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState('profile') // Default active section

  // const handleGetUsers = async () => {
  //   dispatch(usersRequest())

  //   const res = await api.get('/mock/e-commerce/users.json')
  //   dispatch(usersSuccess(res.data))
  // }

  // useEffect(() => {
  //   handleGetUsers()
  // }, [])

  const user = useSelector((state: RootState) => state.user.user) // Get logged-in user

  console.log(user)
  console.log('role:', user?.role)

  useEffect(() => {
    if (user == null || user.role !== 'visitor') {
      console.log('Logging in as:', user)
      navigate('/')
    }
  }, [])
  return (
    
    <div className="mb-10">
      {user?.isActive === false ?(
      <div className="bg-red-300 text-white mx-auto p-8 w-4/5 mt-[8rem] ">
        <p className="text-lg mb-4">
          Your account is not activated. check your Email to activate your account.
        </p>
      </div>
      ): (
        
      
      <div className="grid grid-cols-10 grid-rows-1 gap-2 mt-[8rem] ">
        <div className="col-start-2 col-end-4 ">
          <div className="w-5/5 mx-auto  shadow-md text-white bg-[#20124d] cursor-pointer "
         >
            {/* Profile Section */}
            <div className=" pt-6 pb-2  border-b-2 border-t-1 hover:bg-[#674ea7] "
             onClick={() => setActiveSection('profile')}>
              <h3 className="text-lg font-semibold mb-4">Profile</h3>
              {/* Add your profile content here */}
            </div>

            {/* Address Section */}
            <div
              className="pt-6  pb-2 border-b-2 border-t-1 hover:bg-[#674ea7] "
              onClick={() => setActiveSection('address')}>
              <h3 className="text-lg font-semibold mb-4">Address</h3>
              {/* Add your address content here */}
            </div>

            {/* Orders Section */}
            <div className="pt-6  pb-2 border-b-2 border-t-1 hover:bg-[#674ea7]  "
             onClick={() => setActiveSection('orders')}
                          >
              <h3 className="text-lg font-semibold mb-4">Orders</h3>
              {/* Add your orders content here */}
            </div>

            {/* Payment Section */}
            <div className="pt-6  pb-2 border-b-2 border-t-1 hover:bg-[#674ea7] "
            onClick={() => setActiveSection('payment')}>
              <h3 className="text-lg font-semibold mb-4">Payment</h3>
              {/* Add your payment content here */}
            </div>

            {/* Wish List Section */}
            <div className="pt-6  pb-2  border-t-1 hover:bg-[#674ea7] ">
              <h3 className="text-lg font-semibold mb-4">Wish List</h3>
              {/* Add your wish list content here */}
            </div>
          </div>
        </div>
        <div className="w-full bg-[#9D9D9D] shadow-md  col-start-4 col-end-10 text-black">
          {activeSection === 'profile' && <ProfileInformation />}
          {activeSection === 'address' && <ProfileAddress />}
          {activeSection === 'orders' &&  <ProfileOrder />}
          {activeSection === 'payment' && <ProfilePayment />}
          {activeSection === 'wishlist' && <div>Wishlist content goes here</div>}
        </div>
      </div>
      )}
    </div>)}
