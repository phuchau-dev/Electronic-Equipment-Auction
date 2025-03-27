import instance from "src/services/axios";
import { Category, SelectCategoryResponse } from "src/services/product_v2/admin/types";
export const selectCategories = async (): Promise<Category[]> => {
  try {
    const response = await instance.get<SelectCategoryResponse>("/admin/product/selectcategories");
    if (response.data.success) {
      return response.data.categories;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    throw error;
  }
};
