import { ProductType } from '@/module/home/types/type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllOrder } from '../types/type';

  const initialState: AllOrder = {
    allOrder: []
  };
  

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        createNewOrder: (state, action) => {
            state.allOrder.push(action.payload)
        }
    },

});

export const { createNewOrder } = dashboardSlice.actions;


export default dashboardSlice.reducer;