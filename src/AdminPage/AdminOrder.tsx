import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeOrder, addOrder, ordersRequest, ordersSuccess, updateOrder } from '../redux/slices/orderSlice';
import AdminSideBar from './AdminSideBar';
import api from '../api';
import { RootState } from '../redux/store';
import { AiOutlineClose } from 'react-icons/ai';
import { ConfirmDialog } from 'primereact/confirmdialog';

interface Order {
  id: number;
  productId: number;
  userId: number;
  purchasedAt: string;
}

export default function AdminOrders() {
  const TABLE_HEAD = ["ID", "Product ID", "User ID", "Purchased At", "Actions", ""];

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const order = state.order;

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

  const openForm = (order: Order) => {
    setIsOpen(true);
    setSelectedOrder(order);
  };

  const handleGetOrders = async () => {
    dispatch(ordersRequest());

    const res = await api.get('/mock/e-commerce/orders.json');
    dispatch(ordersSuccess(res.data));
  }

  useEffect(() => {
    handleGetOrders();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedOrder) {
      setSelectedOrder({
        ...selectedOrder,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (selectedOrder) {
      dispatch(updateOrder({ orderId: selectedOrder.id, updatedOrder: selectedOrder }));
      closeForm();
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
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="sm:rounded-lg">
                <div className="table-container">
                  <div className="table-header ">
                    {TABLE_HEAD.map((head, index) => (
                      <div key={index} className="table-cell p-10">{head}</div>
                    ))}
                  </div>
                  <div className="table-body ">
                    {order.items.map((order, index) => (
                      <div
                        key={order.id}
                        className={`table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}
                      >
                        <div className="table-cell p-10">{order.id}</div>
                        <div className="table-cell p-10">{order.productId}</div>
                        <div className="table-cell p-10">{order.userId}</div>
                        <div className="table-cell p-10">{order.purchasedAt}</div>
                        <div className="table-cell p-10 cursor-pointer" onClick={() => openForm(order)}>
                          Edit
                        </div>
                        <div className="table-cell">
                          <ConfirmDialog
                            visible={confirmDialogVisible}
                            onHide={() => setConfirmDialogVisible(false)}
                            message="Are you sure you want to Delete this order?"
                            header="Confirmation"
                            headerClassName="font-bold"
                            acceptLabel="Yes"
                            rejectLabel="No"
                            acceptClassName="p-button-primary bg-green-900 ml-4 mt-8 pl-10 pr-10"
                            rejectClassName="p-button-secondary bg-red-900 pl-10 pr-10"
                            accept={() => dispatch(removeOrder({ orderId: selectedOrderId || 0 }))}
                            className="bg-[#3d3d3d] p-10 rounded"
                          />
                          <div className="delete-button" onClick={() => showConfirmDialog(order.id)}>
                            <AiOutlineClose />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}
