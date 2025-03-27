import instance from "src/services/axios";
import { LimitPageAuctionProductResponse } from "src/services/product_v2/client/types/listPageAuction";
export const resetFilter = async (): Promise<LimitPageAuctionProductResponse> => {
  try {
    const response = await instance.get<LimitPageAuctionProductResponse>('/client/product/reset-filter');
    return response.data;
  } catch (error) {
    throw new Error("lỗi");
  }
};
