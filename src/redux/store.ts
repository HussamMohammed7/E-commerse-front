import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import cartReducer from './slices/products/cartSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import categoryReducer from './slices//Category/CategorySlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, 
    user:userReducer,
    order:orderReducer,
    category: categoryReducer,
    
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
