// thunks/biddingThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {deleteOrderSoftMail} from 'src/services/statusOrders/statusOrder';
import { DeleteOrderItearacRequest, SoftDeleteOrderData } from 'src/types/iterationOrder/softDeleteForUser';

// Define the thunk for deleting a bidding
export const deleteOrderThunk = createAsyncThunk<SoftDeleteOrderData, DeleteOrderItearacRequest>(
  'orderIterac/deleteOrderThunk',
  async (biddingData, { rejectWithValue }) => {
    try {
      const result = await deleteOrderSoftMail(biddingData);


      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);