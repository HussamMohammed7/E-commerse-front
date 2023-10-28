import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart ,removeFromCart,increaseQuantity,decreaseQuantity } from '../redux/slices/products/cartSlice';


type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
  categories: number[]
  variants: string[]
  sizes: string[]
}
export default function Cart() {
  const state = useSelector((state: RootState) => state);
  const cartItems = state.cart.items;


  const dispatch = useDispatch();


// To increase quantity

// To decrease quantity
const handleIncreaseQuantity = (productId : number) => {
  dispatch(increaseQuantity({ productId }));
};
const handleDecreaseQuantity = (productId : number) => {
  dispatch(decreaseQuantity({ productId }));
};

const handleRemove = (productId : number) => {
  dispatch(removeFromCart({ productId }));
};
  let totalPrice = 0;
  cartItems.forEach((item) => {
    const productPrice = item.product.price;
    const quantity = item.quantity;
    totalPrice += productPrice * quantity;
  });

  return (
    <div className="h-screen bg-blackTheme  pt-20 mt-9   ">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 xl:px-0 ml-[10rem]" >
    {cartItems.map((item) => (
      
        <div key={item.product.id} className="rounded-lg md:w-2/3 mb-6">
          <div className="justify-between mb-6 rounded-lg bg-whiterBlack p-6 shadow-md sm:flex sm:justify-start border">
            <img src={item.product.image} alt="product-image" className="w-full border rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-white">{item.product.name}</h2>
                <p className="mt-1 text-xs text-white">{item.product.description}</p>

              </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

                                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-white">
                    <span className="cursor-pointer rounded-l bg-blackTheme py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                     onClick={() => handleDecreaseQuantity(item.product.id)}> - </span>
                    <input className="h-8 w-8  bg-blackTheme text-center text-xs "  value={item.quantity} min="1" />
                    <span className="cursor-pointer rounded-r bg-blackTheme py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    onClick={() => handleIncreaseQuantity(item.product.id)}> + </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">{item.product.price }</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    onClick={() => handleRemove(item.product.id)}
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  </div>
             
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6  rounded-lg border bg-whiterBlack p-6 shadow-md md:mt-0 md:w-1/3
        absolute top-[11.65rem] right-[8rem] ml-[10rem] ">
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
            <p className="mb-1 text-lg font-bold">{totalPrice+(totalPrice*0.15)+30} SAR</p>
            <p className="text-sm white">including %15 VAT</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
      </div>
    </div>
  </div>
  )
}


{/*  */}