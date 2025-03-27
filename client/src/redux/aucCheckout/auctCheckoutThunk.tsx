// redux/thunks/auctionThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuctionData } from 'src/services/auction/auctCheckout';
import {AuctionData } from 'src/types/auctions/auctCheckout';

interface FetchAuctionArgs {
  userId: string;
  productId: string;
}

export const fetchAuction = createAsyncThunk<AuctionData, FetchAuctionArgs>(
  'auction/fetchAuctionData',
  async ({ userId, productId }) => {
    const data = await fetchAuctionData(userId, productId);


    return data;
  }
);
