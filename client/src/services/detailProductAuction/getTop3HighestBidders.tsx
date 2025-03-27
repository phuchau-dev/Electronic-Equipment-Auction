import instance from "src/services/axios";
import { GetTop3HighestBidderResponse } from "src/services/detailProductAuction/types/getTop3HighestBidders";
export const getTop3HighestBidders = async (
  slug: string
): Promise<GetTop3HighestBidderResponse> => {
  try {
    const response = await instance.get<GetTop3HighestBidderResponse>(
      `/client/product-detail-auction/top-3-highest-bidder/${slug}`
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách 3 người đấu giá cao nhất:', error);
    return {
      code: "SERVER_ERROR",
      status: "error",
      message: "Lỗi khi lấy danh sách 3 người đấu giá cao nhất.",
      topBidders: [],
    };
  }
};
