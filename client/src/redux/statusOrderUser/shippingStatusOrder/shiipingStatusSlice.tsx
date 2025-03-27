// slices/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderDataAllShipping } from 'src/types/iterationOrder/shippingStatusOrder';
import {  fetchOrderDataShippingThunk} from 'src/redux/statusOrderUser/shippingStatusOrder/shippingStatusThunk';

interface OrderState {
  orderShipping: OrderDataAllShipping[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderShipping: null,
  loading: false,
  error: null,
};

const statuShippingOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orderShipping = []; // Xóa sạch danh sách đơn hàng
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDataShippingThunk.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(fetchOrderDataShippingThunk.fulfilled, (state, action:PayloadAction<OrderDataAllShipping[]> ) => {
        state.loading = false;
        state.orderShipping = action.payload // Assign products
      })
      .addCase(fetchOrderDataShippingThunk.rejected, (state, action) => {
        state.loading = false;
        // Xử lý khi `action.payload` có thể là `undefined`
        state.error = action.payload as string;
      });
  },
});

export default statuShippingOrderSlice.reducer;
