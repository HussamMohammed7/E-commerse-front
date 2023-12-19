import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk, deleteCategoryThunk } from '../redux/slices/Category/CategorySlice';
import { AiOutlineClose } from 'react-icons/ai';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Category } from '../redux/slices/Category/CategorySlice';
import { AppDispatch, RootState } from '../redux/store';
import AddCategoryForm from './AddCategoryForm';

export default function AdminCategory() {
  const TABLE_HEAD = [
    "ID",
    "Name",
    "Actions",
  ];
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state : RootState) => state.category.items);



  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleDeleteCategory = (categoryId: string) => {
    dispatch(deleteCategoryThunk(categoryId));
    setConfirmDialogVisible(false);
  };

  const showConfirmDialog = (categoryId: string) => {
    setConfirmDialogVisible(true);
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col mt-20 h-full w-full">
        <button type="button" className=" mt-10"
            onClick={() => setShowNewProductForm(true)}

        >
            Add category
        </button>
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
                    {categories.map((category, index) => (
                      <tr
                        key={category._id}
                        className={
                          index % 2 === 0
                            ? "border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
                            : "border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                        }
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-medium">{category._id}</td>
                        <td className="whitespace-nowrap px-4 py-3">{category.name}</td>
                        <td>
                          <ConfirmDialog
                            visible={confirmDialogVisible}
                            onHide={() => {
                              setSelectedCategoryId(null);
                              setConfirmDialogVisible(false);
                            }}
                            message={`Are you sure you want to Delete this category? ${selectedCategoryId}`}
                            header="Confirmation"
                            headerClassName="font-bold"
                            acceptLabel="Yes"
                            rejectLabel="No"
                            acceptClassName="p-button-primary bg-green-900 ml-4 mt-8 pl-10 pr-10"
                            rejectClassName="p-button-secondary bg-red-900 pl-10 pr-10"
                            accept={() => handleDeleteCategory(selectedCategoryId!!)}
                            className="bg-[#3d3d3d] p-10 rounded"
                          />
                          <span
                            className="whitespace-nowrap px-1 py-3 text-red-700 hover:text-red-300 cursor-pointer pr-10"
                            onClick={() => showConfirmDialog(category._id)}
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
          </div>
        </div>
      </div>
      {showNewProductForm && (
            <AddCategoryForm
              handleClose={() => setShowNewProductForm(false)}
            />
          )}
    </div>
  );
}
