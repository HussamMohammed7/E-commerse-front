import { createSlice } from '@reduxjs/toolkit';
import { Product } from './productSlice';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.product._id === product._id);

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        state.items.push({ product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload.productId;
      state.items = state.items.filter((item) => item.product._id !== productId);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload.productId;
      const item = state.items.find((item) => item.product._id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload.productId;
      const item = state.items.find((item) => item.product._id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
