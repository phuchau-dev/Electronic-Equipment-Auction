
import { Service } from 'src/types/bidding/bidding';
import instance from 'src/services/axios';
export const fetchServices = async (): Promise<Service[]> => {
  const response = await instance.get('/services');
  return response.data.data;
};