import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductGetOne, GetOneResponse } from "src/redux/product/admin/types";
import { getOneProduct } from "src/services/product_v2/admin";

export const getOne = createAsyncThunk<ProductGetOne, string, { rejectValue: string }>(
  "product/getone",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: GetOneResponse = await getOneProduct(id);
      if (response.success) {
        return response.product as ProductGetOne;
      } else {
        return rejectWithValue(response.msg);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống");
    }
  }
);
