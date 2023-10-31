

import { createSlice } from '@reduxjs/toolkit';

export type Order = {
  id: number;
  productId: number;
  userId: number;
  purchasedAt: string;
};

export type OrderState = {
  items: Order[];
  error: null | string;
  isLoading: boolean;
};

const initialState: OrderState = {
  items: [],
  error: null,
  isLoading: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true;
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    addOrder: (state, action: { payload: { order: Order } }) => {
      // Let's append the new order to the beginning of the array
      state.items = [action.payload.order, ...state.items];
    },
    removeOrder: (state, action: { payload: { orderId: number } }) => {
      const filteredItems = state.items.filter((order) => order.id !== action.payload.orderId);
      state.items = filteredItems;
    },
    updateOrder: (state, action) => {
      const { orderId, updatedOrder } = action.payload;
      const orderToUpdate = state.items.find((order) => order.id === orderId);
      if (orderToUpdate) {
        // Update the order details with the provided data
        Object.assign(orderToUpdate, updatedOrder);
      }
    },
  },
});

export const { removeOrder, addOrder, ordersRequest, ordersSuccess, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;
