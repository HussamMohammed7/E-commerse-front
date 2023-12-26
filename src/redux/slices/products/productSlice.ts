import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { Category } from '../Category/CategorySlice'
import { AxiosError } from 'axios'

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  price: number
  categories: Category[]
  variants: string[]
  sizes: string[]
  [key: string]: any
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
export const getProductOneThunk = createAsyncThunk(
  'product/getProductOne',
  // Declare the type your function argument here:
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/${productId}`)
      // Inferred return type: Promise<MyData>
      console.log('res.data from getProductOne', res.data)

      return res.data.productbyId
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error)
      }
    }
  }
)
export const getProductsByPageThunk = createAsyncThunk(
  'productsByPage/get',
  async ({
    perPage,
    page,
    totalProduct,
    totalPages,
    searchName,
    sort,
    sortPrice,
    category,

  }: {
    perPage: number
    page: number
    totalProduct: number
    totalPages: number
    searchName?:string 
    sort?: 'asc' | 'desc'
    sortPrice ?: 'asc_price' | 'desc_price'
    category?: string


  }) => {
    try {
      const res = await api.get(`/api/products?page=${page}&perPage=${perPage}&searchName=${searchName || ''}&sort=${sort || ''}&sortPrice=${sortPrice || '' }&category=${category || ''}`);

      console.log('res.data from getProductsThunk', res.data)

      return {
        items: res.data.items,
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
export const updateProductThunk = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updatedProduct }: { productId: string; updatedProduct: Product }, { dispatch, rejectWithValue }) => {
    try {
      // Make your API call to update the product
      const response = await api.put(`/api/products/${productId}`, updatedProduct);

      // Handle the response as needed
      const updatedProductFromServer = response.data; // Adjust this based on your API response

      // Optionally, you can dispatch another action here to update the state
      // dispatch(productUpdated(updatedProductFromServer));

      return updatedProductFromServer;
    } catch (error) {
      // You can handle errors here and reject with a value
      return rejectWithValue(error);
    }
  }
);
export const getProductsThunk = createAsyncThunk(
  'products/get',
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
      const res = await api.get('/api/products')

      console.log('res.data from getProductsThunk', res.data)

      return {
        items: res.data.items,
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
export const deleteProductThunk = createAsyncThunk('products/delete', async (productId: string) => {
  try {
    console.log('👀 ', productId)

    await api.delete(`/api/products/${productId}`)
    return productId
  } catch (error) {
    console.log('👀 ', error)
  }
})
export const addProductThunk = createAsyncThunk(
  'products/addProduct',
  async (newProduct: Product) => {
    try {
      // Assuming you have an API endpoint to add a product
      const res = await api.post('/api/products', newProduct)

      // Return the newly added product from the response
      return res.data.product
    } catch (error) {
      console.error('addProductThunk error:', error)
      throw error // Rethrow the error to handle it in the component or dispatch additional actions
    }
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.isLoading = false // Set isLoading to false when fetching is complete
      return state
    })
  

    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      const deleteId = action.payload
      const updatedItems = state.items.filter((item) => item._id !== deleteId)
      state.items = updatedItems
      return state
    })
    builder.addCase(getProductOneThunk.fulfilled, (state, action) => {
      const fetchedProduct = action.payload
      // Check if the fetched product is already in the state
      const existingProductIndex = state.items.findIndex((p) => p._id === fetchedProduct._id)

      if (existingProductIndex !== -1) {
        // If the product is already in the state, replace it
        state.items[existingProductIndex] = fetchedProduct
      } else {
        // If the product is not in the state, add it
        state.items.push(fetchedProduct)
      }

      state.isLoading = false // Set isLoading to false when fetching is complete
    })
    builder.addCase(getProductsByPageThunk.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.isLoading = false // Set isLoading to false when fetching is complete
      return state
    })
    builder.addCase(updateProductThunk.pending, (state) => {
      state.isLoading = true; // Set isLoading to true when the update is pending
    });

    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      const updatedProduct = action.payload.product;
      console.log('updatedProduct', updatedProduct);

      // Update the product in the state
      const updatedItems = state.items.map((product) => {
        if (product._id === updatedProduct._id) {
          return updatedProduct;
        }
        return product;
      })
      state.items = updatedItems;
      return state 
    });

    builder.addCase(updateProductThunk.rejected, (state, action) => {
      state.error = action.payload as string; // Set the error if the update is rejected
      state.isLoading = false; // Set isLoading to false when the update is rejected
    });
    
  }
})
export const {} = productsSlice.actions

export default productsSlice.reducer
