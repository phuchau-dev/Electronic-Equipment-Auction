import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectCategoryPost } from 'src/services/post/admin/select/selectCategoryPost';
import { SelectCategoryPostResponse } from 'src/services/post/admin/types/selectCategoryPost';
export const selectCategoryPostThunk = createAsyncThunk<SelectCategoryPostResponse, void, { rejectValue: string }>(
  'categoryPosts/select',
  async (_, { rejectWithValue }) => {
    try {
      const response = await selectCategoryPost();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Lỗi không xác định');
    }
  }
);
