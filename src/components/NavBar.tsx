import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function NavBar() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const user = useSelector((state: RootState) => state.user.user); // Get logged-in user
  console.log(user);

  return (
    <div className="z-10 text-white p-4 fixed top-0 w-full pt-3 bg-[#000000]">
      <nav className="container mx-auto flex justify-between items-center mt-3 mb-3">
        <span className="text-3xl font-bold">
          <img src="src\components\cable.png" alt="" className="h-6 w-8 inline relative mr-1" /> Cable master
        </span>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
          <li><Link to="products" className="hover:#1e1b4b">Products</Link></li>
          <li><Link to="about-us" className="hover:text-blue-300">About Us</Link></li>
          <li><Link to="products-manager" className="hover:text-blue-300">ProductsManager</Link></li>
          {user && user.role === 'admin' && (
            <li><Link to="admin" className="hover:text-blue-300">Admin</Link></li>
          )}
          {user && user.role === 'visitor' && (
  <li><Link to="profile" className="hover:text-blue-300">Profile</Link></li>
)}

          {!user && (
            <li><Link to="login" className="hover:text-blue-300">Login</Link></li>
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
