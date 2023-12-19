import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { addCategoryThunk } from '../redux/slices/Category/CategorySlice';
import { AppDispatch } from '../redux/store';

type CategoryFormProps = {
  handleClose: () => void;
};

export default function AddCategoryForm({ handleClose }: CategoryFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCategory = {
      _id: "",
      name: categoryName,
    };

    dispatch(addCategoryThunk(newCategory)); // Dispatch the addCategoryThunk with the category data
    handleClose(); // Close the form
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
        <h1 className="text-5xl p-7 mb-10 text-left">Add Category</h1>

        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-left p-2">
            Category Name:
          </label>
          <input
            type="text"
            name="categoryName"
            id="categoryName"
            value={categoryName}
            onChange={handleInputChange}
            className="p-3 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus-ring-indigo-500 focus-border-indigo-500 text-sm"
          />
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