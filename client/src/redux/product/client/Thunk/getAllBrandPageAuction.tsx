import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBrandPageAuction } from "src/services/product_v2/client";
import { GetAllBrandPageAuctionResponse } from "src/redux/product/client/types/getAllBrandPageAuction";

export const getAllBrandPageAuctionThunk = createAsyncThunk<
  GetAllBrandPageAuctionResponse,
  void,
  { rejectValue: string }
>("brandClient/getAllBrandPageAuction", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllBrandPageAuction();
    if (response.success) {
      return response;
    } else {
      return rejectWithValue(response.msg);
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Lỗi không xác định");
  }
});
