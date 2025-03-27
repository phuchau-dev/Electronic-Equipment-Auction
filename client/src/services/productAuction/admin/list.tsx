import instance from "src/services/axios";
import { LimitProductAuctionResponse } from "src/services/productAuction/types/listProductAuction";

export const listProductAuction = async (
  page: number,
  search?: string
): Promise<LimitProductAuctionResponse> => {
  try {
    const queryParams = new URLSearchParams({ page: page.toString() });

    if (search) {
      queryParams.append("search", search);
    }

    const response = await instance.get<LimitProductAuctionResponse>(
      `/admin/productAuction/list/?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Ko thấy sản phẩm");
  }
};
