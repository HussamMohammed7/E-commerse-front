import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminSideBar from './AdminSideBar';
import api from '../api';
import { AppDispatch, RootState } from '../redux/store';
import { AiOutlineClose } from 'react-icons/ai';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { getOrdersThunk } from '../redux/slices/orderSlice';

interface Order {
  id: number;
  productId: number;
  userId: number;
  purchasedAt: string;
}

export default function AdminOrders() {
  const TABLE_HEAD = ["ID", "User ID","Products" ,"Purchased At","status" ,"Actions", ""];

  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const order = state.order;
  console.log(order);

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const handleConfirm = (option: string) => {
    if (option === 'confirm') {
      console.log('Confirmed');
    } else {
      console.log('Canceled');
    }
    setConfirmDialogVisible(false);
  };

  const showConfirmDialog = (orderId: number) => {
    setConfirmDialogVisible(true);
    setSelectedOrderId(orderId);
  };

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const [open, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
    totalPages: 0,
    totalProduct: 0,
  });


  useEffect(() => {
    const fetchData = async () => {
      dispatch(getOrdersThunk(pagination))
    }
    fetchData();

  }, [dispatch]);
  const openForm = (order: Order) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedOrder) {
      setSelectedOrder({
        ...selectedOrder,
        [name]: value,
      });
    }
  };

 

  const closeForm = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="flex flex-col mt-20 h-full w-full">

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
                    {order.items.map((orders, index) => (
                      <tr
                        key={orders._id}
                        className={
                          index % 2 === 0
                            ? "border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600"
                            : "border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                        }
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-medium">{orders._id}</td>
                        <td className="whitespace-nowrap px-4 py-3">{orders.userId}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <select>
                            {orders.products.map((product) => (
                              <option key={product.product} value={product.product}>
                                {product.product}, {product.quantity}
                              </option>
                            ))}

                          </select>
                          </td>
                        <td className="whitespace-nowrap px-4 py-3">{orders.purchasedAt}</td>
                        <td className="whitespace-nowrap px-4 py-3">{orders.status}</td>

                        <td>
                          {/* <ConfirmDialog
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
                          /> */}
                          {/* <span
                            className="whitespace-nowrap px-1 py-3 text-red-700 hover:text-red-300 cursor-pointer pr-10"
                            onClick={() => showConfirmDialog(category._id)}
                          >
                            <AiOutlineClose />
                          </span> */}
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
      
    </div>
  );
}
