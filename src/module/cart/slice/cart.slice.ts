import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '@/module/home/types/type';

interface CartResponse {
    productsInCart: ProductType[];
}
const initialState: CartResponse = {
    productsInCart: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductTocart: (state, action) => {
            const { id, name, } = action.payload;
            const existingItem = state.productsInCart.find(item => item.id === id);

            if (existingItem) {
                // Eğer ürün sepette varsa, sayısını arttır
                existingItem.quantity += 1;
            } else {
                // Eğer ürün sepette yoksa, yeni bir öğe olarak ekle
                state.productsInCart.push(action.payload);
            }
        }
    },

});

export const { addProductTocart } = cartSlice.actions;


export default cartSlice.reducer;