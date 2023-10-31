import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Product } from '../redux/slices/products/productSlice';
import { AiOutlineClose } from 'react-icons/ai';

type ProductFormProps = {
  initialProduct: Product;
  handleSubmit: (product: Product) => void;
  handleClose: () => void;
};

export function ProductForm({ initialProduct, handleSubmit, handleClose }: ProductFormProps) {
  const [product, setProduct] = useState(initialProduct);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target;

    // Split the input value by commas and trim each part
    const values = value.split(',').map((v) => v.trim());

    setProduct((prevProduct) => ({
      ...prevProduct,
      [key]: values,
    }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    product.id = +new Date().getTime();
    handleSubmit(product); // Pass the product object to the parent component
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form
        onSubmit={submitForm}
        className="p-4 bg-neutral-700 rounded shadow-md max-w-5xl w-full"
      >
        <span
          onClick={handleClose}
          className="absolute right-[17rem] text-red-700 hover-text-red-300 cursor-pointer text-2xl top-[rem]"
        >
          <AiOutlineClose />
        </span>
        <h1 className="text-5xl p-7 mb-10 text-left">Add product</h1>

        <div className="grid grid-cols-2 gap-4 mt">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-left p-2">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={product.name}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-left p-2">
              Image URL:
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={product.image}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-left p-2">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-left p-2">
              Price:
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleInputChange}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categories" className="block text-sm font-medium text-left p-2">
              Categories: (use comma , to create multiple)
            </label>
            <input
              type="text"
              name="categories"
              id="categories"
              value={product.categories.join(',')}
              onChange={(e) => handleArrayInputChange(e, 'categories')}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="variants" className="block text-sm font-medium text-left p-2">
              Variants: (use comma , to create multiple)
            </label>
            <input
              type="text"
              name="variants"
              id="variants"
              value={product.variants.join(',')}
              onChange={(e) => handleArrayInputChange(e, 'variants')}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sizes" className="block text-sm font-medium text-left p-2">
              Sizes: (use comma , to create multiple)
            </label>
            <input
              type="text"
              name="sizes"
              id="sizes"
              value={product.sizes.join(',')}
              onChange={(e) => handleArrayInputChange(e, 'sizes')}
              className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-[#530296] border border-transparent rounded-md hover-bg-purpleHover focus-outline-none focus-ring-2 focus-ring-offset-2 text-sm"
        >
          Save
        </button>
      </form>
    </div>
  );
}
