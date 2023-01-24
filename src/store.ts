import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import modalReducer from './features/modalSlice';
import authReducer from './features/authSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        modal: modalReducer,
        auth: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;