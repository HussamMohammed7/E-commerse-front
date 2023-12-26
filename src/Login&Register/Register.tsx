import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { RootState } from '../redux/store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when the user starts typing in the input
    setErrors({ ...errors, [name]: '' });
  };

  const handlePhoneNumberChange = (value: string) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const validateForm = () => {
    // Validate form data
    let formIsValid = true;
    const newErrors: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    Object.entries(formData).forEach(([fieldName, value]) => {
      if (fieldName !== 'phoneNumber' && !value) {
        formIsValid = false;
        newErrors[fieldName as keyof typeof newErrors] = `Please enter your ${fieldName}`;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 8) {
      formIsValid = false;
      newErrors.password = 'Password must be at least 8 characters long';
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form before making the registration request
    if (!validateForm()) {
      console.log('Form is not valid');
      return;
    }

    const user = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phoneNumber,
      password: formData.password,
      // Add other fields as needed
    };

    try {
      // Make a request to register the user
      const res = await api.post('http://localhost:5050/api/users/register', user);

      console.log('User registered successfully:', res.data);

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
      console.error('Error registering user:', error);
      // Optionally, handle errors or show a message to the user.
    }
  }

  };

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
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
          <PhoneInput
            country={'sa'} // Default country
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            inputClass="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <div className="mb-2">
            <label className="block text-sm font-semibold mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
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
