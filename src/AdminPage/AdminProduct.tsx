import React, { useEffect, useState, ChangeEvent } from 'react'
import AdminSideBar from './AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProductThunk,
  deleteProductThunk,
  getProductsByPageThunk,
  getProductsThunk
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import api from '../api'
import { AiOutlineClose } from 'react-icons/ai'
import EditProductForm from './EditProductForm'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ProductForm } from './AddProductForm'
import { Product } from '../redux/slices/products/productSlice'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { getCategoriesThunk } from '../redux/slices/Category/CategorySlice'

interface Category {
  id: number
  name: string
}

export default function AdminProduct() {
  const initialProductState: Product = {
    _id: '',
    name: '',
    image: '',
    description: '',
    price: 0,
    categories: [],
    variants: [],
    sizes: []
  }
  const TABLE_HEAD = [
    'ID',
    'Name',
    'Image',
    'Description',
    'Categories',
    'Variants',
    'Sizes',
    'Price',
    'Actions',
    ''
  ]
  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
    totalPages: 0,
    totalProduct: 0,
  });
  
  const handleAddProduct = (newProduct: Product) => {
    // Call the addProduct action
    dispatch(addProductThunk(newProduct))
    // Close the new product form
    setShowNewProductForm(false)
  }

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products.items
  console.log('products',products)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedProductID, setSelectedProductID] = useState<string | null>(null)

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

  const [showNewProductForm, setShowNewProductForm] = useState(false)

  const [perPage, setPerPage] = useState(10) // Default value for products per page
  const [page, setPage] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [filteredItem, setFilteredItem] = useState<Product[]>(products);
  
  useEffect(() => {
    setFilteredItem(products)
  }, [products])
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
     if(products.length === 0) {
      fetchData();
     }
    console.log('searchName: ', searchName);
  }, [dispatch, pagination.page, pagination.perPage, searchName]);

  const handleSubmit = () => {
    closeEditForm()
  }

  const openEditForm = (product : Product) => {
    setSelectedProduct(product)
    setShowEditForm(true)
  }

  const closeEditForm = () => {
    setShowEditForm(false)
    setSelectedProduct(null)
  }

  const [showEditForm, setShowEditForm] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState(0)
  const showConfirmDialog = (productId: string) => {
    setConfirmDialogVisible(true)
    setSelectedProductID(productId)
  }
  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleCategoryChange = (category: number) => {
    setSelectedCategory(category)
  }
  const handleDeleteProduct = (id: string) => {
    console.log(id)
    dispatch(deleteProductThunk(id))
  }

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col mt-20 h-full w-full">
        <div className="text-left ">
          <label className="mr-2">Products per page:</label>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border p-2 mr-5 rounded pr-10">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <label htmlFor="categorySelect" className="ml-4">
            Filter by Category:
          </label>
          <select
            id="categorySelect"
            className="p-4 pr-[30rem] mt-5 ml-10"
            onChange={(e) => handleCategoryChange(Number(e.target.value))}>
            <option value={0}>All</option>
            {categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))}
          </select>
          <span
            onClick={() => setShowNewProductForm(true)}
            className="rounded p-2 ml-2 cursor-pointer hover:text-[#530296]">
            Add Product
          </span>
          
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="sm:rounded-lg">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      {TABLE_HEAD.map((head, index) => (
                        <th key={index} scope="col" className="px-4 py-7">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItem.map((product, index) => (
                      <tr
                        key={product._id}
                        className={
                          index % 2 === 0
                            ? 'border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600'
                            : 'border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700'
                        }>
                        <td className="whitespace-nowrap px-4 py-3 font-medium">{product._id}</td>
                        <td className="whitespace-nowrap px-4 py-3">{product.name}</td>
                        <td className="whitespace-nowrap px-4 py-3 h-2 w-2">
                          <img src={product.image} alt="" />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">{product.description}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {product.categories.map((category) => category.name).join(', ')}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {product.variants.join(', ')}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">{product.sizes.join(', ')}</td>
                        <td className="whitespace-nowrap px-4 py-3">{product.price}</td>

                        <td>
                          <span
                            className="whitespace-nowrap px-4 py-3 cursor-pointer hover:text-[#530296]"
                            onClick={() => openEditForm(product)}>
                            Edit
                          </span>
                        </td>
                        <td>
                          <ConfirmDialog
                            visible={confirmDialogVisible}
                            onHide={() => {
                              setSelectedProductID(null) // Reset selectedUserId when the dialog is hidden
                              setConfirmDialogVisible(false)
                            }}
                            message={`Are you sure you want to Delete this user?   ${selectedProductID}`}
                            header="Confirmation"
                            headerClassName="font-bold"
                            acceptLabel="Yes"
                            rejectLabel="No"
                            acceptClassName="p-button-primary  bg-green-900 ml-4 mt-8 pl-10 pr-10"
                            rejectClassName="p-button-secondary  bg-red-900 pl-10 pr-10"
                            accept={() => handleDeleteProduct(selectedProductID!!)}
                            className="bg-[#3d3d3d] p-10 rounded"
                          />
                          <span
                            className="whitespace-nowrap px-1 py-3 text-red-700 hover:text-red-300 cursor-pointer pr-10"
                            onClick={() => showConfirmDialog(product._id)}>
                            <AiOutlineClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showEditForm && selectedProduct&& (
              <EditProductForm              
              selectedProduct={selectedProduct}
                handleSubmit={handleSubmit}
                handleClose={closeEditForm}
              />
            )}
          </div>
          {showNewProductForm && (
            <ProductForm
              handleClose={() => setShowNewProductForm(false)}
              initialProduct={initialProductState}
            />
          )}
        </div>
      </div>
    </div>
  )
}
