import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from '../redux/slices/products/cartSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDecodedTokenFromStorage } from '../utils/token'
import { Order } from '../redux/slices/orderSlice'
import { addOrderThunk } from '../redux/slices/orderSlice'
import { CircularProgress } from '@mui/material'

export default function Cart() {
  const state = useSelector((state: RootState) => state)
  const cartItems = state.cart.items
  const user = state.user.user
  const dispatch = useDispatch<AppDispatch>()

  const userToken = getDecodedTokenFromStorage()
  const role = userToken?.role
  console.log(role)

  const navigate = useNavigate()
  console.log('user', user)

  useEffect(() => {
    if (!userToken) {
      // Handle case when user is not logged in
      toast.error('You need to sign in first ', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      navigate('/login')
    } else if (role !== 'visitor') {
      console.log(role)

      toast.error("You don't have permission ", {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      navigate('/')
    }
  }, [navigate])

  // To increase quantity
  const handleIncreaseQuantity = (productId: string) => {
    console.log('productId', productId)
    dispatch(increaseQuantity({ productId }))
  }
  // To decrease quantity
  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity({ productId }))
  }

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart({ productId }))
  }
  const products = cartItems.map((item) => item.product)
  const handlePlaceOrder = async () => {
    if (user) {
      // Dispatch the addOrderThunk with the new order details
      const checkOut = await dispatch(
        addOrderThunk({
          userId: user._id,
          products: cartItems.map((item) => ({
            price: item.product.price,
            product: item.product._id,
            quantity: item.quantity
          }))
        })
      )

      if (addOrderThunk.fulfilled.match(checkOut)) {
        toast.success('Order placed successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        })
      } else if (addOrderThunk.rejected.match(checkOut)) {
        toast.error(checkOut.payload as string, {
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
    }
  }

  let totalPrice = 0
  cartItems.forEach((item) => {
    const productPrice = item.product.price
    const quantity = item.quantity
    totalPrice += productPrice * quantity
  })
  console.log(cartItems)
  return (
    <div>
      <div className='absolute flex items-center justify-center w-full h-full '>
    {state.order.isLoading && <CircularProgress style={{ color: '#674ea7' }} size={200} />}
    </div>
    <div className="h-screen bg-blackTheme pt-20 mt-9 ">
      
      <h1 className="mt-10 mb-10 text-center text-2xl font-bold">Cart Items</h1>
      {cartItems.length > 0 ? (
        <div className="mx-auto max-w-5xl justify-center px-6 xl:px-0 ml-[10rem] ">
          {cartItems.map((item) => (
            <div key={item.product._id} className="rounded-lg md:w-2/3 mb-6">
              <div className="justify-between mb-6 rounded-lg bg-whiterBlack p-6 shadow-md sm:flex sm:justify-start border">
                <img
                  src={item.product.image}
                  alt="product-image"
                  className="w-full border rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-white">{item.product.name}</h2>
                    <p className="mt-1 text-xs text-white">{item.product.description}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-white">
                        <span
                          className="cursor-pointer rounded-l bg-blackTheme py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleDecreaseQuantity(item.product._id)}>
                          {' '}
                          -{' '}
                        </span>
                        <input
                          className="h-8 w-8 bg-blackTheme text-center text-xs "
                          value={item.quantity}
                          min="1"
                        />
                        <span
                          className="cursor-pointer rounded-r bg-blackTheme py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleIncreaseQuantity(item.product._id)}>
                          {' '}
                          +{' '}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">SAR {item.product.price}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          onClick={() => handleRemove(item.product._id)}
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className=" rounded-lg border bg-whiterBlack p-6 shadow-md md:mt-0 md:w-1/3 absolute top-[14.2rem] right-[8rem] ml-[10rem] ">
            <div className="mb-2 flex justify-between">
              <p className="text-white">Subtotal</p>
              <p className="text-white">{totalPrice} SAR</p>
            </div>
            <div className="flex justify-between">
              <p className="text-white">Shipping</p>
              <p className="text-white">30 Sar</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{totalPrice + totalPrice * 0.15 + 30} SAR</p>
                <p className="text-sm white">including %15 VAT</p>
              </div>
            </div>
            <button
              onClick={() => handlePlaceOrder()}
              className="mt-6 w-full rounded-md py-1.5 font-medium text-blue-50 bg-purple border-0 py-2 px-6 focus:outline-none hover-bg-purpleHover">
              Check out
            </button>
          </div>
        </div>
      ) : (
        <div className="justify-center items-center mt-[10rem]">
          <p className="text-4xl font-bold ">Your cart is empty</p>
        </div>
      )}
      </div>
    </div>
  )
}
