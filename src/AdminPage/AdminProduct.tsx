import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { useDispatch, useSelector } from 'react-redux';
import {
  productsRequest,
  productsSuccess,
  removeProduct,
} from '../redux/slices/products/productSlice';
import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import axios from 'axios';
import { ProductsManager } from '../components/ProductsManager';
import { AiOutlineClose } from 'react-icons/ai';

export default function AdminProduct() {

  const TABLE_HEAD = [
    "ID",
    "Name",
    "Image",
    "Description",
    "Categories",
    "Variants",
    "Sizes",
    "Price",
    "Actions",
    ""
  ];

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const products = state.products;

 

  useEffect(() => {
    handleGetProducts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(0); 

  const [searchQuery, setSearchQuery] = useState('');

  const filterProducts = () => {
    let filteredProducts = products.items;
  
    if (selectedCategory !== 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.categories.includes(selectedCategory)
      );
    }
  
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    return filteredProducts;
  };
  

  const handleGetProducts = async () => {
    dispatch(productsRequest());

    const res = await api.get('/mock/e-commerce/products.json');
    dispatch(productsSuccess(res.data));
  }

  const handleCategoryChange = (category: number) => {
    setSelectedCategory(category);
  };


  const [showProductsManager, setShowProductsManager] = useState(false);

  // Function to show the ProductsManager component
  
 
const openProductsManager = () => {
    setShowProductsManager(true);
  };
  const style = { color: "red" , }


  return (
    <div className="flex">
    <AdminSideBar />
    <div className="flex flex-col mt-20 h-full w-full">

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="sm:rounded-lg">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-4 py-7"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.items.map((product, index) => (
                    <tr
                      key={product.id}
                      className={
                        index % 2 === 0
                          ? "border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
                          : "border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                      }
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium">
                        {product.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{product.name}</td>
                      <td className="whitespace-nowrap px-4 py-3 h-2 w-2"><img src= {product.image} alt="" /></td>
                      <td className="whitespace-nowrap px-4 py-3">{product.description} </td>
                      <td className="whitespace-nowrap px-4 py-3">{product.categories}</td>
                      <td className="whitespace-nowrap px-4 py-3">{product.variants} </td>
                      <td className="whitespace-nowrap px-4 py-3">{product.sizes}</td>
                      <td className="whitespace-nowrap px-4 py-3">{product.price}</td>


                      <td >
                        <span className="whitespace-nowrap px-4 py-3 cursor-pointer hover:text-[#530296]"
                        onClick={openProductsManager}>
                          Edit
                        </span>
                      </td>
                      <td >
                      <span
                      className="whitespace-nowrap px-4 py-3 text-red-700 hover:text-red-300 cursor-pointer"
                       onClick={() => dispatch(removeProduct({ productId: product.id }))}
                      >
                       <AiOutlineClose  />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
  )
}
