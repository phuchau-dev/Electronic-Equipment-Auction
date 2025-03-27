import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuctionTime } from "src/services/detailProductAuction/checkAuctionTime";
import { CheckAuctionTimeResponse } from "src/services/detailProductAuction/types/checkAuctionTime";

export const checkAuctionTimeThunk = createAsyncThunk<
  CheckAuctionTimeResponse,
  { slug: string },
  { rejectValue: string }
>(
  "auctionClient/checkAuctionTime",
  async ({ slug }, { rejectWithValue }) => {
    try {
      if (!slug) {
        return rejectWithValue("Slug là bắt buộc");
      }

      const response = await checkAuctionTime(slug);

      if (response.status === "success") {
        return response;
      } else {
        return rejectWithValue(response.message || "Lỗi không xác định");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);
