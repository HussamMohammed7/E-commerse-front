import React from 'react'
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';



  // Calculate the total number of items in the cart

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state);
  const cart = state.cart.items;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  console.log('Total Quantity:', totalItems);

  return(
           
          
        <div className=" z-10 text-white p-4 fixed top-0 w-full  pt-3 bg-[#0e0e0e]">
  <nav className="container mx-auto flex justify-between items-center mt-3 mb-3">
    <span className="text-3xl font-bold">
    <img src="src\components\cable.png" alt="" className='h-6 w-8 inline relative mr-1 ' />  Cable master 
     </span>
    <ul className="flex space-x-4">
      <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
      <li><Link to="products" className="hover:#1e1b4b">Products</Link></li>
      <li><Link to="AboutUs" className="hover:text-blue-300">About Us</Link></li>
      <li><Link to="ProductsManager" className="hover:text-blue-300">ProductsManager</Link></li>
      <li><Link to="Admin" className="hover:text-blue-300">Admin</Link></li>

      <li><Link to="Cart" className="hover:text-blue-300"><img src="src\components\icons8-cart-100.png " alt=""className="h-6 w-8 ml-[5rem] mr-[2rem]  " />
      {totalItems > 0 && <span className=" text-white absolute right-9 ">{totalItems}</span>}

      </Link></li>
    

    </ul>
  </nav>
</div>
  )
      
  }