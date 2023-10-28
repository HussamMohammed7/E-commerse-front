import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { addToCart } from '../redux/slices/products/cartSlice';
import { useDispatch } from 'react-redux';


interface ProductCardProps {
  product: Product; // Use your actual Product type
}



const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {

    dispatch(addToCart({ product, quantity: 1 }));
  };
  

  return (
    <div className=" p-4 " > {/* Set width to 1/3 for three cards in a row and add padding */}
      <div className="h-[32rem] mb-[4rem] bg-whiterBlack shadow-lg p-4" > {/* Card container */}
        <img src={product.image} alt={product.name} className="w-full h-[20rem] " />
        
        <Link to={`ProductDetail/${product.id}`}>
        <h3 className="text-xl font-semibold mt-2 cursor-pointer hover:text-blue-600">{product.name}</h3>
        </Link>
        <p className="text-gray-600 " >{product.description}</p>
        <div className="flex items-center justify-between mt-4">
                
        <h3 className="text-xl font-semibold ml-[4rem] ">{product.price} SR</h3>


          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-[12rem] mr-10"
          onClick={handleAddToCart}>Quick Add to cart</button>
        </div>
      </div>
    </div>
  );
};




export default ProductCard;