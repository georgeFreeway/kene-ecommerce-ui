import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType, InitialCartState, AddressType, PaymentMethod } from '../customTypes/types';

const itemsFromLocalStorage: ProductType[] = JSON.parse(`${localStorage.getItem('cartItems')}`) || [];
const initialState = {
    cartitems: itemsFromLocalStorage,
    amount: 0,
    total: 0,
} as InitialCartState;

const cartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<ProductType>){
            const alreadyExists = state.cartitems.find((item) => {
                return item._id === action.payload._id;
            });

            if(alreadyExists){
                console.log('already exists!');
                return;
            }else{
                state.cartitems.push(action.payload);
                localStorage.setItem('cartItems', JSON.stringify(state.cartitems));
            }
        }, 
        clearState: (state) => {
            //mutate state directly
            state.cartitems = [];
            localStorage.removeItem('cartItems');
        },
        removeItem: (state, action: PayloadAction<ProductType>) => {
            const unwantedItem = action.payload;
            state.cartitems = state.cartitems.filter((item) => {
                return item._id !== unwantedItem._id;
            });
        },
        increaseItem: (state, action: PayloadAction<ProductType>) => {
            const cartItem = state.cartitems.find((item) => {
                return item._id === action.payload._id;
            });
            cartItem!.rating = cartItem!.rating + 1;
        },
        decreaseItem: (state, action: PayloadAction<ProductType>) => {
            const cartItem = state.cartitems.find((item) => {
                return item._id === action.payload._id;
            });
            cartItem!.rating = cartItem!.rating - 1;
        },
        calculate: (state) => {
            let amount = 0;
            let total = 0;
            state.cartitems && state.cartitems.forEach((item) => {
                amount += item.rating;
                total += item.rating * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
        saveAddress: (_, action: PayloadAction<AddressType>) => {
            const address = action.payload;
            localStorage.setItem('address', JSON.stringify(address));
        },
        paymentMethod: (_, action: PayloadAction<PaymentMethod>) => {
            const paymentMethod = action.payload;
            localStorage.setItem('paymentmethod', JSON.stringify(paymentMethod));
        }
    }
});

const cartReducer = cartSlice.reducer;
export const { addToCart, increaseItem, decreaseItem, removeItem, clearState, calculate, saveAddress, paymentMethod } = cartSlice.actions;
export default cartReducer;