import instance from 'src/services/axios';
import { CanceledAuctionTemporaryResponse } from 'src/services/AuctionWinsByUser/types/canceledAuctionTemporary';

export const canceledAuctionTemporary = async (auctionWinnerId: string): Promise<CanceledAuctionTemporaryResponse> => {
  try {
    const response = await instance.post<CanceledAuctionTemporaryResponse>('/client/auction/canceled-auction-temporary', {
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
