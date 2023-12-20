import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../redux/slices/Category/CategorySlice';
import { Product } from '../redux/slices/products/productSlice';

 
import { addToCart } from '../redux/slices/products/cartSlice';
import { useDispatch } from 'react-redux';


interface ProductCardProps {
  product: Product; // Use your actual Product type
}



const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {

    dispatch(addToCart({ product, quantity: 1 }));
    console.log("productID", product)

  };
  

  return (
    <div className=" p-6  " > {/* Set width to 1/3 for three cards in a row and add padding */}
      <div className="h-[32rem] mb-[4rem] bg-whiterBlack shadow-lg p-4 rounded-md border-[#20124d] border-2" > {/* Card container */}
        <img src={product.image} alt={product.name} className="w-full h-[20rem] rounded-md " />
        
        <Link to={`product-detail/${product._id}`}>
        <h3 className="text-xl font-semibold mt-4 cursor-pointer hover:text-blue-600 ">{product.name}</h3>
        </Link>
        <p className="text-[#fbfbfb] mt-2" >{product.description}</p>
        <div className="flex items-center justify-between mt-4">
                
        <h3 className="text-xl font-semibold ml-[4rem] ">{product.price} SR</h3>


          <button className="bg-purple border-0 py-2 px-6 focus:outline-none hover:bg-purpleHover text-white px-4 py-2 rounded-md w-[12rem] mr-10"
          onClick={handleAddToCart}>Quick Add to cart</button>
        </div>
      </div>
    </div>
  );
};




export default ProductCard;
