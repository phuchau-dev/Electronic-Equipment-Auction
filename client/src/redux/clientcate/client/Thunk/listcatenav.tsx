
import { createAsyncThunk } from '@reduxjs/toolkit';
import { listNavCateItem } from 'src/services/clientcate/client/navbar';
import { ListNavItemResponse } from 'src/redux/clientcate/client/types/listcatenav';

export const listCateNavItemThunk = createAsyncThunk<ListNavItemResponse, void, { rejectValue: string }>(
  'navItems/listNavItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await listNavCateItem();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Lỗi không xác định');
    }
  }
);
