import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductVariantsByVariantPrice } from "src/services/detailProduct/getAllProductVariantsByVariantPrice";
import { GetAllProductVariantsByVariantPriceResponse } from "src/services/detailProduct/types/getAllProductVariantsByVariantPrice";

export const getAllProductVariantsByVariantPriceThunk = createAsyncThunk<
  GetAllProductVariantsByVariantPriceResponse,
  { slug: string; page: number },
  { rejectValue: string }
>(
  "productClient/getAllProductVariantsByVariantPrice",
  async ({ slug, page }, { rejectWithValue }) => {
    try {
      if (!slug) {
        return rejectWithValue("Slug là bắt buộc");
      }

      const response = await getAllProductVariantsByVariantPrice(slug, page);

      if (response.success) {
        return response;
      } else {
        return rejectWithValue(response.msg);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);
