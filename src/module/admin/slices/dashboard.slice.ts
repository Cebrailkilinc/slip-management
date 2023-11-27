import { ProductType } from '@/module/home/types/type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface OrderResponse {
    orderNumber: number | null;
    orderDate: Date | null;
    total: number | null;
    products: ProductType[];
  }
  
  interface AllOrder {
    allOrder: OrderResponse[];
  }
  
  const initialState: AllOrder = {
    allOrder: [
      {
        orderNumber: null,
        orderDate: null,
        total: null,
        products: []
      }
      // Buraya başka OrderResponse objeleri ekleyebilirsiniz...
    ]
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