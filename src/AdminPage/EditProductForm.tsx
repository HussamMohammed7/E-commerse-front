import React, { ChangeEvent, FormEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  categories: number[];
  variants: string[];
  sizes: string[];
};

interface EditProductProps {
  selectedProduct: Product | null;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleArrayInputChange: (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: 'categories' | 'variants' | 'sizes',
    index: number
  ) => void;
  handleSubmit: () => void;
  handleClose: () => void;
}

export default function EditProductForm({
  selectedProduct,
  handleInputChange,
  handleArrayInputChange,
  handleSubmit,
  handleClose,
}: EditProductProps) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${selectedProduct ? '' : 'hidden'}`}>
      <div className="bg-neutral-700 p-4 rounded shadow-md max-w-4xl	 w-full">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <span
            onClick={handleClose}
            className="absolute right-[21rem] text-red-700 hover-text-red-300 cursor-pointer text-2xl top-[rem]"
            >
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
                value={selectedProduct?.name || ''}
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
                value={selectedProduct?.description || ''}
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
                value={selectedProduct?.price || ''}
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
                value={selectedProduct?.image || ''}
                onChange={handleInputChange}
                className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categories" className="block text-sm font-medium text-left p-2">
                Categories
              </label>
              {selectedProduct?.categories.map((category, index) => (
                <input
                  key={index}
                  type="number"
                  name="categories"
                  value={category}
                  onChange={(e) => handleArrayInputChange(e, 'categories', index)}
                  className="p-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
                />
              ))}
            </div>
            <div className="mb-4">
              <label htmlFor="variants" className="block text-sm font-medium text-left p-2">
                Variants
              </label>
              {selectedProduct?.variants.map((variant, index) => (
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
              {selectedProduct?.sizes.map((size, index) => (
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
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#530296] border border-transparent rounded-md hover-bg-purpleHover focus-outline-none focus-ring-2 focus-ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
