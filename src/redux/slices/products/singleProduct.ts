import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export type Product = {
    id: number
    name: string
    image: string
    description: string
    price: number
    categories: number[]
    variants: string[]
    sizes: string[]
  }


  export type ProductState = {
    item: Product | null
    error: null | string
    isLoading: boolean
  }
  
  const initialState: ProductState = {
    item: null,
    error: null,
    isLoading: false
  }

  const singleProductSlice = createSlice ({
    name : "productDetails",
    initialState,
    reducers : {
        getCompanyDetails : (state, action :PayloadAction<Product>) => {
            state.item = action.payload;
            state.isLoading = false;
        },
        handleError : (state, action :PayloadAction<string>) => {
            state.error = action.payload;
        },


    },
})
const singleProductReducer = singleProductSlice.reducer;
export default  singleProductReducer;
export const singleProductAction = singleProductSlice.actions;