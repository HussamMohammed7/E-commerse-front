import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/slices/products/cartSlice';
import { Product } from '../redux/slices/products/productSlice';






export default function ProductDetail(   ) {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((state: RootState) => state);
    const { productId } = useParams();
    const productToDisplay = state.products.items.find(product => product._id.toString() === productId);
    const [productShow, setProductShow] = useState<Product | null>(null);

    
    const productDetailsRequest = async (id : String) => {
      try {
        const res = await api.get(`/api/products/${id}`);
        console.log('product id ', res.data);
        setProductShow(res.data.productbyId);
        console.log('productproductShow ', productShow);
      } catch (error) {
        console.error('Error Getting the data:', error);
        // Optionally, handle errors or show a message to the user.
      }
    };
    
    useEffect(() => {
      productDetailsRequest(productId!!);
    }, []);




      const handleAddToCart = () => {
        if (productShow) {
          dispatch(addToCart({ product: productShow, quantity: 1 }));
        }
      };
      console.log(productShow)
      

  return (

    <div >
<section className="text-white body-font overflow-hidden bg-blackTheme">
  <div className="container px-5 py-24 mx-auto mt-10">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img src={productShow?.image[0]} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
        <h1 className="text-white text-3xl title-font font-medium mb-1">{productShow?.name}</h1>
        <div className="flex mb-4">
          
          
         
        </div>
        <p className="leading-relaxed text-white">{productShow?.description}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          {productShow!!?.sizes.length > 0 && (
          <div className="flex ml-6 items-center">
            
            <span className="mr-3">Size</span>
            <div className="relative">
           
  <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
    {productShow?.sizes.map((size) => (
      <option key={size}>{size}</option>
    ))}
  </select>

              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>)}
          {productShow!!?.variants.length > 0 && (
          <div className="flex ml-6 items-center">
            
            <span className="mr-3">Variants</span>
            <div className="relative">
           
  <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
    {productShow?.variants.map((size) => (
      <option key={size}>{size}</option>
    ))}
  </select>

              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>)}
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-white">{productShow?.price} SR</span>
          <button onClick={handleAddToCart} className="flex ml-auto text-white bg-purple border-0 py-2 px-6 focus:outline-none hover:bg-purpleHover rounded"
          >Add to cart </button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

  </div>
<h1 className="text-white text-3xl title-font font-medium mb-1">Reviews</h1>
</section>
</div>
  )}
        
        
        
        
  

