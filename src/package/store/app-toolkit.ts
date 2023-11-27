import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from "@/module/cart/slice/cart.slice"
import dashboardReducer from "@/module/admin/slices/dashboard.slice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        dashboard: dashboardReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;