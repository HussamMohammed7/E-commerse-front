import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getDecodedTokenFromStorage } from '../utils/token';
import { fetchUserByTokenThunk, getUserOneThunk } from '../redux/slices/userSlice';
import { ConfirmDialog } from 'primereact/confirmdialog';

export default function NavBar() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const user = state.user.user;  


  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);



  useEffect(() => {
    // Dispatch the fetchUserByTokenThunk when the component mounts
    dispatch(fetchUserByTokenThunk());
  }, [dispatch]);
 




 


  return (
    <div className="z-10 text-white p-4 fixed top-0 w-full pt-3 bg-[#000000]">
 <ConfirmDialog
        visible={confirmDialogVisible}
        message="Are you sure you want to Logout"
        header="Confirmation" 
        headerClassName='font-bold'
        
        acceptLabel="Yes"
        rejectLabel="No"
        acceptClassName="p-button-primary  bg-green-900 ml-4 mt-8 pl-10 pr-10"
        rejectClassName="p-button-secondary  bg-red-900 pl-10 pr-10"
        accept={() => {
          localStorage.removeItem('token');
          window.location.reload();
        }}
        className='bg-[#3d3d3d] p-10 rounded'

      />
      <nav className="container mx-auto flex justify-between items-center mt-3 mb-3">
        <span className="text-3xl font-bold">
          <img src="src\components\cable.png" alt="" className="h-6 w-8 inline relative mr-1" /> Cable master
        </span>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
          <li><Link to="products" className="hover:#1e1b4b">Products</Link></li>
          <li><Link to="about-us" className="hover:text-blue-300">About Us</Link></li>
          {user && user.role === 'admin' && (

            <li><Link to="admin" className="hover:text-blue-300">Admin</Link></li>
            )}
          {user && user.role === 'visitor' && (

           <li><Link to="profile" className="hover:text-blue-300">Profile</Link></li>
           )}
          {!user && (

            <li><Link to="login" className="hover:text-blue-300">Login</Link></li>
            )}
            {user && (

            <li 
            onClick={() => {
              setConfirmDialogVisible(true);
            }}
            className="hover:text-red-500  cursor-pointer">
              <span>Sign out</span></li>
            )}


          <li>
            <Link to="cart" className="hover:text-blue-300">
              <img src="src\components\icons8-cart-100.png " alt="" className="h-6 w-8 ml-[5rem] mr-[2rem]" />
              {totalItems > 0 && <span className="text-white absolute right-9 ">{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}
