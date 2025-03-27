// src/redux/slices/timeTrackSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPriceRand, softDelPriceRandAdminThunk } from 'src/redux/adminPriceRand/list/listPriceRandThunk';
import {PriceRange  } from 'src/types/adminPriceRand/listPricrRand';
import {PriceRangeSoftDel  } from 'src/types/adminPriceRand/softDelPriceRand';
interface PriceRandState {
  listPriceRand: PriceRange[];
  softDelPriceRand: PriceRangeSoftDel[];
  delPriceRand: PriceRangeSoftDel|null
  totalPages: number;
  currentPage: number;

  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PriceRandState = {
    listPriceRand: [],
    softDelPriceRand:[],
    delPriceRand: null,
  totalPages: 1,
  currentPage: 1,

  loading: false,
  error: null,
  successMessage: null
};

const priceRadnListSlice = createSlice({
  name: 'timeTracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceRand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriceRand.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.listPriceRand = action.payload.data.priceRanges;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;

      })
      .addCase(fetchPriceRand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(softDelPriceRandAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(softDelPriceRandAdminThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.delPriceRand = action.payload;

         // Thay đ��i kiểu đúng,
        // Kiểm tra softDelorder trước khi gọi filter
        // state.shippingStatus = state.shippingStatus.filter((order) => order._id !== action.payload._id);

        if (Array.isArray(state.listPriceRand)) {
          state.softDelPriceRand = [];
          // Remove the deleted time track from the timeTracks state
          state.listPriceRand = state.listPriceRand.filter(
            (rand) => rand._id !== action.payload._id // Filter out the deleted item
          );
        }

      state.softDelPriceRand.push(action.payload);
      state.successMessage = "Xóa đơn hàng thành công";
        // state.successMessage = "Xóa đơn hàng thành công";
      })
      .addCase(softDelPriceRandAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export default priceRadnListSlice.reducer;