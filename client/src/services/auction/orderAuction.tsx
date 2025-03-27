// services/auctCheckoutService.ts
import instance from 'src/services/axios';
import { OrderResponse, OrderDataType } from 'src/types/auctions/auctCheckout';



export const createOrder = async (orderData:OrderDataType): Promise<OrderResponse> => {
  const response = await instance.post('client/orderAuc/create-order', orderData);


  return response.data;
};


