import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import cartReducer from './slices/products/cartSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, 
    user:userReducer,
    order:orderReducer,
    
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
