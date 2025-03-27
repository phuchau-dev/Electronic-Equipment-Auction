import { createAsyncThunk } from "@reduxjs/toolkit";
import { VnPayment } from "src/services/pay/vnpay";

export const VnPaymentThunk = createAsyncThunk(
  "checkout/VnPayment",
  async () => {
    const response = await VnPayment();
    return response;
  }
);
