import React, { useEffect, useState, ChangeEvent } from 'react';
import AdminSideBar from './AdminSideBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  productsRequest,
  productsSuccess,
  removeProduct,
  updateProduct,
  addProduct,
} from '../redux/slices/products/productSlice';
import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import { AiOutlineClose } from 'react-icons/ai';
import EditProductForm from './EditProductForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductForm } from './AddProductForm';

interface Category {
  id: number;
  name: string;
}

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  categories: number[]; // Changed to string[]
  variants: string[];
  sizes: string[];
  [key: string]: any;
};

export default function AdminProduct() {
  const initialProductState: Product = {
    id: 0, // You can set a default value for id or leave it as 0
    name: '',
    image: '',
    description: '',
    price: 0, // You can set a default value for price or leave it as 0
    categories: [], // Initialize with an empty array
    variants: [],
    sizes: [],
  };
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

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showNewProductForm, setShowNewProductForm] = useState(false); // Add a state for showing the new product form
  let filteredProducts : Product[] = products.items;

  const openNewProductForm = () => {
    setShowNewProductForm(true);
  };

  const closeNewProductForm = () => {
    setShowNewProductForm(false);
  };

  const handleAddProduct = (newProduct: Product) => {
    // Call the addProduct action
    
    dispatch(addProduct({ product: newProduct }));
    console.log(newProduct.categories);
    // Close the new product form
    closeNewProductForm();
  };



  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [name]: value,
      });
    }
  };


  const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>, key: string, index: number) => {
    const { value } = e.target;
  
    if (selectedProduct) {
      setSelectedProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;
  
        const updatedProduct = { ...(prevProduct as Product) };
  
        if (key === 'categories') {
          const updatedCategories = [...updatedProduct[key]];
          updatedCategories[index] = Number(value.trim());
          updatedProduct[key] = updatedCategories;
        } else {
          const updatedArray = [...updatedProduct[key]];
          updatedArray[index] = value.trim();
          updatedProduct[key] = updatedArray;
        }
  
        return { ...prevProduct, ...updatedProduct };
      });
    }
  };
  
  
  
  
  


  const handleSubmit = () => {
    if (selectedProduct) {
      dispatch(updateProduct({ productId: selectedProduct.id, updatedProduct: selectedProduct }));
      filteredProducts = products.items;
      closeEditForm();
    }
  };

  const openEditForm = (product: Product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setSelectedProduct(null);
  };

  const handleGetProducts = async () => {
    dispatch(productsRequest());
    

    const res = await api.get('/mock/e-commerce/products.json');
    
    dispatch(productsSuccess(res.data));
  };

  const [showEditForm, setShowEditForm] = useState(false);

  //filter method 
  //this will use to 
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState(0); 

  //fitch the categories
  useEffect(() => {
    axios.get('/mock/e-commerce/categories.json') // Adjust the URL as needed
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCategoryChange = (category: number) => {
    setSelectedCategory(category);
  };

  const filterProducts = () => {
  
    if (selectedCategory !== 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.categories.includes(selectedCategory)
      );
    }
  
    return filteredProducts;
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col mt-20 h-full w-full">
      <div className='text-left '>
          <label htmlFor="categorySelect" className='ml-4'>Filter by Category:</label>
          <select
            id="categorySelect"
            className='p-4 pr-[50rem] mt-5 ml-10'
            onChange={(e) => handleCategoryChange(Number(e.target.value))}
          >
            <option  value={0}>All</option>
            {categories.map(categoryItem => (
              <option  key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))}
          </select>
          <span
           onClick={openNewProductForm} // Open the new product form when the button is clicked
           className='rounded p-2 ml-2 
          
           cursor-pointer hover:text-[#530296]'>Add Product</span>
             <span
           className='rounded p-2 ml-2 
          
           cursor-pointer hover:text-[#530296]'>Add New Category</span>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                    {filterProducts().map((product, index) => (
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
                        <td className="whitespace-nowrap px-4 py-3 h-2 w-2"><img src={product.image} alt="" /></td>
                        <td className="whitespace-nowrap px-4 py-3">{product.description}</td>
                        <td className="whitespace-nowrap px-4 py-3">{product.categories.join(', ')}</td>
                        <td className="whitespace-nowrap px-4 py-3">{product.variants.join(', ')}</td>
                        <td className="whitespace-nowrap px-4 py-3">{product.sizes.join(', ')}</td>
                        <td className="whitespace-nowrap px-4 py-3">{product.price}</td>

                        <td>
                          <span className="whitespace-nowrap px-4 py-3 cursor-pointer hover:text-[#530296]"
                            onClick={() => openEditForm(product)}
                          >
                            Edit
                          </span>
                        </td>
                        <td>
                          <span
                            className="whitespace-nowrap px-4 py-3 text-red-700 hover:text-red-300 cursor-pointer"
                            onClick={() => dispatch(removeProduct({ productId: product.id }))}
                          >
                            <AiOutlineClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <EditProductForm
              selectedProduct={selectedProduct}
              handleInputChange={handleInputChange}
              handleArrayInputChange={handleArrayInputChange}
              handleSubmit={handleSubmit}
              handleClose={closeEditForm}
            />
          </div>
          {showNewProductForm && (
          <ProductForm
          handleClose={ closeNewProductForm}
          initialProduct={initialProductState}
            handleSubmit={handleAddProduct} // Handle the form submission to add a new product
          />
        )}
        </div>
      </div>
    </div>
  );
}
