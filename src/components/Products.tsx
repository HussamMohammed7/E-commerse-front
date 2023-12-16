import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  productsRequest,
  productsSuccess,
} from '../redux/slices/products/productSlice';
import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import axios from 'axios';
import ProductCard from './ProductCard';

interface Category {
  id: number;
  name: string;
}

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const products = state.products;

  const [categories, setCategories] = useState<Category[]>([]);
  const [perPage, setPerPage] = useState(10); // Default value for products per page
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleGetProducts();
  }, [perPage]);

  useEffect(() => {
    axios
      .get('/mock/e-commerce/categories.json')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleGetProducts = async () => {
    dispatch(productsRequest());

    const res = await api.get('http://localhost:5050/api/products', {
      params: {
        perPage,
        page,
        searchQuery,
      },
    });

    dispatch(productsSuccess(res.data.items));
  };

  return (
    <div className="grid grid-cols-1 w-full">
      {products.isLoading && <h3>Loading products...</h3>}
      <nav className="sticky top-20 bg-[#1a1a1a] p-4 shadow-md z-10 flex justify items-center">
        <div className=" items-center mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" border p-2 px-[500px] rounded text-left "
            
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Products per page:</label>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border p-2 mr-5 rounded pr-10"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </nav>
      <div className="card grid gap-4 mt-20">
        <div className="mb-4">
          {/* Removed filter options */}
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.items.map((product) => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
}