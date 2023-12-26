import React, { useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const users = state.user.users;

  const params = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    setShowLoading(true);
    e.preventDefault();

    if (formData.password.length < 8) {
      setPasswordLengthError(true);
      setErrorMessage('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      setErrorMessage('Passwords do not match');
      return;
    }

    const user = {
      forgotPasswordToken: params.forgotPasswordToken,
      password: formData.password,
    };

    try {
      const res = await api.post(
        '/api/users/reset-password',
        user
      );

      console.log('Password reset successfully:', res.data);

      setFormData({
        password: '',
        confirmPassword: '',
      });

      toast.success('Password reset successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      navigate('/login')

    } catch (error) {
      console.error('Error resetting the password user:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Validate passwords on input change
    setPasswordsMatch(true);
    setPasswordLengthError(false);
    setErrorMessage('');  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-gif2">
      <div className="w-full p-6 mb-10 m-auto rounded-md shadow-md lg:max-w-xl text-left bg-[#141414] border mb-[10rem]">
        <h1 className="text-3xl font-semibold text-purple-400 mb-10">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2 relative">
            <label className="block text-sm font-semibold mt-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <span
                className="text-purple-300 cursor-pointer absolute top-1/2 right-8 transform -translate-y-1/2"
                onClick={handleTogglePassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
            {passwordLengthError && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters</p>
            )}
          </div>
          <div className="mb-2 relative">
            <label className="block text-sm font-semibold">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <span
                className="text-purple-300 cursor-pointer absolute top-1/2 right-8 transform -translate-y-1/2"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-[#20124d] to-[#0C071E] hover:bg-purpleHover rounded-md hover:bg-purple-600 focus:outline-none hover-border"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
