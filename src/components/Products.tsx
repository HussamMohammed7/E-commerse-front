import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsByPageThunk,
  getProductsThunk,
} from '../redux/slices/products/productSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Product } from '../redux/slices/products/productSlice';
import ProductCard from './ProductCard';

interface Category {
  id: number;
  name: string;
}

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const products = state.products;

  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
    totalPages: 0,
    totalProduct: 0,
  });

  const [filteredItem, setFilteredItem] = useState<Product[]>([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products based on the current pagination and search term
        const action = await dispatch(getProductsByPageThunk({ ...pagination, searchName }));

        if (getProductsByPageThunk.fulfilled.match(action)) {
          const { perPage, page, totalPages, totalProduct, items } = action.payload;
          setPagination({
            perPage,
            page,
            totalPages,
            totalProduct,
          });
          setFilteredItem(items);
        } else {
          console.error('Error fetching products by page:', action.error);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
     
    fetchData();
    console.log('searchName: ', searchName);
  }, [dispatch, pagination.page, pagination.perPage, searchName]);

  const handlePageChange = (newPage: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: newPage,
    }));
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      handlePageChange(pagination.page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      handlePageChange(pagination.page - 1);
    }
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(pagination.totalPages);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setSearchName(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 w-full">
      {products.isLoading && <h3>Loading products...</h3>}
      <nav className="sticky top-20 bg-[#1a1a1a] p-4 shadow-md z-10 flex justify items-center">
        <div className="items-center mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={searchName}
            onChange={handleSearchChange}
            className="border p-2 px-[500px] rounded text-left"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Products per page:</label>
          <select
            value={pagination.perPage}
            onChange={(e) =>
              setPagination({
                ...pagination,
                perPage: parseInt(e.target.value),
              })
            }
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
        <div className="mb-4">{/* Removed filter options */}</div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItem.map((product) => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleFirstPage}
          disabled={pagination.page === 1}
          className="mr-2 bg-gray-300 px-4 py-2 rounded"
        >
          First
        </button>
        <button
          onClick={handlePrevPage}
          disabled={pagination.page === 1}
          className="mr-2 bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>
        <span className="text-lg font-bold">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={pagination.page === pagination.totalPages}
          className="ml-2 bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
        <button
          onClick={handleLastPage}
          disabled={pagination.page === pagination.totalPages}
          className="ml-2 bg-gray-300 px-4 py-2 rounded"
        >
          Last
        </button>
      </div>
    </div>
  );
}
