/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import bookReducer from './slices/bookSlice';
import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    books: bookReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});

export default store;