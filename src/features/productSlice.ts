import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InitialProductStateType, ProductType } from '../customTypes/types';
import axios from 'axios';

//get all products
export const getProducts = createAsyncThunk('get/products', async (_, thunkAPI) => {
    try {
        const GET_API_URL = 'http://localhost:8000/api/sole-luxury/products';
        const response = await axios.get(GET_API_URL);
        return response.data;
    }catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//get a single product
export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async (_id: string, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/sole-luxury/products/${_id}`);
        return response.data;
    }catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//create product
//update product
//delete product

const initialState = {
    isLoading: false,
    error: false,
    products: null,
    product: {},
} as InitialProductStateType;

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
       builder.addCase(getProducts.pending, (state, _) => {
        state.isLoading = true;
        state.error = false;
       }).addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
        state.isLoading = false;
        state.products = action.payload;
       }).addCase(getProducts.rejected, (state, _) => {
        state.isLoading = false;
        state.error = true;
        state.products = null;
       }).addCase(getSingleProduct.pending, (state, _) => {
        state.isLoading = true;
        state.error = false;
       }).addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
        state.isLoading = false;
        state.product = action.payload;
       }).addCase(getSingleProduct.rejected, (state, _) => {
        state.isLoading = false;
        state.error = true;
       })
    },
});

const productReducer = productSlice.reducer;
export default productReducer;