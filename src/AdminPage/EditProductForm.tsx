import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Product, getProductOneThunk, updateProductThunk } from '../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import Select, { MultiValue , StylesConfig  } from 'react-select'
import chroma from 'chroma-js';



interface EditProductProps {
  selectedProduct: Product
  handleSubmit: () => void
  handleClose: () => void
}

export default function EditProductForm({
  selectedProduct,
  handleSubmit,
  handleClose
}: EditProductProps) {
  const [product, setProduct] = useState<Product>(selectedProduct)
  const dispatch = useDispatch<AppDispatch>()
  const defaultOptions = product.categories.map((category) => ({
    value: category._id,
    label: category.name
  }))
  console.log('default', defaultOptions)

  const [selectedOption, setSelectedOption] =useState<MultiValue<{ value: string; label: string }>>(defaultOptions)
  // const categoriesIds = selectedOption.map((category) => category.value)

useEffect(() => {
    const selectedCategories = selectedOption.map((category) => ({
      _id: category.value,
      name: category.label
    }))
    setProduct((prevProduct) => ({
      ...prevProduct,
      categories: selectedCategories
    }))
  }, [selectedOption])

  
  const categories = useSelector((state: RootState) => state.category.items)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }))
  }

  const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>, key: 'variants' | 'sizes', index: number) => {
    const { value } = e.target

    const values = product[key].map((str, i: number) => {
      if (i === index) {
        return value.trim()
      }
      return str
    })
    setProduct((prevProduct) => ({
      ...prevProduct,
      [key]: values
    }))
  }
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch the updateProductThunk with the updated product
      console.log("product categories",product.categories)
      await dispatch(updateProductThunk({ productId: product._id, updatedProduct: product }));

      // Call the existing handleSubmit function
      handleSubmit();
    } catch (error) {
      // Handle errors if necessary
      console.error('Error updating product:', error);
    }
  };


  const options = categories.map((category) => ({
    value: category._id,
    label: category.name
  }))
  console.log(options)

  console.log(product)
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${
        product ? '' : 'hidden'
      }`}>
      <div className="bg-neutral-700 p-4 rounded shadow-md max-w-4xl	 w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleFormSubmit(e)
          }}>
          <span
            onClick={handleClose}
            className="absolute right-[21rem] text-red-700 hover-text-red-300 cursor-pointer text-2xl top-[rem]">
            <AiOutlineClose />
          </span>
          <h1 className="text-3xl p-4 mb-4 text-left">Edit Product</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="productName" className="block text text-sm font-medium text-left p-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-left p-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-left p-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-left p-2">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categories" className="block text-sm font-medium text-left p-2">
                Categories
              </label>
              <Select
                value={selectedOption}
                isMulti
                defaultValue={defaultOptions}
                onChange={setSelectedOption}
                options={options}
                className=""
              />
            </div>
            <div className="mb-4">
              <label htmlFor="variants" className="block text-sm font-medium text-left p-2">
                Variants
              </label>
              {product.variants.map((variant, index) => (
                <input
                  key={index}
                  type="text"
                  name="variants"
                  value={variant}
                  onChange={(e) => handleArrayInputChange(e, 'variants', index)}
                  className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
                />
              ))}
            </div>
            <div className="mb-4">
              <label htmlFor="sizes" className="block text-sm font-medium text-left p-2">
                Sizes
              </label>
              {product.sizes.map((size, index) => (
                <input
                  key={index}
                  type="text"
                  name="sizes"
                  value={size}
                  onChange={(e) => handleArrayInputChange(e, 'sizes', index)}
                  className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#530296] border border-transparent rounded-md hover-bg-purpleHover focus-outline-none focus-ring-2 focus-ring-offset-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
