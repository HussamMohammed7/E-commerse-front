import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import * as MaterialDesign from "react-icons/md";


interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface EditUserProps {
  selectedUser: Users | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleClose: () => void;
}

const EditUser: React.FC<EditUserProps> = ({ selectedUser, handleInputChange, handleSubmit, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!selectedUser) {
      return false;
    }

    if (!selectedUser.firstName) {
      errors.firstName = 'First Name is required';
    }

    if (!selectedUser.lastName) {
      errors.lastName = 'Last Name is required';
    }

    if (!selectedUser.email) {
      errors.email = 'Email is required';
    } else if (!selectedUser.email.includes('@')) {
      errors.email = 'Invalid email format';
    }

    if (!selectedUser.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = () => {
    if (validateForm()) {
      handleSubmit();
      handleClose();
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${selectedUser ? '' : 'hidden'}`}>
      <div className="bg-white dark:bg-neutral-700 p-4 rounded shadow-md max-w-md w-full">
        <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
          <div className="mb-4">
         
            <label htmlFor="firstName" className="block text text-sm font-medium text-left p-2">
              First Name

              <span
                onClick={handleClose}
                className=" absolute  right-[35rem] text-red-700 hover:text-red-300 cursor-pointer"
              >
                <AiOutlineClose />
              </span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={selectedUser?.firstName || ''}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {validationErrors.firstName && <div className="text-red-500">{validationErrors.firstName}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-left p-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={selectedUser?.lastName || ''}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {validationErrors.lastName && <div className="text-red-500">{validationErrors.lastName}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-left p-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={selectedUser?.email || ''}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {validationErrors.email && <div className="text-red-500">{validationErrors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-left p-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={selectedUser?.password || ''}
                onChange={handleInputChange}
                className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <span
                onClick={handleTogglePasswordVisibility}
                className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {validationErrors.password && <div className="text-red-500">{validationErrors.password}</div>}
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#530296] border border-transparent rounded-md hover:bg-purpleHover focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
