import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRole ,loginUser} from '../redux/slices/userSlice';
import { usersRequest, usersSuccess } from '../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { RootState } from '../redux/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const usersData = state.user.users;
  const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success
console.log(loginSuccess);
const navigate = useNavigate()

  const handleGetUsers = async () => {
    dispatch(usersRequest());

    try {
      const res = await api.get('/mock/e-commerce/users.json');
      dispatch(usersSuccess(res.data));
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, [dispatch]);


  

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const user = usersData.find((user) => user.email === email && user.password === password);

    if (user) {
      console.log('Logging in as:', user);
      dispatch(setUserRole({ role: user.role }));
      dispatch(loginUser({ user }));
      setLoginSuccess(true);
      navigate('/')


    } else {
      // Handle login failure
      console.log('Login failed');
    }
  };


  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto rounded-md shadow-md lg.max-w-xl text-left bg-neutral-700">
        <h1 className="text-3xl font-semibold text-purple-400">Sign in</h1>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus.border-purple-400 focus.ring-purple-300 focus.outline.none focus.ring.focus.ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus.border-purple-400 focus.ring-purple-300 focus.outline.none focus.ring.focus.ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/forgot-password" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </Link>
          <div className="mt-6">
          

            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple hover.bg-purpleHover rounded-md hover.bg-purple-600 focus.outline.none focus.bg-purple-600"
            >


              Login
         
            </button>
           
            
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center">
          {' '}
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
   
    </div>
  );
}
