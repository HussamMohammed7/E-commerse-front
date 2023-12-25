

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './products/productSlice';
import api from '../../api';
import { CartItem } from './products/cartSlice';

export type Order = {
  _id: string;
  products: {
    product: string;
    quantity: number;
  }[];

  userId: string;
  purchasedAt: string;
  status : "under process"| "shopped"|"finished"| "canceled"
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

export const getOrdersThunk = createAsyncThunk(
  'orders/get',
  async ({
    perPage,
    page,
    totalProduct,
    totalPages
  }: {
    perPage: number
    page: number
    totalProduct: number
    totalPages: number
  }) => {
    try {
      const res = await api.get('http://localhost:5050/api/orders')

      console.log('res.data from getProductsThunk', res.data)

      return {
        orders: res.data.orders,
        page: res.data.page,
        perPage: res.data.perPage,
        totalProduct: res.data.totalProduct,
        totalPages: res.data.totalPages
      }
    } catch (error) {
      console.error('getProductsThunk error:', error)
      throw error
    }
  }
)
export const addOrderThunk = createAsyncThunk(
  'orders/add',
  async (newOrder: { userId: string; products: { product: string; price: number; quantity: number }[] }) => {
    try {
      // Assuming you have an API endpoint to add an order
      console.log(newOrder)
      const res = await api.post('api/orders', newOrder);

      // Return the newly added order from the response
      return res.data.order;
    } catch (error) {
      console.error('addOrderThunk error:', error);
      throw error; // Rethrow the error to handle it in the component or dispatch additional actions
    }
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   
  }, extraReducers: (builder) => {
    builder
      .addCase(addOrderThunk.fulfilled, (state, action) => {
      
        state.items = [...state.items, action.payload];
        state.isLoading = false;
        return state
      })
      .addCase(addOrderThunk.pending, (state) => {
        state.isLoading = true;
      
      })
      .addCase(addOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        return state

      });
      
      builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.items = action.payload.orders
        state.isLoading = false // Set isLoading to false when fetching is complete
        return state
      })

  },
});

export const { } = orderSlice.actions;

export default orderSlice.reducer;
