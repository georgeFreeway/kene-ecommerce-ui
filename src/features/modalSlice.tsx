import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsOpen: (state) => {
         state.isOpen = true;
        },
        setIsClose: (state) => {
            state.isOpen = false;
           },

    }
});

export const { setIsClose, setIsOpen } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;