import React, { useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios'
import { CircularProgress } from '@mui/material';


export default function ResetEmail() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const users = state.user.users;
  const [showLoading, setShowLoading] = useState(false);

  const params = useParams();
  const [formData, setFormData] = useState({
    email: '',
  });


  const handleSubmit = async (e: React.FormEvent) => {
    setShowLoading(true);
    e.preventDefault();

   

    const user = {
      email: formData.email,
      // Add other fields as needed
    };

    try {
      const res = await api.post('/api/users/forgot-password', user);

      console.log('email reset successfully:', res.data);

      setShowLoading(false);

      
        toast.success('Reset link have sent tot your email successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        })
  
      

      setFormData({
        email: '',
      });


    } catch (error) {
      setShowLoading(false);

      if (error instanceof AxiosError) {
       
      toast.error(error.response?.data.msg as string, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      console.error('Error resetting email:', error);
      // Optionally, handle errors or show a message to the user.
    }
  }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset border color when the user types
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gif2">
        <div className="absolute w-full   ">
          {showLoading && <CircularProgress style={{ color: '#674ea7' }} size={200} />}
        </div>
      <div className="w-full p-6 mb-10 m-auto rounded-md shadow-md lg:max-w-xl text-left bg-[#141414] border mb-[14rem]">
        <h1 className="text-3xl font-semibold text-purple-400 mb-10">Check Email </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:outline-none
              focus:border-purple-400 focus:ring-purple-300 `}
            />
          </div>
         
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-[#20124d] to-[#0C071E] hover:bg-purpleHover rounded-md hover:bg-purple-600 focus:outline-none hover-border"
            >
              Send to Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
