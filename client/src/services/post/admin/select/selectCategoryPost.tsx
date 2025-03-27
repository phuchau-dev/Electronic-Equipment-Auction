import instance from "src/services/axios";
import { SelectCategoryPostResponse } from "src/services/post/admin/types/selectCategoryPost";
export const selectCategoryPost = async (): Promise<SelectCategoryPostResponse> => {
  try {
    const response = await instance.get<SelectCategoryPostResponse>("/admin/post/select-categories-post");
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh mục bài viết:", error);
    throw error;
  }
};
