// src/services/auctionService.ts

import axios from 'src/services/axios';
import { AuctionDataComplete } from 'src/types/auctions/auctions';

; // Replace with your actual API URL

const auctionService = {
  completeAuction: async (productId: string, timeTrackID: string,): Promise<AuctionDataComplete> => {
    const response = await axios.post('client/auctions/complete', { productId, timeTrackID  },  );


    return response.data.auction;
  }
};

export default auctionService;
