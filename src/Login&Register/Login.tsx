import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../redux/slices/userSlice'
import { usersRequest, usersSuccess } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { AppDispatch, RootState } from '../redux/store'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.user.users

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserLogin({ ...userLogin, [name]: value })
  }
  const navigate = useNavigate()

  const handleLoginUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = {
      email: userLogin.email,
      password: userLogin.password
    }
    console.log(user)

    // Make a request to register the user
    const login = await dispatch(loginThunk(user))

    if (loginThunk.fulfilled.match(login)) {
      toast.success('Login successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      localStorage.setItem('token', login.payload.token)

      navigate('/')
    } else if (loginThunk.rejected.match(login)) {
      console.log(login)
      toast.error(login.payload as string, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
    setUserLogin({
      email: '',
      password: ''
    })
  }

  //   const dispatch = useDispatch();
  //   const state = useSelector((state: RootState) => state);
  //   const usersData = state.user.users;
  //   const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success
  //   console.log(loginSuccess);
  // const navigate = useNavigate()

  //   const handleGetUsers = async () => {
  //     dispatch(usersRequest());

  //     try {
  //       const res = await api.get('/mock/e-commerce/users.json');
  //       dispatch(usersSuccess(res.data));
  //     } catch (error) {
  //       // Handle the error
  //     }
  //   };

  //   useEffect(() => {
  //     handleGetUsers();
  //   }, [dispatch]);

  //   const handleLogin = (event: React.FormEvent) => {
  //     event.preventDefault(); // Prevent the default form submission behavior

  //     const user = usersData.find((user) => user.email === email && user.password === password);

  //     if (user) {
  //       console.log('Logging in as:', user);
  //       dispatch(setUserRole({ role: user.role }));
  //       dispatch(loginUser({ user }));
  //       setLoginSuccess(true);
  //       navigate('/')

  //     } else {
  //       // Handle login failure
  //       console.log('Login failed');
  //     }
  //   };

  return (
    <div>
      <div className="bg-gif  relative flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="w-1/2 p-6 m-auto rounded-md shadow-md lg.max-w-xl text-left bg-neutral-700 border ">
          <h1 className="text-3xl font-semibold text-purple-400">Sign in</h1>
          <form onSubmit={handleLoginUser} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus.border-purple-400 focus.ring-purple-300 focus.outline.none focus.ring.focus.ring-opacity-40"
                value={userLogin.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-purple-100 border rounded-md focus.border-purple-400 focus.ring-purple-300 focus.outline.none focus.ring.focus.ring-opacity-40"
                value={userLogin.password}
                onChange={handleInputChange}
              />
            </div>
            <Link to="/reset-email" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </Link>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple hover.bg-purpleHover rounded-md hover.bg-purple-600 focus.outline.none focus.bg-purple-600">
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
        <div className="absolute w-full   ">
          {state.user.isLoading && <CircularProgress style={{ color: '#674ea7' }} size={200} />}
        </div>
      </div>
    </div>
  )
}
