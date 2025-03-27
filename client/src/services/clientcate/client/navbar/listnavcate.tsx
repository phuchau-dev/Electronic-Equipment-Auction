import instance from "src/services/axios";
import { ListNavItemResponse } from "src/services/clientcate/client/types/listcatenav";

export const listNavCateItem = async (): Promise<ListNavItemResponse> => {
  try {
    const response = await instance.get<ListNavItemResponse>("/client/category/listcatenav");
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    throw error;
  }
};
