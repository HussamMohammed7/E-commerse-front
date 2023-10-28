import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import singleProductReducer from './slices/products/singleProduct'
import cartReducer from './slices/products/cartSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct : singleProductReducer,
    cart: cartReducer, 
    user:userReducer,
    
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
