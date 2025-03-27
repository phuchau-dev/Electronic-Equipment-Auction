import { createAsyncThunk } from "@reduxjs/toolkit";
import { addScreen } from "src/services/attribute/screeen/admin/add/addScreen";
import { ResponseScreen, Screen } from "src/services/attribute/types/screen/addScreen";

export const addScreenThunk = createAsyncThunk<
  ResponseScreen,
  Screen,
  { rejectValue: ResponseScreen }
>(
  "screen/add",
  async (screenData, { rejectWithValue }) => {
    try {
      const response = await addScreen(screenData);
      if (response.success) {
        return response;
      } else {
        return rejectWithValue({
          success: false,
          err: response.err,
          msg: response.msg,
          status: response.status,
        });
      }
    } catch (error) {
      return rejectWithValue({
        success: false,
        err: 1,
        msg: "Có lỗi xảy ra khi thêm màn hình",
        status: 500,
      });
    }
  }
);
