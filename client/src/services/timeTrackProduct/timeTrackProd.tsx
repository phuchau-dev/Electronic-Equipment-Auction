// services/timeTrackProduct/timeTrackProd.ts
import instance from 'src/services/axios';
import { ProductResponse } from 'src/types/timeTrackProduct/timeTrackProduct';

export const getProductByTimeTrack = async (productId: string): Promise<ProductResponse> => {
    const response = await instance.get(`/producuByTimeTrack/${productId}`);

      return response.data;
  };




