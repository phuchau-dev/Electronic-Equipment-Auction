import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuctionWinsByUser } from "src/services/AuctionWinsByUser/getAuctionWinsByUser";
import { AuctionWinsResponse } from "src/services/AuctionWinsByUser/types/getAuctionWinsByUser";

export const getAuctionWinsByUserThunk = createAsyncThunk<
  AuctionWinsResponse,
  { page: number },
  { rejectValue: { code: string; msg: string } }
>(
  "auctionClient/getAuctionWins",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await getAuctionWinsByUser(page);
      if (response.code === "THANH_CONG") {
        return response;
      } else {
        return rejectWithValue({ code: response.code, msg: response.msg });
      }
    } catch (error: any) {
      return rejectWithValue({ code: error.code || "LOI_KHONG_XAC_DINH", msg: error.msg || "Lỗi không xác định" });
    }
  }
);
