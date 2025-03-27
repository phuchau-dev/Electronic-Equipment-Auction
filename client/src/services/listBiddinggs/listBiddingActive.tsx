import instance from "src/services/axios";

import {BiddingResponseActive} from "src/types/listBiddings/listBidActive";
export const listBiidingActive = async (pageActive: number, pageSizeActive: number, searchActive: string = ''): Promise<BiddingResponseActive> => {
    try {
      const response = await instance.get<BiddingResponseActive>('/client/bidding/bidAllActive', {
          params: {
            pageActive,
            pageSizeActive,
            searchActive,
          },

      });
      return response.data
    } catch (error) {
      console.error("Error fetching inbounds list:", error);
      throw error;
    }
  };
