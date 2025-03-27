// src/services/orderService.ts

import axios from 'src/services/axios';
import { OrdersDeletedResponse } from 'src/types/adminOrder/getDeletedOrder';

import { RestoreOrderResponse } from "src/types/adminOrder/restoreOrderAucAdmin";


export const fetchDeletedOrderAuc = async (page: number, pageSize: number, search: string = '') => {
  try {
    const response = await axios.get<OrdersDeletedResponse>('client/orderAuc/deleted', {
      params: {
        page,
        pageSize,
        search,
      },
    });


    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};






export const restoreOrder = async (orderId: string): Promise<RestoreOrderResponse> => {
  const response = await axios.patch<RestoreOrderResponse>(`client/orderAuc/restore/${orderId}`);


  return response.data;
};

