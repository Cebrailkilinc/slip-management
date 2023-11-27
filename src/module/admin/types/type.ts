import { ProductType } from "@/module/home/types/type";


export interface OrderResponse {   
    orderNumber: number;
    orderDate: string
    total: number;
    products: ProductType[];
}

export interface AllOrder {
    allOrder: OrderResponse[];
}