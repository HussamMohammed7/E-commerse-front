import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { AxiosError } from 'axios'

export type Product = {
  _id: number
  name: string
  image: string
  description: string
  price: number
  categories: number[]
  variants: string[]
  sizes: string[]
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product._id !== action.payload.productId)
      state.items = filteredItems
    },
    updateProduct: (state, action) => {
      const { productId, updatedProduct } = action.payload;
      const productToUpdate = state.items.find((product) => product._id === productId);
      if (productToUpdate) {
        // Update the product details with the provided data
        Object.assign(productToUpdate, updatedProduct);
      }
    },

  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess,updateProduct } = userSlice.actions

export default userSlice.reducer
