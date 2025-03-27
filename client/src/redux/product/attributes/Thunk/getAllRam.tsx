import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRam } from "src/services/product_v2/attributes/getAllRam";
import { GetAllRamResponse } from "src/services/product_v2/types/attributes/getAllRam";
export const getAllRamThunk = createAsyncThunk<GetAllRamResponse>(
  "ramClient/getAllRam",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllRam();
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Lỗi không xác định");
    }
  }
);
