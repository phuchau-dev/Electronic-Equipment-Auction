import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectBrandThunk } from 'src/redux/product/admin/Thunk';
import { SelectBrandResponse, Brand } from 'src/services/product_v2/admin/types/select/brand';

interface BrandState {
  brands: Brand[];
  status: 'idle' | 'loading' | 'success' | 'fail';
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  status: 'idle',
  error: null,
};

const selectBrandSlice = createSlice({
  name: 'brands/select',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectBrandThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(selectBrandThunk.fulfilled, (state, action: PayloadAction<SelectBrandResponse>) => {
        state.status = 'success';
        state.brands = action.payload.selectbrand;
      })
      .addCase(selectBrandThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'fail';
        state.error = action.payload || 'Lỗi không xác định';
      });
  },
});

export default selectBrandSlice.reducer;
