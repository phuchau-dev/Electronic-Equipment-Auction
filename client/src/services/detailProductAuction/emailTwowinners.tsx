import instance from "src/services/axios";
import { EmailTwowinnersResponse } from "src/services/detailProductAuction/types/emailTwowinners";

export const emailTwowinners = async (
  slug: string
): Promise<EmailTwowinnersResponse> => {
  try {
    const response = await instance.get<EmailTwowinnersResponse>(
      `/client/product-detail-auction/email-two-winner/${slug}`
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi email cho 2 người đấu giá cao nhất:', error);
    return {
      code: "SERVER_ERROR",
      status: "error",
      message: "Lỗi khi gửi email cho 2 người đấu giá cao nhất.",
      topBidders: [],
    };
  }
};
