import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '@/module/home/types/type';

interface CartResponse {
    productsInCart: ProductType[];
}
const initialState: CartResponse = {
    productsInCart: []
};

export const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addProductTocart:(state,action)=>{
            state.productsInCart.push(action.payload)
        }
    },

});

export const { addProductTocart } = cartSlice.actions;


export default cartSlice.reducer;