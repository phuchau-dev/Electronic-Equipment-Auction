// thunks/biddingThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import biddingService from 'src/services/customeSeDelBid/deleteBid';
import { DeleteBiddingRequest, AuctionResult } from 'src/types/deleteBid/deleteBid';

// Define the thunk for deleting a bidding
export const deleteBiddingThunk = createAsyncThunk<AuctionResult, DeleteBiddingRequest>(
  'bidding/deleteBidding',
  async (biddingData, { rejectWithValue }) => {
    try {
      const result = await biddingService.deleteBidding(biddingData);


      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
