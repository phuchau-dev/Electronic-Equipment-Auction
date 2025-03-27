import instance from 'src/services/axios';
import { AuctionCanceledResponse } from 'src/services/AuctionWinsByUser/types/canceledAuction';

export const canceledAuction = async (auctionWinnerId: string): Promise<AuctionCanceledResponse> => {
  try {
    const response = await instance.post<AuctionCanceledResponse>('/client/auction/canceled-auction', {
      auctionWinnerId
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { code, msg } = error.response.data;
      throw { code, msg };
    } else if (error.request) {
      throw { code: 'KHONG_PHAN_HOI_TU_SERVER', msg: 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.' };
    } else {
      throw { code: 'LOI_CHUNG', msg: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' };
    }
  }
};
