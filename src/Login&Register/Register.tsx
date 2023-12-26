import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { RootState } from '../redux/store';




export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phoneNumber,
      password: formData.password,
      // Add other fields as needed
    };
    console.log(user);
    try {
      // Make a request to register the user
      const res = await api.post('/api/users/register', user);

      console.log('User registered successfully:', res.data);

      // Optionally, update Redux state or perform other actions after successful registration.

      // Reset the form data or perform other actions if needed.
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Optionally, you might want to do something after a successful registration, e.g., redirect the user.
    } catch (error) {
      console.error('Error registering user:', error);
      // Optionally, handle errors or show a message to the user.
    }
  };
  // gradient-to-r from-[#20124d] to-[#0C071E] mt-10

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gif2">
      <div className="w-full p-6 mb-10 m-auto rounded-md shadow-md lg:max-w-xl text-left bg-[#141414] border">
        <h1 className="text-3xl font-semibold text-purple-400 mb-10">Register</h1>
        <form onSubmit={handleRegisterUser} className="mt-6">
          <div className="flex">
            <div className="mb-2">
              <label className="block text-sm font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="block w-[16.25rem] mr-2 px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="block w-[16.25rem] px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
          <div >

          <PhoneInput
           
            country={'sa'} // Default country
            
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            
            inputClass="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mt-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-[#20124d] to-[#0C071E] hover:bg-purpleHover rounded-md hover:bg-purple-600 focus:outline-none hover-border"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
