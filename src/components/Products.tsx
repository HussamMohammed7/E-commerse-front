import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  productsRequest,
  productsSuccess,
  removeProduct,
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

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios.get('/mock/e-commerce/categories.json') // Adjust the URL as needed
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1  w-full">
    {products.isLoading && <h3>Loading products...</h3>}
    <div className="card grid gap-4 mt-20">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Product Filters</h2>
        <div>
          <label htmlFor="categorySelect">Filter by Category:</label>
          <select
            id="categorySelect"
            onChange={(e) => handleCategoryChange(Number(e.target.value))}
          >
            <option value={0}>All</option>
            {categories.map(categoryItem => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="searchInput">Search:</label>
          <input
            type="text"
            id="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filterProducts().map(product => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  )}
        
